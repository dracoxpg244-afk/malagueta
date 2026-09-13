const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');
const os = require('os');

const PORT = process.env.PORT || 3000;

// ─── HTTP Server (serve static files) ────────────────────────────────────────
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.ico':  'image/x-icon',
  '.png':  'image/png',
};

const httpServer = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, 'public', filePath);

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Arquivo não encontrado');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// ─── WebSocket Signaling Server ───────────────────────────────────────────────
const wss = new WebSocketServer({ server: httpServer });

// rooms: { roomId: { host: ws, viewers: Set<ws> } }
const rooms = new Map();

function getRoomStats() {
  const stats = [];
  for (const [id, room] of rooms) {
    stats.push({ id, viewers: room.viewers.size, hasHost: !!room.host });
  }
  return stats;
}

function broadcast(ws, data) {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

wss.on('connection', (ws) => {
  ws.role = null;
  ws.roomId = null;
  ws.viewerId = null;

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    switch (msg.type) {

      // ── Host cria sala ──────────────────────────────────────────────────────
      case 'host-create': {
        const roomId = msg.roomId || Math.random().toString(36).substring(2, 8).toUpperCase();
        if (rooms.has(roomId)) {
          broadcast(ws, { type: 'error', message: 'Sala já existe. Escolha outro ID.' });
          return;
        }
        rooms.set(roomId, { host: ws, viewers: new Map() });
        ws.role = 'host';
        ws.roomId = roomId;
        broadcast(ws, { type: 'room-created', roomId });
        console.log(`[${new Date().toLocaleTimeString()}] Sala criada: ${roomId}`);
        break;
      }

      // ── Viewer entra na sala ────────────────────────────────────────────────
      case 'viewer-join': {
        const room = rooms.get(msg.roomId);
        if (!room) {
          broadcast(ws, { type: 'error', message: 'Sala não encontrada.' });
          return;
        }
        const viewerId = Math.random().toString(36).substring(2, 10);
        ws.role = 'viewer';
        ws.roomId = msg.roomId;
        ws.viewerId = viewerId;
        ws.viewerName = msg.name || `Viewer-${viewerId.substring(0, 4)}`;
        room.viewers.set(viewerId, ws);

        // Avisa viewer que entrou
        broadcast(ws, { type: 'joined', roomId: msg.roomId, viewerId, hostPresent: !!room.host });

        // Avisa host que novo viewer chegou
        if (room.host) {
          broadcast(room.host, { type: 'viewer-joined', viewerId, name: ws.viewerName, count: room.viewers.size });
        }
        console.log(`[${new Date().toLocaleTimeString()}] ${ws.viewerName} entrou na sala ${msg.roomId}`);
        break;
      }

      // ── Sinalização WebRTC (offer/answer/candidate) ─────────────────────────
      case 'offer': {
        // Host → Viewer específico
        const room = rooms.get(ws.roomId);
        if (!room) return;
        const targetViewer = room.viewers.get(msg.targetId);
        if (targetViewer) {
          broadcast(targetViewer, { type: 'offer', sdp: msg.sdp, fromId: 'host' });
        }
        break;
      }

      case 'answer': {
        // Viewer → Host
        const room = rooms.get(ws.roomId);
        if (!room || !room.host) return;
        broadcast(room.host, { type: 'answer', sdp: msg.sdp, fromId: ws.viewerId });
        break;
      }

      case 'candidate': {
        const room = rooms.get(ws.roomId);
        if (!room) return;

        if (ws.role === 'host') {
          // Host → Viewer específico
          const targetViewer = room.viewers.get(msg.targetId);
          if (targetViewer) {
            broadcast(targetViewer, { type: 'candidate', candidate: msg.candidate, fromId: 'host' });
          }
        } else {
          // Viewer → Host
          if (room.host) {
            broadcast(room.host, { type: 'candidate', candidate: msg.candidate, fromId: ws.viewerId });
          }
        }
        break;
      }

      // ── Chat ────────────────────────────────────────────────────────────────
      case 'chat': {
        const room = rooms.get(ws.roomId);
        if (!room) return;
        const chatMsg = {
          type: 'chat',
          name: ws.role === 'host' ? '🎬 Host' : (ws.viewerName || 'Viewer'),
          text: msg.text.substring(0, 300),
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        };
        // Broadcast to all in room
        if (room.host) broadcast(room.host, chatMsg);
        room.viewers.forEach(v => broadcast(v, chatMsg));
        break;
      }

      // ── Host encerra transmissão ────────────────────────────────────────────
      case 'end-stream': {
        const room = rooms.get(ws.roomId);
        if (!room || ws.role !== 'host') return;
        room.viewers.forEach(v => broadcast(v, { type: 'stream-ended' }));
        break;
      }
    }
  });

  ws.on('close', () => {
    if (!ws.roomId) return;
    const room = rooms.get(ws.roomId);
    if (!room) return;

    if (ws.role === 'host') {
      // Host saiu – avisa todos os viewers
      room.viewers.forEach(v => broadcast(v, { type: 'stream-ended' }));
      rooms.delete(ws.roomId);
      console.log(`[${new Date().toLocaleTimeString()}] Sala ${ws.roomId} encerrada`);
    } else if (ws.role === 'viewer') {
      room.viewers.delete(ws.viewerId);
      if (room.host) {
        broadcast(room.host, { type: 'viewer-left', viewerId: ws.viewerId, name: ws.viewerName, count: room.viewers.size });
      }
      console.log(`[${new Date().toLocaleTimeString()}] ${ws.viewerName} saiu da sala ${ws.roomId}`);
    }
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
httpServer.listen(PORT, '0.0.0.0', () => {
  const interfaces = os.networkInterfaces();
  let localIP = 'localhost';
  for (const iface of Object.values(interfaces)) {
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        localIP = alias.address;
        break;
      }
    }
  }

  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║     🎬  SISTEMA DE TRANSMISSÃO DE TELA  🎬       ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  Local:  http://localhost:${PORT}                    ║`);
  console.log(`║  Rede:   http://${localIP}:${PORT}               ║`);
  console.log('╠══════════════════════════════════════════════════╣');
  console.log('║  Seus amigos acessam o link da Rede acima        ║');
  console.log('║  Sem instalação necessária para eles! ✅          ║');
  console.log('╚══════════════════════════════════════════════════╝\n');
});
