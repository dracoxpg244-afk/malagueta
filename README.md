# 🔴 REDLINE — Ecossistema Privado para DayZ Standalone

![REDLINE Banner](https://raw.githubusercontent.com/redline-project/assets/main/banner.png)

> **REDLINE** é um ecossistema privado e seguro de ferramentas e launcher para **DayZ Standalone**, desenvolvido exclusivamente para um grupo fechado de amigos convidados.

O projeto oferece uma experiência moderna, tática e minimalista para organização de servidores, sincronização de grupos de amigos, verificação de mods do Steam Workshop sem conflitos e mira visual externa opcional sem injeção de código ou violação das regras do jogo.

---

## ⚡ Os Três Componentes Independentes

O ecossistema é estritamente separado em três camadas isoladas:

```
┌────────────────────────────────┐       ┌────────────────────────────────┐
│      REDLINE Launcher          │       │        REDLINE Admin           │
│  (Instalado nos jogadores)     │       │  (Painel do Administrador)     │
│  - Autenticação de Key         │       │  - Geração de Keys (256-bit)   │
│  - Browser de Servidores (A2S) │       │  - Controle de Validade/Máx    │
│  - Sistema de Grupos (Party)   │       │  - Revogação e Bloqueio        │
│  - Gerenciador de Mods & CF    │       │  - Auditoria & Logs em tempo   │
│  - Mira Fixa (Overlay DWM)     │       │  - MFA e Sessões Seguras       │
└───────────────┬────────────────┘       └───────────────┬────────────────┘
                │                                        │
                │        HTTPS (JWT Bearer Token)        │
                └───────────────────┬────────────────────┘
                                    ▼
                ┌────────────────────────────────────────┐
                │             REDLINE API                │
                │     (Autoridade Central Segura)        │
                │  - Hashing SHA-256 de chaves           │
                │  - Rate Limiting e Anti-Brute-Force    │
                │  - SQLite (Dev) / PostgreSQL (Cloud)   │
                │  - Auditoria e Sessões de Grupo        │
                └────────────────────────────────────────┘
```

1. **REDLINE Launcher (`Redline.Launcher`)**: Aplicativo desktop WPF para os jogadores. Gerencia licença, servidores, grupos e inicialização segura do DayZ.
2. **REDLINE Admin (`Redline.Admin`)**: Aplicativo desktop exclusivo do administrador com MFA obrigatório. O código administrativo é **100% isolado** e não existe dentro do executável dos jogadores.
3. **REDLINE API (`Redline.Api`)**: Serviço independente ASP.NET Core 8 que atua como autoridade central. Armazena apenas hashes SHA-256 e audita todas as operações.

---

## 🚀 Principais Funcionalidades

- **Chaves Criptográficas com Entropia**: Chaves no formato `RDLN-XXXX-XXXX-XXXX-XXXX` geradas aleatoriamente.
- **Sistema de Grupos ("Entrar com Amigos")**: Crie uma sala com 1 clique (código `RL-XXXX`) e seus amigos entram no mesmo servidor com os mesmos mods sincronizados.
- **Prevenção de Falhas de Mods**: Detecta a dependência obrigatória do Community Framework (CF) e posiciona frameworks no início da ordem de carregamento, evitando telas pretas e crashes.
- **Mira Visual Segura (Overlay DWM)**: Janela transparente de sobreposição do Windows (`WS_EX_TRANSPARENT | WS_EX_LAYERED`). Não lê memória, não injeta DLLs e respeita o BattlEye Anti-Cheat.
- **Instalador Simples (Estilo Discord)**: Arquivo executável único (`RedlineSetup.exe`) que instala em `%localappdata%\RedlineLauncher` sem exigir permissões de administrador.
- **Privacidade Total (LGPD)**: Sem coleta de números de série de hardware, MAC address ou dados pessoais.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem**: C# 12
- **Framework**: .NET 8.0 LTS
- **Interface Gráfica**: WPF (Windows Presentation Foundation) com XAML
- **Backend**: ASP.NET Core 8 Web API
- **Banco de Dados**: Entity Framework Core com SQLite local ou PostgreSQL em nuvem
- **Protocolos**: HTTPS / REST / Steam A2S UDP Server Query

---

## 📖 Documentação do Projeto

Consulte os documentos oficiais para detalhes de implementação:

- [Arquitetura Geral](ARCHITECTURE.md)
- [Guia de Instalação](INSTALLATION.md)
- [Documentação da API](API-DOCUMENTATION.md)
- [Guia do Administrador](ADMIN-GUIDE.md)
- [Guia do Jogador](USER-GUIDE.md)
- [Auditoria de Segurança](SECURITY-AUDIT.md)
- [Auditoria de Privacidade e LGPD](PRIVACY-AUDIT.md)
- [Registro de Conformidade DayZ/BattlEye](COMPLIANCE-REGISTER.md)
- [Backup e Restauração](BACKUP-AND-RECOVERY.md)
- [Histórico de Alterações (Changelog)](CHANGELOG.md)
- [Roadmap de Desenvolvimento](ROADMAP.md)
- [Guia de Contribuição](CONTRIBUTING.md)

---

## ⚖️ Conformidade e Isenção de Responsabilidade

DayZ® e Bohemia Interactive® são marcas registradas da Bohemia Interactive a.s. O REDLINE é um software independente sem afiliação formal com a Bohemia Interactive. O software opera em estrito respeito aos Termos de Serviço do Steam e às diretrizes da Bohemia Interactive.

