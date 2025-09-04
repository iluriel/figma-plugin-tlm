
# Plugin Figma – Touch Level Model (TLM)

Este plugin analisa telas no Figma e estima o esforço de interação (toques) segundo o modelo TLM.

## Funcionalidades
- Conta botões (1 toque cada).
- Conta inputs, usando configuração de caracteres médios (ex.: E-mail = 12, Endereço = 25).
- Análise por seleção: funciona em 1 tela, várias telas ou todo o projeto.
- Mostra relatório diretamente no painel do plugin.

## Instalação
1. Baixe e extraia a pasta.
2. No Figma Desktop: `Menu > Plugins > Development > Import plugin from manifest...`
3. Escolha `manifest.json`.

## Observação
Heurísticas simples:
- Botões = nomes contendo "button", "btn", "cta".
- Inputs = nomes contendo "input", "campo", "field".
