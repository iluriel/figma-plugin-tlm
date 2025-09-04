// Mostra a UI
figma.showUI(__html__, { width: 300, height: 200 });

// Recebe mensagem da UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === "generate-analysis") {
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.notify("Selecione pelo menos uma tela (Frame).");
      return;
    }

    // 🔑 Carrega a fonte antes de criar qualquer texto
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });

    for (const node of selection) {
      if (node.type === "FRAME") {
        // Cria annotation "Teste."
        const annotation = figma.createText();
        annotation.characters = "Teste.";

        // Posiciona acima da tela
        annotation.x = node.x + 20;
        annotation.y = node.y - 40;

        figma.currentPage.appendChild(annotation);
      }
    }

    figma.notify("Annotations adicionadas!");
  }
};
