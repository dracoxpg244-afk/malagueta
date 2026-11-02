[README.md](https://github.com/user-attachments/files/34283898/README.md)
# ZyonRobloxESP — pacote com build automático

Este pacote inclui um overlay demonstrativo para Windows. Ele desenha entidades sintéticas locais e **não lê a memória do Roblox**.

## Gerar o executável sem instalar Visual Studio no seu PC

O executável Windows precisa ser compilado em ambiente Windows. Este repositório já inclui GitHub Actions para fazer isso na nuvem:

1. Crie um repositório no GitHub e envie todos os arquivos desta pasta.
2. Abra a aba **Actions** do repositório.
3. Selecione **Build Windows EXE**.
4. Clique em **Run workflow**.
5. Quando terminar, abra a execução e baixe o artefato `ZyonRobloxESP-Windows-x64`.
6. Extraia o ZIP baixado e execute `ZyonRobloxESP.exe`.

Não é necessário instalar Visual Studio ou CMake localmente. O GitHub compila o projeto em um runner Windows.

## Controles

F1 overlay geral; F2 nomes; F3 distância; F4 boxes; F5 skeleton; F6 vida; F7 team check; F8 menu; F9 salvar; F10 recriar dados de demonstração; END sair.

## Arquivo de offsets enviado

O `roblox-offsets.json` enviado identifica uma build do cliente Roblox (`version-5a21b87bbc2641cf`, atualizado em 26/10/2026) e contém offsets internos. Eles variam entre versões e não são uma interface de integração estável. Este projeto não consome esses offsets.

## Limitação funcional

O programa é um overlay de demonstração com jogadores fictícios. Para mostrar dados reais de uma experiência sua, implemente no próprio jogo um feed explícito de telemetria e conecte o renderer a esse feed. O pacote não inclui executor de scripts Roblox, injeção, leitura de memória ou bypass de anticheat.
