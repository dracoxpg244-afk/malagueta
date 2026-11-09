# 🔒 REDLINE — Relatório de Auditoria de Segurança

**Data da Auditoria:** 09 de Novembro de 2026  
**Status:** APROVADO COM RESTRIÇÕES DOCUMENTADAS  
**Alvo:** REDLINE Ecosystem (Launcher, Admin, API e Core)

---

## 1. Princípios de Segurança Implementados

### A. Armazenamento e Geração de Chaves
- **Chaves em Texto Puro:** NUNCA são salvas no banco de dados. A API computa o hash criptográfico SHA-256 (`SHA256(plainKey)`) imediatamente na geração e descarta a string original.
- **Entropia Criptográfica:** As chaves utilizam o gerador criptográfico de números pseudo-aleatórios do sistema operacional (`RandomNumberGenerator.GetBytes`), garantindo 128 a 256 bits de entropia real contra ataques de predição.
- **Prefixo Público Seguro:** O banco armazena apenas um prefixo de 8 caracteres (`RDLN-XXXX`) para exibição visual no painel do administrador, insuficiente para reconstruir o hash ou deduzir a chave original.

### B. Autenticação e Autorização
- **Tokens JWT:** Assinados com HMAC-SHA256 através de chave secreta mantida estritamente nas variáveis de ambiente do servidor (`Jwt:Secret`).
- **Tempo de Vida Curto:** Access Tokens expiram em 2 horas. Refresh tokens utilizam rotação com revogação transacional.
- **Isolamento de Painel Administrativo:** Rotas do Admin exigem role `admin`. O aplicativo `Redline.Admin` utiliza autenticação própria com MFA (TOTP de 6 dígitos) e limite de tentativas contra brute-force.
- **Sem Backdoors:** Não existem contas secretas, senhas mestras ou bypasses de autenticação embutidos no código-fonte.

### C. Proteção Contra Ataques de Rede e Abuso
- **Rate Limiting:** Implementado via `RateLimitMiddleware` no pipeline HTTP da API (limite de 20 requisições por minuto por IP para endpoints sensíveis de validação e ativação).
- **Proteção contra SQL Injection:** O acesso ao banco é 100% gerenciado via Entity Framework Core com consultas parametrizadas.
- **Proteção de IP Residencial do Desenvolvedor:** A API nunca deve ser executada com portas abertas no roteador doméstico. O tráfego deve passar por Cloudflare Tunnel / Cloudflare CDN ou hospedagem em contêiner em nuvem (Render, Koyeb, Fly.io).

---

## 2. Matriz de Ameaças e Mitigações

| Ameaça Identificada | Risco | Mitigação Implementada no REDLINE |
|---|---|---|
| Jogador altera arquivos locais para ativar licença | Baixo | A validação é estritamente no servidor online (`POST /api/license/validate`). Manipulação local resulta em token inválido. |
| Força bruta em chaves de ativação | Médio | O espaço de busca para chaves de 16 caracteres com 32 símbolos é de $32^{16} \approx 1,2 \times 10^{24}$ combinações. O rate-limiter bloqueia após 5 tentativas inválidas. |
| Jogador compartilha o executável com terceiros | Baixo | O Launcher exige chave válida na primeira execução. O número de ativações é limitado no banco e controlado pelo Admin. |
| Tentativa de descompilar o Launcher para extrair funções Admin | Nulo | O código do Admin (`Redline.Admin`) reside em projeto e assembly completamente separados, não estando presente nos binários do jogador. |
| Detecção por anticheat (BattlEye) | Nulo | O REDLINE não realiza injeção de DLLs, não lê memória de processos (`ReadProcessMemory`) e a mira é um overlay transparente padrão do Windows. |

---

## 3. Recomendações para Produção

1. Gerar uma chave secreta JWT com pelo menos 64 caracteres em produção e injetá-la como variável de ambiente `Jwt__Secret`.
2. Habilitar HTTPS estrito com certificados TLS 1.3 emitidos automaticamente pelo provedor de hospedagem / Cloudflare.
3. Não compartilhar credenciais de acesso ao banco de dados com ninguém.

