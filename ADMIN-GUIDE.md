# 🛡️ REDLINE — Guia do Administrador

Este guia destina-se exclusivamente ao operador responsável pelo ecossistema REDLINE.

---

## 1. Princípio Fundamental de Isolamento

> **IMPORTANTE:** O aplicativo **REDLINE Admin (`Redline.Admin`)** é um executável totalmente independente. **Nunca envie o `RedlineAdmin.exe` para os jogadores.** Apenas o `RedlineSetup.exe` (Launcher dos jogadores) deve ser distribuído.
> A API valida todas as permissões no servidor. Mesmo se um jogador descompilasse o Launcher, nenhuma função de geração de chaves ou controle existe no cliente de jogador.

---

## 2. Acesso ao Painel Administrativo

1. Inicie a API caso ela esteja rodando localmente (`dotnet run` em `src/Redline.Api`).
2. Abra o aplicativo `RedlineAdmin.exe`.
3. Preencha as credenciais:
   - **Usuário**: configurado em `appsettings.json` ou variável de ambiente `Admin__Username` (padrão: `admin`).
   - **Senha**: configurada em `appsettings.json` ou variável de ambiente `Admin__Password` (padrão: `RedlineAdmin@2026`).
   - **Código MFA**: código TOTP de 6 dígitos (padrão em dev: `123456`).

---

## 3. Como Gerar Novas Keys para Amigos

1. No menu lateral, clique em **🔑 Gerar Nova Key**.
2. Defina o **Limite de Ativações**:
   - `1` para uma chave pessoal exclusiva de um único computador.
   - Um número maior caso a mesma chave deva ser compartilhada por um grupo específico.
3. Escolha a **Validade**:
   - *Permanente*: a chave não expira.
   - *Data Personalizada*: selecione a data limite no calendário.
4. Adicione uma nota identificadora (ex: "Convidado: Carlos / Servidor Sakhal").
5. Clique em **🔑 Gerar Key Criptográfica**.
6. Uma chave no formato `RDLN-XXXX-XXXX-XXXX-XXXX` será exibida. Clique em **📋 Copiar Key** e envie-a de forma privada ao seu amigo.

---

## 4. Gestão de Licenças e Revogação

Na aba **📋 Licenças & Keys**:
- Você verá o status de cada chave (`Available`, `Active`, `Expired`, `Revoked`, `Blocked`).
- Para revogar o acesso de alguém imediatamente: selecione a chave na tabela e clique em **🚫 Revogar Selecionada**. A API rejeitará as conexões do Launcher vinculado em questão de segundos.

---

## 5. Desvinculação de Dispositivos (Após Formatação do Windows)

Quando um amigo formatar o computador ou trocar de máquina:
1. Abra a aba **🖥 Dispositivos**.
2. Localize a máquina antiga do jogador na lista.
3. Clique em **🔓 Desvincular Dispositivo**.
4. Isso remove a instalação antiga e decrementa a contagem de ativações da chave, permitindo que o jogador ative sua chave novamente na instalação nova do Windows.

---

## 6. Trilha de Auditoria

Na aba **📜 Auditoria & Logs**:
- Você visualiza todas as tentativas de login, geração de chaves, ativações bem-sucedidas e tentativas inválidas.
- É possível clicar em **💾 Exportar para CSV** para gerar um relatório em planilha para conferência.

