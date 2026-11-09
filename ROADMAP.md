# 🗺️ REDLINE — Roadmap de Evolução do Projeto

Este documento planeja os próximos passos e fases de desenvolvimento contínuo do ecossistema REDLINE.

---

## 📅 Linha do Tempo de Entregas

```
Fase 1: Fundação & Arquitetura [CONCLUÍDO]
  ├── Estrutura de pastas e solução .NET 8
  ├── Design System tático (preto, grafite, vermelho REDLINE)
  └── Toda a documentação e diretrizes de conformidade

Fase 2: Core & API [CONCLUÍDO]
  ├── Geração de chaves aleatórias com 256 bits de entropia
  ├── Hashing SHA-256 e banco de dados relacional
  ├── JWT tokens, autenticação e autorização
  ├── Rate limiter contra força bruta
  └── Endpoints de Party System para sincronização de amigos

Fase 3: REDLINE Admin [CONCLUÍDO]
  ├── Painel isolado com MFA obrigatório
  ├── Geração de chaves customizadas (validade, limite de máquinas)
  ├── Revogação e bloqueio de licenças
  ├── Desvinculação de dispositivos para formatação
  └── Exportação de relatórios de auditoria para CSV

Fase 4 & 5: REDLINE Launcher & Servidores [CONCLUÍDO]
  ├── Interface de autenticação e validação
  ├── Consulta direta A2S_INFO via protocolo Steam UDP
  ├── Favoritos e histórico de servidores
  └── Sistema de Grupos ("Entrar com Amigos") em 1 clique

Fase 6: Mods & Conflitos [CONCLUÍDO]
  ├── Parser de mod.cpp e meta.cpp do Workshop
  ├── Detecção automática de dependência do Community Framework (CF)
  ├── Ordenação de carga com frameworks no topo
  └── Backup e restauração de arquivos de configuração do DayZ

Fase 7: Ferramentas Adicionais [CONCLUÍDO]
  ├── Mira fixa externa transparente Win32 (click-through, zero injeção)
  ├── Monitor de hardware em tempo real (RAM, processo DayZ, ping)
  └── Leitor de logs .RPT e .log para diagnóstico de crashes

Fase 8: Distribuição & Instalador [CONCLUÍDO]
  ├── RedlineSetup.exe no formato Discord (instalação sem admin)
  ├── Criação de atalhos e desinstalador limpo
  └── Suíte de testes automatizados com xUnit (100% aprovados)

Próximos Passos (Evolução Futura):
  ├── [ ] Auto-updater em background com verificação de hash SHA-256
  ├── [ ] Notificações de servidor (aviso quando o servidor do grupo reiniciar)
  ├── [ ] Suporte a múltiplos monitores para a mira fixa externa
  └── [ ] Deploy automatizado da API no Render / Fly.io via GitHub Actions
```

