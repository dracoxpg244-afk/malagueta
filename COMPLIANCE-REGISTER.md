# 📜 REDLINE — Registro de Conformidade (Compliance Register)

Este documento registra a análise oficial de conformidade do software REDLINE com os termos de uso da **Bohemia Interactive a.s.**, diretrizes do **BattlEye Anti-Cheat** e do **Steam Subscriber Agreement**.

---

## 1. Tabela de Registro de Conformidade

| Fonte Consultada | URL de Referência | Data da Consulta | Regra Encontrada | Funcionalidade Afetada | Risco Avaliado | Medida Adotada no REDLINE | Status |
|---|---|---|---|---|---|---|---|
| **DayZ EULA** | [bohemia.net/dayz-eula](https://www.bohemia.net/en/licenses/dayz-end-user-license) | 09/11/2026 | Proibição de engenharia reversa, modificação de arquivos de jogo protegidos e injeção de código. | Inicializador / Launcher | Nulo | O REDLINE inicia o jogo através de argumentos oficiais de linha de comando (`-mod=`, `-connect=`), sem modificar arquivos binários (`.exe`, `.pbo`). | Conforme |
| **BattlEye Anti-Cheat** | [battleye.com](https://www.battleye.com/) | 09/11/2026 | Banimento global para injeção de DLLs, hooks de funções de renderização direta (DirectX/Vulkan) ou leitura de memória (`ReadProcessMemory`). | Mira Fixa (Overlay) | Nulo (Global) / Baixo (Local) | A mira visual é uma janela transparente nativa do Windows (DWM) sem nenhum gancho em processos de terceiros. Mantida desativada por padrão com aviso claro ao usuário. | Conforme |
| **Bohemia Game Content Rules** | [bohemia.net/game-content-rules](https://www.bohemia.net/community/game-content-usage-rules) | 09/11/2026 | Proibição de uso comercial de marcas e logotipos proprietários da Bohemia em softwares não autorizados. | Interface e Marca | Nulo | O REDLINE é estritamente gratuito, privado e para amigos convidados. Marcas e logos do DayZ possuem aviso explícito de propriedade da Bohemia. | Conforme |
| **Steam Workshop Terms** | [store.steampowered.com](https://store.steampowered.com/subscriber_agreement/) | 09/11/2026 | Mods devem ser baixados e gerenciados através dos canais autorizados do Steam Workshop. | Gerenciamento de Mods | Nulo | O REDLINE não faz download pirata nem redistribui mods de terceiros; ele apenas lê a pasta local de mods já baixados pelo Steam do usuário. | Conforme |
| **Bohemia Tools EULA** | [community.bohemia.net](https://community.bohemia.net/wiki/DayZ:End_User_License_Agreement_for_DayZ_Tools) | 09/11/2026 | Não violar formatos de assinatura proprietários (bisafe / bisign). | Verificação de integridade | Nulo | O REDLINE apenas verifica se as assinaturas existem antes de lançar o jogo para prevenir kicks no servidor, sem alterá-las. | Conforme |

---

## 2. Política de Revisão Periódica

- **Periodicidade de Revisão**: Trimestral ou a cada grande atualização do DayZ Standalone.
- **Responsável**: Administrador do projeto REDLINE.
- **Próxima Revisão Programada**: Fevereiro de 2027.

