figma.ui.onmessage = async (msg) => {
  if (msg.type === "generate-analysis") {
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.notify("Selecione pelo menos uma tela (Frame).");
      return;
    }

    await figma.loadFontAsync({ family: "Inter", style: "Regular" });

    for (const node of selection) {
      if (node.type === "FRAME") {
        // Cria retângulo arredondado (balão)
        const balloon = figma.createRectangle();
        balloon.resize(120, 40);
        balloon.cornerRadius = 12;
        balloon.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 0.6 } }]; // amarelinho

        // Cria o texto
        const text = figma.createText();
        text.characters = "Teste.";
        text.fontSize = 14;
        text.x = 10;
        text.y = 10;

        // Agrupa retângulo + texto
        const group = figma.group([balloon, text], figma.currentPage);
        group.name = "Annotation";

        // Posiciona ao lado do frame
        group.x = node.x + node.width + 20;
        group.y = node.y + 20;
      }
    }

    figma.notify("Annotations adicionadas!");
  }
};
