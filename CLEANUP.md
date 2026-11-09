# 🧹 REDLINE — Guia de Remoção Completa

> Use este documento se quiser apagar tudo que o projeto REDLINE instalou e criou.
> Leia com atenção antes de executar qualquer coisa.

---

## ⚡ Opção Rápida: Script Automático

Execute o `cleanup.ps1` incluído nesta pasta.  
Ele vai perguntar antes de apagar cada coisa.

```powershell
powershell -ExecutionPolicy Bypass -File cleanup.ps1
```

---

## 🔎 O que pode ser removido (checklist manual)

### 1. Pasta do Projeto
- Localização: `C:\Users\Usuario\Documents\laucherred\`
- **O que é:** Todo o código-fonte do REDLINE, configurações, documentação e .git
- **Como apagar:** Delete a pasta `laucherred` pelo Explorer ou via terminal

```powershell
Remove-Item -Recurse -Force "C:\Users\Usuario\Documents\laucherred"
```

---

### 2. .NET 8 SDK (instalação portátil)
- Localização: `C:\Users\Usuario\.dotnet\`
- **O que é:** O SDK do .NET 8 instalado apenas para o usuário atual
- **Impacto:** Sem o SDK, não é possível compilar os projetos C#
- ⚠️ Se você usa .NET para outros projetos, **NÃO apague**

```powershell
Remove-Item -Recurse -Force "$env:USERPROFILE\.dotnet"
```

---

### 3. MinGit (Git portátil)
- Localização: `C:\Users\Usuario\.mingit\`
- **O que é:** Versão portátil do Git instalada apenas para o usuário
- **Impacto:** Sem o Git, não é possível usar controle de versão
- ⚠️ Se você usa Git para outros projetos via esta pasta, **NÃO apague**

```powershell
Remove-Item -Recurse -Force "$env:USERPROFILE\.mingit"
```

---

### 4. Variáveis de Ambiente (PATH)
- Foram adicionadas duas entradas ao PATH do usuário:
  - `%USERPROFILE%\.dotnet`
  - `%USERPROFILE%\.mingit\cmd`

**Como remover manualmente:**
1. Pressione `Win + R` → digite `sysdm.cpl` → Enter
2. Aba "Avançado" → "Variáveis de Ambiente"
3. Em "Variáveis do usuário", clique em `Path` → "Editar"
4. Remova as entradas que contêm `.dotnet` e `.mingit`
5. Clique OK em tudo

**Ou via PowerShell:**
```powershell
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$newPath = ($currentPath -split ";" | Where-Object { $_ -notmatch "\.dotnet|\.mingit" }) -join ";"
[Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
Write-Host "PATH atualizado. Reinicie o terminal."
```

---

### 5. Cache do NuGet (pacotes baixados automaticamente)
- Localização: `C:\Users\Usuario\.nuget\packages\`
- **O que é:** Cache de pacotes NuGet baixados durante a restauração dos projetos
- **Impacto:** Apenas espaço em disco; pacotes serão re-baixados se recompilar

```powershell
Remove-Item -Recurse -Force "$env:USERPROFILE\.nuget\packages"
```

---

### 6. Arquivos temporários gerados durante instalação
- `%TEMP%\dotnet-install.ps1` — pode já ter sido removido automaticamente
- `%TEMP%\mingit.zip` — pode já ter sido removido automaticamente

```powershell
Remove-Item -Force "$env:TEMP\dotnet-install.ps1" -ErrorAction SilentlyContinue
Remove-Item -Force "$env:TEMP\mingit.zip" -ErrorAction SilentlyContinue
```

---

## 📌 O que NÃO foi alterado / NÃO precisa ser removido

| Item | Motivo |
|---|---|
| DayZ | Nenhum arquivo do jogo foi modificado |
| Steam | Nenhuma configuração do Steam foi alterada |
| BattlEye | Nunca tocado |
| Registro do Windows | Nenhuma entrada foi criada no Regedit |
| Configuração global do Git | Apenas o git local foi configurado (dentro de `.git/config`) |
| Drivers / componentes de sistema | Nada foi instalado no sistema operacional |
| Antivírus / Windows Defender | Sem alterações |

---

## ✅ Verificação pós-remoção

Após apagar tudo, verifique:

```powershell
# Verificar se pastas foram removidas
Test-Path "C:\Users\Usuario\Documents\laucherred"   # deve ser False
Test-Path "$env:USERPROFILE\.dotnet"                # deve ser False (se removeu)
Test-Path "$env:USERPROFILE\.mingit"                # deve ser False (se removeu)

# Verificar se PATH não tem mais as entradas
[Environment]::GetEnvironmentVariable("PATH", "User") | Select-String "\.dotnet|\.mingit"
# deve retornar vazio
```

