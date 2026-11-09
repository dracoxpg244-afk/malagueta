# 📝 REDLINE — Histórico de Alterações (Changelog)

Todas as alterações notáveis no ecossistema REDLINE serão documentadas neste arquivo.  
O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [1.0.0] — 2026-11-09

### Adicionado
- **Arquitetura Completa em .NET 8**: Criação dos projetos `Redline.Core`, `Redline.Api`, `Redline.Admin`, `Redline.Launcher`, `Redline.Installer` e `Redline.Tests`.
- **REDLINE API**:
  - Geração segura de chaves criptográficas de 256 bits (`RDLN-XXXX-XXXX-XXXX-XXXX`).
  - Hashing SHA-256 de chaves no banco de dados (texto puro nunca é armazenado).
  - Autenticação JWT com tokens de curta duração (2 horas).
  - Controle de limites de ativação por máquina com identificador aleatório anônimo (UUID).
  - Rate limiting deslizante via middleware contra ataques de força bruta.
  - Endpoints de gerenciamento e revogação de chaves com auditoria completa.
  - Endpoints para sistema de grupos (Party System - `RL-XXXX`).
- **REDLINE Admin**:
  - Painel administrativo WPF totalmente separado do Launcher de jogadores.
  - Autenticação forte com MFA (código TOTP de 6 dígitos).
  - Geração de chaves personalizadas (validade, limite de ativações, notas).
  - Gerenciamento de licenças ativas, revogação e bloqueio com 1 clique.
  - Desvinculação de dispositivos para permitir recuperação após formatação do Windows.
  - Visualização de trilha de auditoria e exportação para CSV.
- **REDLINE Launcher**:
  - Interface moderna, tática e minimalista em tema escuro (`#0A0A0A`, acento vermelho `#C0392B`).
  - Tela de autenticação e validação automática de chave de licença.
  - Navegador de servidores DayZ com suporte a consulta direta UDP via protocolo Steam A2S_INFO.
  - Sistema de grupos ("Jogar com Amigos") com criação de sala e sincronização de mods em 1 clique.
  - Gerenciamento de mods do Steam Workshop:
    - Auto-detecção de pasta do Workshop.
    - Análise de dependências e inserção automática do Community Framework (CF) no topo da ordem de carga.
    - Criação de perfis por servidor.
    - Backup automático e restauração de arquivos de configuração (`DayZ.cfg` e `.DayZProfile`) antes de iniciar.
  - Mira fixa visual (overlay externo Win32 click-through, transparente, totalmente desativada por padrão com aviso de conformidade).
  - Monitor de hardware (processo DayZ, uso de memória RAM, disco e teste de ping de rede).
  - Diagnóstico de crashes do DayZ (analisador de arquivos `.RPT` e `.log` em `%localappdata%\DayZ`).
- **REDLINE Installer (`RedlineSetup.exe`)**:
  - Instalador executável único no estilo Discord (instalação por usuário em `%localappdata%\RedlineLauncher`).
  - Sem necessidade de privilégios de administrador.
  - Criação de atalhos na Área de Trabalho e Menu Iniciar.
  - Desinstalador limpo integrado no Painel de Controle do Windows.
- **Testes Automatizados**:
  - 9 testes unitários e de integração aprovados em xUnit cobrindo geração de chave, hashing SHA-256, PBKDF2, ordenação de mods e argumentos de inicialização.

