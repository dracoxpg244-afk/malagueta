# 💾 REDLINE — Guia de Backup e Recuperação

Este documento orienta o desenvolvedor e o administrador sobre procedimentos de backup de dados, recuperação de desastres e restauração de ambiente.

---

## 1. O que Fazer Backup

### A. Banco de Dados da API (`redline-dev.db` ou PostgreSQL)
- **O que contém**: Hashes das chaves de licença, tokens de instalação vinculados e registros de auditoria.
- **Localização em desenvolvimento**: `src/Redline.Api/redline-dev.db`
- **Comando de Backup Rápido no PowerShell**:
  ```powershell
  $data = Get-Date -Format "yyyyMMdd_HHmmss"
  Copy-Item "src/Redline.Api/redline-dev.db" "backup/redline_db_backup_$data.db"
  ```

### B. Configurações do Desenvolvedor e Segredos
- O arquivo `appsettings.json` não contém senhas reais de produção.
- Em produção na nuvem, todas as credenciais devem ser salvas no gerenciador de variáveis de ambiente do provedor (Render / Koyeb / Fly.io / Railway).

### C. Configurações Locais dos Jogadores
- Localização: `%APPDATA%\REDLINE\settings.json`
- O próprio Launcher do REDLINE cria backups automáticos de `DayZ.cfg` e `.DayZProfile` antes de iniciar o jogo dentro da pasta:
  `%USERPROFILE%\Documents\DayZ\Redline_Backups\`

---

## 2. Procedimento de Restauração de Licença Após Formatação do Windows

Quando um amigo formatar o computador:
1. O token anônimo de instalação anterior é perdido com a formatação.
2. O amigo baixa o `RedlineSetup.exe` e tenta inserir a chave original.
3. Se a chave tiver atingido o limite máximo de ativações, o Launcher informará: *"Limite de ativações atingido"*.
4. O **Administrador** abre o `RedlineAdmin.exe`:
   - Acessa a aba **🖥 Dispositivos**.
   - Clica em **🔓 Desvincular Dispositivo** na linha da máquina anterior do amigo.
5. O amigo clica em **ATIVAR** no Launcher e sua nova instalação do Windows é vinculada com sucesso.

---

## 3. Script de Backup Completo do Projeto

Para criar um arquivo zip compactado com todo o código-fonte e histórico:

```powershell
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmm"
$destino = "C:\Users\Usuario\Desktop\REDLINE_Backup_$timestamp.zip"
Compress-Archive -Path "C:\Users\Usuario\Documents\laucherred" -DestinationPath $destino -Force
Write-Host "Backup completo criado em: $destino" -ForegroundColor Green
```

