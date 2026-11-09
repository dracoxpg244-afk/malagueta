# PowerShell cleanup script for REDLINE project
# Run with: powershell -ExecutionPolicy Bypass -File cleanup.ps1

$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Red
Write-Host "   REDLINE - Script de Remocao Completa" -ForegroundColor Red
Write-Host "=====================================================" -ForegroundColor Red
Write-Host ""
Write-Host "Este script vai perguntar antes de apagar cada item." -ForegroundColor Yellow
Write-Host ""

function Remove-WithConfirm {
    param([string]$Path, [string]$Description)
    if (Test-Path $Path) {
        Write-Host "Encontrado: $Description" -ForegroundColor Cyan
        Write-Host "  Caminho: $Path" -ForegroundColor Gray
        $resp = Read-Host "  Deseja remover? (s/N)"
        if ($resp -eq "s" -or $resp -eq "S") {
            Remove-Item -Recurse -Force $Path -ErrorAction SilentlyContinue
            if (!(Test-Path $Path)) {
                Write-Host "  Removido com sucesso." -ForegroundColor Green
            } else {
                Write-Host "  ERRO: Nao foi possivel remover." -ForegroundColor Red
            }
        } else {
            Write-Host "  Mantido." -ForegroundColor Gray
        }
    } else {
        Write-Host "Nao encontrado (ja removido): $Description" -ForegroundColor Gray
    }
    Write-Host ""
}

Write-Host "=== PASSO 1: Pasta do Projeto ===" -ForegroundColor Yellow
$projectPath = Split-Path -Parent $PSCommandPath
Remove-WithConfirm -Path $projectPath -Description "Pasta completa do projeto REDLINE (laucherred)"

Write-Host "=== PASSO 2: .NET 8 SDK Portatil ===" -ForegroundColor Yellow
Remove-WithConfirm -Path "$env:USERPROFILE\.dotnet" -Description ".NET 8 SDK instalado em perfil do usuario"

Write-Host "=== PASSO 3: MinGit Portatil ===" -ForegroundColor Yellow
Remove-WithConfirm -Path "$env:USERPROFILE\.mingit" -Description "MinGit (Git portatil) instalado em perfil do usuario"

Write-Host "=== PASSO 4: Cache do NuGet ===" -ForegroundColor Yellow
Remove-WithConfirm -Path "$env:USERPROFILE\.nuget\packages" -Description "Cache de pacotes NuGet (~pode ser grande)"

Write-Host "=== PASSO 5: Remover entradas do PATH ===" -ForegroundColor Yellow
Write-Host "Entradas atuais no PATH do usuario relacionadas ao REDLINE:" -ForegroundColor Cyan
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$relevantEntries = ($currentPath -split ";") | Where-Object { $_ -match "\.dotnet|\.mingit" }
if ($relevantEntries) {
    $relevantEntries | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
    $resp = Read-Host "Deseja remover essas entradas do PATH? (s/N)"
    if ($resp -eq "s" -or $resp -eq "S") {
        $newPath = ($currentPath -split ";" | Where-Object { $_ -notmatch "\.dotnet|\.mingit" }) -join ";"
        [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
        Write-Host "  PATH atualizado. Reinicie o terminal para aplicar." -ForegroundColor Green
    } else {
        Write-Host "  PATH mantido." -ForegroundColor Gray
    }
} else {
    Write-Host "  Nenhuma entrada do REDLINE encontrada no PATH." -ForegroundColor Gray
}

Write-Host ""
Write-Host "=== PASSO 6: Arquivos temporarios ===" -ForegroundColor Yellow
Remove-WithConfirm -Path "$env:TEMP\dotnet-install.ps1" -Description "Script de instalacao do .NET (temp)"
Remove-WithConfirm -Path "$env:TEMP\mingit.zip" -Description "Arquivo zip do MinGit (temp)"

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "   Limpeza concluida!" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green
Write-Host ""
Write-Host "O que NAO foi alterado pelo REDLINE (nao precisa limpar):" -ForegroundColor Cyan
Write-Host "  - DayZ e arquivos do jogo" -ForegroundColor Gray
Write-Host "  - Steam" -ForegroundColor Gray
Write-Host "  - BattlEye" -ForegroundColor Gray
Write-Host "  - Registro do Windows" -ForegroundColor Gray
Write-Host "  - Configuracao global do Git" -ForegroundColor Gray
Write-Host "  - Drivers e componentes de sistema" -ForegroundColor Gray
Write-Host ""

