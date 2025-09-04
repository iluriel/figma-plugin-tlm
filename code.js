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
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });

// 🔑 Carrega as fontes necessárias antes
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });

for (const node of selection) {
  if (node.type === "FRAME") {
    // Cria o frame (box da anotação)
    const annotationFrame = figma.createFrame();
    annotationFrame.layoutMode = "VERTICAL"; 
    annotationFrame.counterAxisSizingMode = "AUTO"; 
    annotationFrame.primaryAxisSizingMode = "AUTO"; 
    annotationFrame.paddingTop = 8;
    annotationFrame.paddingBottom = 8;
    annotationFrame.paddingLeft = 8;
    annotationFrame.paddingRight = 8;
    annotationFrame.itemSpacing = 8; // espaço entre título e corpo
    annotationFrame.cornerRadius = 8;
    annotationFrame.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }];

    // --- Título ---
    const title = figma.createText();
    title.characters = "Interações";
    title.fontName = { family: "Inter", style: "Bold" };
    title.fontSize = 14;
    title.fills = [{ type: 'SOLID', color: { r: 0.216, g: 0.251, b: 0.306 } }];
    
    // --- Subtítulo ---
    const subtitle = figma.createText();
    subtitle.characters = "Total: 0,0s";
    subtitle.fontName = { family: "Inter", style: "Bold" };
    subtitle.fontSize = 12;
    subtitle.fills = [{ type: 'SOLID', color: { r: 0.216, g: 0.251, b: 0.306 } }];

    // --- Corpo (lista com múltiplas linhas) ---
    const body = figma.createText();
    body.characters = 
    `Keystroke: 0,0s
Homing: 0,0s
Mental Act: 0,0s
Response: 0,0s
Distraction: 0,0s
Gesture: 0,0s
Pinch: 0,0s
Zoom: 0,0s
Inicial act: 0,0s
Tap: 0,0s
Swipe: 0,0s
Tilt: 0,0s
Rotate: 0,0s
Drag: 0,0s`;
    body.fontName = { family: "Inter", style: "Regular" };
    body.fontSize = 12;
    body.lineHeight = { value: 20, unit: "PIXELS" }; // mais espaçamento entre linhas
    body.fills = [{ type: 'SOLID', color: { r: 0.216, g: 0.251, b: 0.306 } }];

    // Adiciona os textos ao frame
    annotationFrame.appendChild(title);
    annotationFrame.appendChild(subtitle);
    annotationFrame.appendChild(body);

    // Posiciona o frame inteiro
    annotationFrame.x = node.x + node.width + 32;
    annotationFrame.y = node.y;

    figma.currentPage.appendChild(annotationFrame);
  }
}


    figma.notify("Annotations adicionadas!");
  }
};
