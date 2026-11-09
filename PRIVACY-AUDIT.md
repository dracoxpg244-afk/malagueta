# 🕵️ REDLINE — Relatório de Auditoria de Privacidade (LGPD)

**Data da Auditoria:** 09 de Novembro de 2026  
**Legislação de Referência:** Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD) e Marco Civil da Internet (Lei nº 12.965/2014)

---

## 1. Princípio da Minimização de Dados (Art. 6º, III da LGPD)

O REDLINE coleta e processa **exclusivamente os dados estritamente necessários** para o funcionamento do ecossistema e a validação de licenças:

| Dado Coletado | Finalidade | Base Legal | Tempo de Retenção |
|---|---|---|---|
| **Hash SHA-256 da Key** | Validar se o jogador possui autorização de acesso | Execução de Contrato / Legítimo Interesse | Enquanto a licença estiver ativa |
| **Token Anônimo da Instalação (UUID)** | Vincular a licença à instalação para controle de vagas | Legítimo Interesse | Até a desvinculação da máquina |
| **Nome da Máquina (Amigável)** | Identificação visual no painel do administrador para suporte | Legítimo Interesse | Enquanto a instalação existir |
| **IP Mascarado de Conexão** | Auditoria de segurança e rate limiting contra ataques | Obrigação Legal (Marco Civil da Internet, Art. 15) | 6 meses |

---

## 2. O que o REDLINE NÃO Coleta (Garantias de Privacidade)

- ❌ **Sem coleta de dados pessoais sensíveis**: CPF, RG, nome completo, telefone ou e-mail pessoal não são solicitados nem armazenados.
- ❌ **Sem coleta invasiva de hardware**: Números de série de disco rígido (HDD/SSD serial), MAC Address de placas de rede ou serial de placa-mãe NÃO são lidos. A identificação é puramente lógica via UUID aleatório persistido no `%appdata%`.
- ❌ **Sem rastreamento de localização**: Coordenadas GPS, cidade ou estado não são coletados.
- ❌ **Sem compartilhamento com terceiros**: Nenhum dado é vendido, repassado a terceiros ou utilizado para fins de telemetria comercial.
- ❌ **Sem exposição de IP entre jogadores**: O sistema de grupos (Party) não revela o endereço IP dos jogadores uns aos outros; apenas o IP do servidor público do DayZ é compartilhado.

---

## 3. Direitos do Titular (Art. 18 da LGPD)

Qualquer amigo ou jogador participante do ecossistema tem direito a:
1. **Confirmação e Acesso**: Saber se seus dados de instalação constam no banco de dados.
2. **Revogação e Exclusão**: Solicitar a remoção completa de seus tokens de instalação e histórico de auditoria mediante solicitação direta ao administrador.
3. **Desvinculação Própria**: Desconectar o Launcher do computador com 1 clique nas Configurações, apagando todos os tokens salvos localmente.

