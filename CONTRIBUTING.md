# 🤝 REDLINE — Guia de Contribuição e Boas Práticas

O REDLINE é um projeto privado mantido para um grupo fechado de amigos. Caso outros desenvolvedores autorizados contribuam com código ou melhorias, siga estritamente estas diretrizes.

---

## 1. Regras Fundamentais de Segurança

1. **Nunca misture responsabilidades**: O código de administração NUNCA deve ser incluído no projeto do Launcher (`Redline.Launcher`).
2. **Nunca armazene segredos em código**: Senhas de banco, chaves privadas JWT e tokens de administrador devem vir exclusivamente de variáveis de ambiente.
3. **Nunca crie backdoors ou senhas mestras escondidas**: Todas as permissões devem ser verificadas pela API através de claims válidas.
4. **Respeite o EULA e o Anticheat do DayZ**:
   - Zero injeção de código em processos do jogo (`CreateRemoteThread`, `WriteProcessMemory`).
   - Zero leitura de memória privada do jogo (`ReadProcessMemory`).
   - Zero modificação em binários oficiais ou arquivos de jogo protegidos.
5. **Privacidade (LGPD)**: Nunca adicione coleta de números de série físicos de hardware (disco rígido, BIOS, placa-mãe ou MAC address).

---

## 2. Padrões de Código C# / .NET 8

- Utilize C# 12 com recursos modernos (primary constructors, pattern matching, records).
- Mantenha `Nullable` habilitado (`<Nullable>enable</Nullable>`) e trate avisos de possíveis nulos.
- Todas as operações de I/O de rede e disco devem ser assíncronas (`async` / `await`).
- Use nomes descritivos em português para interfaces de usuário e em inglês para identificadores de código.

---

## 3. Fluxo de Trabalho e Testes

Antes de submeter qualquer alteração:

```powershell
$env:PATH = "$env:USERPROFILE\.dotnet;$env:PATH"

# 1. Compilar toda a solução
dotnet build Redline.sln -c Release

# 2. Executar os testes automatizados
dotnet test Redline.sln -c Release
```

Certifique-se de que todos os testes passaram com 0 falhas antes de criar uma nova versão.

