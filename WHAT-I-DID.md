# 📋 REDLINE — Registro Completo de Arquivos, Ferramentas e Implementação

> Este documento registra tudo o que foi instalado, baixado, construído e compilado no projeto REDLINE.
> Consulte este arquivo para manutenção ou se desejar remover componentes do sistema.

---

## 🛠️ Ferramentas Utilizadas e Instaladas

| Ferramenta | Versão | Local de Instalação | Como Remover |
|---|---|---|---|
| **.NET 8.0 SDK** | 8.0.427 | `%USERPROFILE%\.dotnet\` | Apagar a pasta `%USERPROFILE%\.dotnet\` |
| **MinGit (Git Portátil)** | 2.47.1 | `%USERPROFILE%\.mingit\` | Apagar a pasta `%USERPROFILE%\.mingit\` |

> **Nota de Segurança:** Nenhuma dessas ferramentas exigiu privilégios de administrador ou modificou arquivos do sistema operacional do Windows. Ambas ficam exclusivamente isoladas no diretório de usuário.

---

## 📁 Estrutura de Projetos C# .NET 8 Construídos

| Projeto | Tipo | Propósito | Status de Compilação |
|---|---|---|---|
| `src/Redline.Core` | Class Library | Modelos de Domínio, DTOs, Criptografia SHA-256/PBKDF2, Cliente Steam A2S UDP, Parser de Mods e Resolução de Conflitos | ✅ Compilação 100% (0 erros, 0 avisos) |
| `src/Redline.Api` | ASP.NET Core 8 Web API | Autoridade central de licenças, JWT, Rate Limiter, Trilha de Auditoria, Sistema de Grupos (Party) | ✅ Compilação 100% (0 erros, 0 avisos) |
| `src/Redline.Admin` | WPF .NET 8 (Desktop) | Painel Administrativo com MFA, Gerador de Keys 256-bit, Revogação/Bloqueio, Desvinculação de Máquinas, Exportação de CSV | ✅ Compilação 100% (0 erros, 0 avisos) |
| `src/Redline.Launcher` | WPF .NET 8 (Desktop) | Launcher dos jogadores: Ativação, Navegador de Servidores A2S, Sistema de Grupos (Party), Mods do Workshop com CF automático, Mira Fixa (Overlay Win32), Monitor e Diagnóstico | ✅ Compilação 100% (0 erros, 0 avisos) |
| `src/Redline.Installer` | WPF .NET 8 (Desktop Executável) | Instalador autocontido no estilo Discord (`RedlineSetup.exe`), instala em `%localappdata%\RedlineLauncher`, cria atalhos e desinstalador | ✅ Compilação 100% (0 erros, 0 avisos) |
| `tests/Redline.Tests` | xUnit .NET 8 | Testes automatizados cobrindo entropia de chaves, SHA-256, PBKDF2, detecção e ordenação de mods, argumentos do DayZ | ✅ 9/9 Testes Aprovados (0 falhas) |

---

## 📚 Os 13 Documentos Oficiais Criados

1. [README.md](README.md) — Visão geral e apresentação do projeto
2. [ARCHITECTURE.md](ARCHITECTURE.md) — Diagramas e decisões arquiteturais
3. [INSTALLATION.md](INSTALLATION.md) — Como compilar, executar e publicar
4. [API-DOCUMENTATION.md](API-DOCUMENTATION.md) — Especificação técnica dos endpoints REST
5. [ADMIN-GUIDE.md](ADMIN-GUIDE.md) — Guia de operação do administrador autorizado
6. [USER-GUIDE.md](USER-GUIDE.md) — Manual de instruções para os jogadores
7. [SECURITY-AUDIT.md](SECURITY-AUDIT.md) — Análise de segurança e mitigação de vulnerabilidades
8. [PRIVACY-AUDIT.md](PRIVACY-AUDIT.md) — Conformidade com a LGPD e minimização de dados
9. [COMPLIANCE-REGISTER.md](COMPLIANCE-REGISTER.md) — Matriz de conformidade com Bohemia Interactive e BattlEye
10. [CHANGELOG.md](CHANGELOG.md) — Histórico de versões e funcionalidades entregues
11. [ROADMAP.md](ROADMAP.md) — Cronograma de evolução e próximas etapas
12. [BACKUP-AND-RECOVERY.md](BACKUP-AND-RECOVERY.md) — Políticas de backup do banco e recuperação após formatação
13. [CONTRIBUTING.md](CONTRIBUTING.md) — Regras de contribuição e boas práticas de engenharia

---

## 🧹 Script de Desinstalação e Limpeza Completa

Para remover tudo o que foi feito de forma automatizada:
```powershell
powershell -ExecutionPolicy Bypass -File cleanup.ps1
```
Ele removerá a pasta do projeto, o SDK do .NET portátil, o MinGit e restaurará as variáveis de ambiente sem afetar o seu DayZ ou Steam.
