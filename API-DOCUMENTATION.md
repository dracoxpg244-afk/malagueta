# 📡 REDLINE — Documentação da API REST

A **REDLINE API** é o serviço autoritativo central do ecossistema. Todas as comunicações utilizam formato JSON sobre transporte seguro HTTPS.

---

## 1. Endpoints Públicos e de Licença (`/api/license`)

### `GET /api/license/health`
Verifica a saúde da API e conectividade com o banco de dados.

- **Resposta de Sucesso (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-11-09T16:30:00Z"
}
```

---

### `POST /api/license/activate`
Ativa uma chave de licença pela primeira vez ou revalida uma instalação existente.

- **Corpo da Requisição:**
```json
{
  "key": "RDLN-XXXX-XXXX-XXXX-XXXX",
  "installationToken": "c7b2e8f19034...",
  "friendlyName": "PC-Jogador",
  "clientVersion": "1.0.0"
}
```

- **Resposta de Sucesso (200 OK):**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "4a8c9b2e...",
  "message": "Licença ativada com sucesso!",
  "expiresAt": "2026-11-09T18:30:00Z"
}
```

- **Respostas de Erro:**
  - `401 Unauthorized`: Chave inválida, expirada, revogada ou limite de ativações atingido.
  - `400 Bad Request`: Parâmetros obrigatórios ausentes.
  - `429 Too Many Requests`: Excesso de tentativas em curto período (Rate Limit).

---

### `POST /api/license/validate`
Valida se a sessão atual do jogador ainda é válida.

- **Corpo da Requisição:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "installationToken": "c7b2e8f19034..."
}
```

- **Resposta de Sucesso (200 OK):**
```json
{
  "valid": true,
  "message": "Licença válida.",
  "expiresAt": "2026-11-09T18:30:00Z"
}
```

---

## 2. Endpoints do Sistema de Grupos (`/api/party`)

### `POST /api/party/create`
Cria uma sala de grupo onde os amigos podem se juntar com um código curto.

- **Corpo da Requisição:**
```json
{
  "hostInstallationToken": "c7b2e8f19034...",
  "hostName": "Líder",
  "serverIp": "192.168.1.100",
  "serverPort": 2302,
  "serverName": "Chernarus Hardcore DayZ",
  "serverPassword": "",
  "modWorkshopIds": ["1559212036", "2545327648"]
}
```

- **Resposta de Sucesso (200 OK):**
```json
{
  "success": true,
  "message": "Sala de grupo criada com sucesso!",
  "session": {
    "partyCode": "RL-7K9A",
    "hostName": "Líder",
    "serverIp": "192.168.1.100",
    "serverPort": 2302,
    "serverName": "Chernarus Hardcore DayZ",
    "modWorkshopIds": ["1559212036", "2545327648"],
    "memberNames": ["Líder"],
    "createdAt": "2026-11-09T16:30:00Z",
    "expiresAt": "2026-11-09T20:30:00Z"
  }
}
```

---

### `POST /api/party/join`
Entra em uma sala existente através do código de grupo.

- **Corpo da Requisição:**
```json
{
  "partyCode": "RL-7K9A",
  "memberName": "Amigo1",
  "memberInstallationToken": "f901a2b3..."
}
```

- **Resposta de Sucesso (200 OK):**
Retorna as informações completas do servidor e a lista de mods sincronizados.

---

## 3. Endpoints Administrativos (`/api/admin`)

*Todos os endpoints administrativos abaixo exigem cabeçalho `Authorization: Bearer <token_admin>` com a claim `role: admin`.*

### `POST /api/admin/login`
Autenticação administrativa com MFA (TOTP).

- **Corpo da Requisição:**
```json
{
  "username": "admin",
  "password": "RedlineAdmin@2026",
  "mfaCode": "123456"
}
```

- **Resposta de Sucesso (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2026-11-09T20:30:00Z",
  "message": "Autenticado como Administrador."
}
```

---

### `GET /api/admin/stats`
Retorna métricas gerais do ecossistema: total de chaves, chaves ativas, dispositivos vinculados e total de logs de auditoria.

---

### `POST /api/admin/keys/generate`
Gera uma nova chave de licença aleatória com validade e limite de ativações.

- **Corpo da Requisição:**
```json
{
  "maxActivations": 1,
  "expiresAt": "2027-01-01T00:00:00Z",
  "notes": "Amigo: Bruno - Sakhal"
}
```

- **Resposta de Sucesso (200 OK):**
```json
{
  "success": true,
  "plainKey": "RDLN-A7K2-9B4F-C1E8-D3A5",
  "keyPrefix": "RDLN-A7K2",
  "message": "Chave gerada com sucesso. Copie agora — ela não será exibida novamente."
}
```

---

### `GET /api/admin/keys`
Lista todas as chaves cadastradas (exibindo apenas seus prefixos públicos e status).

---

### `POST /api/admin/keys/{id}/revoke`
Revoga imediatamente uma chave de licença existente.

---

### `GET /api/admin/devices`
Lista todas as instalações vinculadas a chaves de licença.

---

### `POST /api/admin/devices/{id}/unbind`
Desvincula uma instalação, liberando a vaga de ativação para o jogador reutilizar após formatação.

---

### `GET /api/admin/audit?take=100`
Recupera os registros mais recentes da trilha de auditoria e segurança.

