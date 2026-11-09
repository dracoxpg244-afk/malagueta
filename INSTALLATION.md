# 📦 REDLINE — Guia de Instalação, Compilação e Distribuição

Este guia explica como compilar o ecossistema, executar localmente e gerar o instalador executável (`RedlineSetup.exe`) para distribuir aos amigos.

---

## 1. Pré-Requisitos de Desenvolvimento

- **Sistema Operacional**: Windows 10 (versão 1903+) ou Windows 11 x64
- **SDK**: Microsoft .NET 8.0 SDK (versão 8.0.400 ou superior)
- **Git**: Opcional para versionamento

> Se você ainda não possui o .NET 8 SDK instalado, execute o instalador silencioso oficial no PowerShell:
> ```powershell
> Invoke-WebRequest -Uri "https://dot.net/v1/dotnet-install.ps1" -OutFile "$env:TEMP\dotnet-install.ps1"
> powershell -ExecutionPolicy Bypass -File "$env:TEMP\dotnet-install.ps1" -Channel 8.0 -InstallDir "$env:USERPROFILE\.dotnet"
> ```

---

## 2. Compilação do Projeto

Abra o PowerShell na raiz do projeto (`c:\Users\Usuario\Documents\laucherred`):

```powershell
# 1. Configurar o PATH com o .NET
$env:PATH = "$env:USERPROFILE\.dotnet;$env:PATH"

# 2. Restaurar dependências
dotnet restore Redline.sln

# 3. Compilar toda a solução em modo Release
dotnet build Redline.sln -c Release

# 4. Executar os testes automatizados
dotnet test Redline.sln -c Release
```

---

## 3. Como Executar os Componentes

### Executar a API (Backend)
```powershell
cd src/Redline.Api
dotnet run
# A API iniciará em http://localhost:5000 (Swagger disponível em http://localhost:5000/swagger)
```

### Executar o REDLINE Admin
```powershell
cd src/Redline.Admin
dotnet run
# Credenciais padrão para ambiente de desenvolvimento:
# Usuário: admin
# Senha: RedlineAdmin@2026
# Código MFA: 123456
```

### Executar o REDLINE Launcher
```powershell
cd src/Redline.Launcher
dotnet run
```

---

## 4. Gerando o Instalador Único para Amigos (`RedlineSetup.exe`)

Para distribuir o Launcher para seus amigos sem exigir que eles instalem SDKs de desenvolvimento:

```powershell
$env:PATH = "$env:USERPROFILE\.dotnet;$env:PATH"

# Publica o Launcher como binário autocontido para Windows x64
dotnet publish src/Redline.Launcher/Redline.Launcher.csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -o publish/launcher

# Publica o Instalador (RedlineSetup.exe)
dotnet publish src/Redline.Installer/Redline.Installer.csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -o publish/setup
```

O arquivo `publish/setup/RedlineSetup.exe` gerado pode ser compartilhado diretamente com seus amigos (via Google Drive, Discord ou pendrive).

### O que o instalador faz no PC do amigo:
1. Instala em `%localappdata%\RedlineLauncher\app-1.0.0\` (sem pedir permissões de administrador).
2. Cria o atalho na Área de Trabalho e no Menu Iniciar.
3. Cria a entrada de desinstalação no Painel de Controle do Windows.
4. Inicia o REDLINE Launcher automaticamente ao finalizar.

---

## 5. Como Desinstalar

- **Pelo Painel de Controle**: Abra "Configurações do Windows" → "Aplicativos" → selecione "REDLINE Launcher" e clique em "Desinstalar".
- **Por linha de comando**:
  ```powershell
  & "$env:LOCALAPPDATA\RedlineLauncher\RedlineUninstaller.exe" --uninstall
  ```
- **Limpeza completa de desenvolvedor**: Execute o script `cleanup.ps1` na pasta raiz do repositório para remover SDKs, caches do NuGet e arquivos temporários.

