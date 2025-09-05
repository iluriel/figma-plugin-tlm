// =====================
// UI
// =====================
figma.showUI(__html__, { width: 600, height: 520 });

/* =====================
 * Constantes
 * ===================== */
const TIME = {
  Keystroke: 0.28,
  Homing: 0.34,
  MentalAct: 1.35,
  Response: 0.0,
  Gesture: 0.0,
  Pinch: 0.36,
  Zoom: 0.36,
  InitialAct: 0.0,
  Tap: 0.25,
  Swipe: 0.42,
  Tilt: 0.0,
  Rotate: 0.0,
  Drag: 0.44
};

const DISTRACTION = { none: 1.00, low: 1.06, medium: 1.14, high: 1.21 };
const PLUGIN_KEY = 'tlm.config';
const NOTE_KEY = 'tlm.noteOwner';
const AUTO_TAP_PER_FIELD = true;

const FIELD_GUESSES = [
  { test: s => /\bemail\b/.test(s), canonical: 'E-mail', count: 25 },
  { test: s => /\b(senha|password)\b/.test(s), canonical: 'Senha', count: 6 },
  { test: s => /\bnome\b/.test(s), canonical: 'Nome', count: 12 },
  { test: s => /\bcpf\b/.test(s), canonical: 'CPF', count: 11 },
  { test: s => /\bcep\b/.test(s), canonical: 'CEP', count: 8 }
];

/**
 * TAP_NAME_PATTERNS
 * 
 * Lista centralizada de padrões de nomes para identificar elementos clicáveis (tap).
 * Para adicionar um novo termo, basta incluir um novo regex aqui.
 * 
 * Exemplos:
 * - Botões: button, btn, cta, action, primary, secondary, etc.
 * - Banners: banner, toast, snackbar, etc.
 * - Ações comuns: salvar, enviar, concluir, cancelar, etc.
 * - Termos em português e inglês.
 */
const TAP_NAME_PATTERNS = [
  /button/i,           // button
  /\bbtn\b/i,          // btn
  /\bcta\b/i,          // cta
  /tap/i,              // tap
  /banner/i,           // banner
  /toast/i,            // toast
  /snackbar/i,         // snackbar
  /pill/i,             // pill
  /chip/i,             // chip
  /fab\b/i,            // Floating Action Button
  /action/i,           // action
  /primary/i,          // primary
  /secondary/i,        // secondary
  /tertiary/i,         // tertiary
  /close\b/i,          // close
  /dismiss\b/i,        // dismiss
  /ok\b/i,             // ok
  /confirm\b/i,        // confirm
  /cancel\b/i,         // cancel
  /continue\b/i,       // continue
  /next\b/i,           // next
  /previous\b/i,       // previous
  /back\b/i,           // back
  /voltar\b/i,         // voltar
  /avançar\b/i,        // avançar
  /concluir\b/i,       // concluir
  /finalizar\b/i,      // finalizar
  /enviar\b/i,         // enviar
  /submit\b/i,         // submit
  /salvar\b/i,         // salvar
  /save\b/i,           // save
  /remover\b/i,        // remover
  /delete\b/i,         // delete
  /excluir\b/i,        // excluir
  /editar\b/i,         // editar
  /edit\b/i,           // edit
  /adicionar\b/i,      // adicionar
  /add\b/i,            // add
  /mais\b/i,           // mais
  /menos\b/i,          // menos
  /item\b/i,           // item
  /itens\b/i,          // itens
  /select\b/i,         // select
  /selecionar\b/i,     // selecionar
  /opção\b/i,          // opção
  /option\b/i,         // option
  /abrir\b/i,          // abrir
  /abrir conta\b/i,    // abrir conta
  /entrar\b/i,         // entrar
  /login\b/i,          // login
  /logout\b/i,         // logout
  /sair\b/i,           // sair
  /acessar\b/i,        // acessar
  /detalhes\b/i,       // detalhes
  /detalhe\b/i,        // detalhe
  /ver mais\b/i,       // ver mais
  /vermenos\b/i,       // vermenos
  /ver\b/i,            // ver
  /ir\b/i,             // ir
  /comprar\b/i,        // comprar
  /pagar\b/i,          // pagar
  /assinar\b/i,        // assinar
  /continuar\b/i,      // continuar
  /prosseguir\b/i,     // prosseguir
  /iniciar\b/i,        // iniciar
  /começar\b/i,        // começar
  /start\b/i,          // start
  /stop\b/i,           // stop
  /pausar\b/i,         // pausar
  /play\b/i,           // play
  /pause\b/i,          // pause
  /aceitar\b/i,        // aceitar
  /recusar\b/i,        // recusar
  /recuperar\b/i,      // recuperar
  /esqueci\b/i,        // esqueci
  /senha\b/i,          // senha
  /nova senha\b/i,     // nova senha
  /confirmar\b/i,      // confirmar
  /sim\b/i,            // sim
  /não\b/i,            // não
  /yes\b/i,            // yes
  /no\b/i,             // no
  /done\b/i,           // done
  /ready\b/i,          // ready
  /go\b/i,             // go
  /send\b/i,           // send
  /share\b/i,          // share
  /compartilhar\b/i,   // compartilhar
  /download\b/i,       // download
  /baixar\b/i,         // baixar
  /upload\b/i,         // upload
  /carregar\b/i,       // carregar
  /filtrar\b/i,        // filtrar
  /filter\b/i,         // filter
  /aplicar\b/i,        // aplicar
  /apply\b/i,          // apply
  /limpar\b/i,         // limpar
  /clear\b/i,          // clear
  /buscar\b/i,         // buscar
  /search\b/i,         // search
  /pesquisar\b/i,      // pesquisar
  /favoritar\b/i,      // favoritar
  /favorito\b/i,       // favorito
  /like\b/i,           // like
  /curtir\b/i,         // curtir
  /descurtir\b/i,      // descurtir
  /dislike\b/i,        // dislike
  /seguir\b/i,         // seguir
  /follow\b/i,         // follow
  /unfollow\b/i,       // unfollow
  /compra\b/i,         // compra
  /cart\b/i,           // cart
  /carrinho\b/i,       // carrinho
  /checkout\b/i        // checkout
  // Adicione mais padrões aqui no futuro
];

/* =====================
 * Utils
 * ===================== */
function clamp(n, min, max) {
  n = Number(n);
  if (!isFinite(n)) n = 0;
  if (n < min) n = min;
  if (n > max) n = max;
  return n;
}
function formatSecondsComma(n) {
  n = Number(n);
  if (!isFinite(n)) n = 0;
  try {
    return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + 's';
  } catch (e) {
    var s = String(Math.round(n * 100) / 100).replace('.', ',');
    return s + 's';
  }
}
function round2(n) {
  n = Number(n);
  if (!isFinite(n)) n = 0;
  return Math.round(n * 100) / 100;
}
function stripDiacritics(s) {
  return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function normalizeLabel(s) {
  return stripDiacritics(s)
    .toLowerCase()
    .replace(/[_\-.:*\/()#|[\]{}]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function canFindAll(n) {
  return !!(n && typeof n.findAll === 'function');
}
function isDescendantOf(node, ancestor) {
  var p = node && node.parent;
  while (p) { if (p === ancestor) return true; p = p.parent; }
  return false;
}
function isInsideArea(node, rootFrame, rx) {
  var p = node;
  while (p) {
    if (p.name && rx.test(String(p.name))) return true;
    if (p === rootFrame) break;
    p = p.parent;
  }
  return false;
}
function isInsideKeyboard(node, rootFrame) {
  return isInsideArea(node, rootFrame, /keyboard/i);
}
function isInsideStatusBar(node, rootFrame) { return isInsideArea(node, rootFrame, /status[\-\s]?bar/i); }
function isInsideHeader(node, rootFrame) { return isInsideArea(node, rootFrame, /header/i); }
function nameLooksLikeInput(name) {
  name = String(name || '');
  // input | text field | text-field | textfield
  return /(input|text\s*[\-\s]?field|textfield)/i.test(name);
}
function nameLooksLikeButton(name) {
  name = String(name || '');
  return /button/i.test(name);
}
function nearestChildrenContainer(node) {
  var p = node;
  while (p) {
    if (canFindAll(p)) return p;
    p = p.parent;
  }
  return null;
}
function countDigits(s) {
  var m = String(s || '').match(/\d/g);
  return m ? m.length : 0;
}
function filterInputContainersLeaves(containers) {
  var byId = {};
  for (var i = 0; i < containers.length; i++) if (containers[i] && containers[i].id) byId[containers[i].id] = true;
  var leaves = [];
  for (var j = 0; j < containers.length; j++) {
    var c = containers[j];
    var hasDescendant = false;
    if (canFindAll(c)) {
      var desc = c.findAll(function (n) { return !!(n && n.id && byId[n.id]); }) || [];
      for (var k = 0; k < desc.length; k++) { if (desc[k] !== c && byId[desc[k].id]) { hasDescendant = true; break; } }
    }
    if (!hasDescendant) leaves.push(c);
  }
  return leaves;
}
function getVisibleTextDescendants(container, rootFrame) {
  if (!canFindAll(container)) return [];
  var texts = container.findAll(function (n) { return n.type === 'TEXT'; }) || [];
  var out = [];
  for (var i = 0; i < texts.length; i++) {
    if (isNodeVisibleInFrame(texts[i], rootFrame)) out.push(texts[i]);
  }
  return out;
}
function getClosestLabelAbove(container, rootFrame) {
  var allTexts = rootFrame.findAll(function (n) { return n.type === 'TEXT'; }) || [];
  var cB = getAbsBounds(container);
  var best = null;
  var bestDy = Infinity;

  for (var i = 0; i < allTexts.length; i++) {
    var t = allTexts[i];
    // ignorar textos invisíveis ou descendentes do próprio container
    var p = t.parent, inside = false;
    while (p) { if (p === container) { inside = true; break; } p = p.parent; }
    if (inside) continue;
    if (!isNodeVisibleInFrame(t, rootFrame)) continue;

    var b = getAbsBounds(t);
    // precisa estar acima (b.y + b.h <= cB.y) e com alguma interseção horizontal (10% da largura do menor)
    var isAbove = (b.y + b.h) <= cB.y;
    if (!isAbove) continue;

    var interLeft = Math.max(b.x, cB.x);
    var interRight = Math.min(b.x + b.w, cB.x + cB.w);
    var interW = Math.max(0, interRight - interLeft);
    var minW = Math.max(1, Math.min(b.w, cB.w)); // evita divisão por 0
    if (interW / minW < 0.1) continue; // pouca sobreposição: ignora

    var dy = cB.y - (b.y + b.h); // distância vertical
    if (dy >= 0 && dy < bestDy) { bestDy = dy; best = t; }
  }

  return best;
}
function countWords(s) {
  if (!s) return 0;
  var stripped = String(s).trim().replace(/\s+/g, ' ');
  var m = stripped.match(/[A-Za-zÀ-ÖØ-öø-ÿ0-9]+/g);
  return m ? m.length : 0;
}
function nearestNamedAncestor(node) {
  var p = node.parent;
  while (p) {
    if (p.name && String(p.name).trim()) return String(p.name).trim();
    p = p.parent;
  }
  return '';
}
function getAbsBounds(node) {
  if ('absoluteRenderBounds' in node && node.absoluteRenderBounds) {
    var r = node.absoluteRenderBounds;
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  }
  var m = node.absoluteTransform;
  var x = m[0][2];
  var y = m[1][2];
  return { x: x, y: y, w: node.width || 0, h: node.height || 0 };
}
function rectsIntersect(a, b) {
  return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
}
function isNodeVisibleInFrame(node, rootFrame) {
  var n = node;
  while (n) {
    if (n.visible === false) return false;
    if ('opacity' in n && typeof n.opacity === 'number' && n.opacity === 0) return false;
    if (n === rootFrame) break;
    n = n.parent;
  }
  var abs = getAbsBounds(node);
  var p = node.parent;
  while (p) {
    var clips = false;
    if ((p.type === 'FRAME' || p.type === 'COMPONENT' || p.type === 'INSTANCE') && p.clipsContent === true) {
      clips = true;
    }
    if (clips) {
      var pb = getAbsBounds(p);
      if (!rectsIntersect(abs, pb)) return false;
    }
    if (p === rootFrame) break;
    p = p.parent;
  }
  return true;
}

/* =====================
 * Detecção de elementos
 * ===================== */
function findInputsAndLabels(rootFrame) {
  var containers = [];

  // 1) containers cujo name contem input/text field
  var namedContainers = rootFrame.findAll(function (n) {
    var t = n.type;
    if (t === 'FRAME' || t === 'COMPONENT' || t === 'INSTANCE' || t === 'GROUP' || t === 'SECTION') {
      return nameLooksLikeInput(n.name);
    }
    return false;
  }) || [];
  for (var i = 0; i < namedContainers.length; i++) containers.push(namedContainers[i]);

  // 2) TEXT com name "input"/"text field"/"textfield" -> ancestral com filhos vira container
  var inputTexts = rootFrame.findAll(function (n) {
    return n.type === 'TEXT' && nameLooksLikeInput(n.name);
  }) || [];
  for (var j = 0; j < inputTexts.length; j++) {
    var cont = nearestChildrenContainer(inputTexts[j].parent || inputTexts[j]);
    if (cont) containers.push(cont);
  }

  // Dedup por id
  var seen = {};
  var dedup = [];
  for (var d = 0; d < containers.length; d++) {
    var c = containers[d];
    if (!c || !c.id) continue;
    if (seen[c.id]) continue;
    seen[c.id] = true;
    dedup.push(c);
  }
  containers = dedup;

  // Filtra usando isIgnoredElement
  var filtered = [];
  for (var v = 0; v < containers.length; v++) {
    if (isIgnoredElement(containers[v], rootFrame)) continue;
    filtered.push(containers[v]);
  }
  containers = filtered;

  // Mantém apenas "folhas"
  containers = filterInputContainersLeaves(containers);

  // 3) Para cada container, decide label e conteúdo
  var result = [];
  var usedLabelIds = {};

  for (var k = 0; k < containers.length; k++) {
    var cont = containers[k];
    var texts = getVisibleTextDescendants(cont, rootFrame)
      .map(function (t) { return { n: t, y: t.y }; })
      .sort(function (a, b) { return a.y - b.y; })
      .map(function (x) { return x.n; });

    var labelNode = null;
    var contentNodes = [];

    if (texts.length >= 2) {
      labelNode = texts[0];
      for (var r = 1; r < texts.length; r++) contentNodes.push(texts[r]);
    } else if (texts.length === 1) {
      contentNodes.push(texts[0]);
      var ext = getClosestLabelAbove(cont, rootFrame);
      if (ext && !usedLabelIds[ext.id]) labelNode = ext;
    } else {
      var ext2 = getClosestLabelAbove(cont, rootFrame);
      if (ext2 && !usedLabelIds[ext2.id]) labelNode = ext2;
    }

    if (labelNode) usedLabelIds[labelNode.id] = true;

    result.push({ container: cont, labelNode: labelNode, contentNodes: contentNodes });
  }

  return result;
}
function isLikelyInputFieldLabel(raw) {
  var norm = normalizeLabel(raw || '');
  for (var i = 0; i < FIELD_GUESSES.length; i++) {
    if (FIELD_GUESSES[i].test(norm)) return true;
  }
  return false;
}

/* =====================
 * Análise + anotação
 * ===================== */
async function generateAnalysisAutoFromSelection() {
  var loadingNotify = null;
  try {
    figma.ui.postMessage({ type: 'loading', state: 'start' });
    figma.ui.postMessage({ type: 'loading', state: 'done' });
    loadingNotify = figma.notify('Analisando…', { timeout: 60000 });
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
    var frames = figma.currentPage.selection.filter(function (n) { return n.type === 'FRAME'; });
    if (!frames.length) {
      figma.notify('Selecione pelo menos uma tela (Frame).');
      if (loadingNotify && loadingNotify.cancel) loadingNotify.cancel();
      return;
    }
    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];
      var inputs = findInputsAndLabels(frame);
      var fields = buildKeystrokeFields(frame, inputs);
      var exclude = {};
      for (var c = 0; c < inputs.length; c++) {
        var contNodes = inputs[c].contentNodes || [];
        for (var h = 0; h < contNodes.length; h++) {
          if (contNodes[h] && contNodes[h].id) exclude[contNodes[h].id] = true;
        }
      }
      var readingBD = buildReadingBreakdown(frame, exclude);

      // NOVO: Use apenas detectTapComponents para identificar todos os taps
      var tapNodes = detectTapComponents(frame);
      var tapSubs = [];
      for (var tni = 0; tni < tapNodes.length; tni++) {
        tapSubs.push({ label: tapNodes[tni].name || 'Tap', seconds: round2(TIME.Tap) });
      }
      var counts = { Tap: tapSubs.length, Swipe: 0, Drag: 0, Homing: 0, Pinch: 0, Zoom: 0, MentalAct: 0 };

      var extraKeystrokes = 0;
      var distractionKey = 'none';
      var D = DISTRACTION[distractionKey];
      var keystrokesDetected = 0;
      for (var f = 0; f < fields.length; f++) keystrokesDetected += (fields[f].count || 0);
      var keystrokesTotal = keystrokesDetected + extraKeystrokes;
      var tRaw = {
        Keystroke: keystrokesTotal * TIME.Keystroke,
        Reading: readingBD.total,
        Homing: counts.Homing * TIME.Homing,
        MentalAct: counts.MentalAct * TIME.MentalAct,
        Pinch: counts.Pinch * TIME.Pinch,
        Zoom: counts.Zoom * TIME.Zoom,
        Tap: counts.Tap * TIME.Tap,
        Swipe: counts.Swipe * TIME.Swipe,
        Drag: counts.Drag * TIME.Drag,
        Gesture: 0, InitialAct: 0, Tilt: 0, Rotate: 0,
        Response: 0
      };
      var operatorsSum =
        tRaw.Keystroke + tRaw.Reading + tRaw.Homing + tRaw.MentalAct + tRaw.Pinch + tRaw.Zoom + tRaw.Tap + tRaw.Swipe + tRaw.Drag
        + tRaw.Gesture + tRaw.InitialAct + tRaw.Tilt + tRaw.Rotate;
      var inflated = operatorsSum * D;
      var distractionAdded = inflated - operatorsSum;
      var total = inflated + tRaw.Response;
      var ksSubs = [];
      for (var s2 = 0; s2 < fields.length; s2++) {
        var sec = round2(fields[s2].count * TIME.Keystroke);
        if (sec > 0) ksSubs.push({ label: fields[s2].containerName + ' (' + fields[s2].count + ')', seconds: sec });
      }
      var readSubs = [];
      var itms = readingBD.items || [];
      for (var ri = 0; ri < itms.length; ri++) {
        readSubs.push({ label: itms[ri].label, seconds: round2(itms[ri].seconds) });
      }
      var saveCfg = { distraction: distractionKey, responses: [], counts: counts, fields: fields, extraKeystrokes: extraKeystrokes };
      frame.setPluginData(PLUGIN_KEY, JSON.stringify(saveCfg));
      var t = {
        Keystroke: round2(tRaw.Keystroke),
        Reading: round2(tRaw.Reading),
        Homing: round2(tRaw.Homing),
        MentalAct: round2(tRaw.MentalAct),
        Pinch: round2(tRaw.Pinch),
        Zoom: round2(tRaw.Zoom),
        Tap: round2(tRaw.Tap),
        Swipe: round2(tRaw.Swipe),
        Drag: round2(tRaw.Drag),
        Gesture: 0, InitialAct: 0, Tilt: 0, Rotate: 0,
        Response: round2(tRaw.Response)
      };
      var distractionRounded = round2(distractionAdded);
      var totalRounded = round2(total);
      var items = [];
      if (t.Keystroke > 0) items.push(['Keystroke', t.Keystroke]);
      if (t.Reading > 0) items.push(['Reading', t.Reading]);
      if (t.Homing > 0) items.push(['Homing', t.Homing]);
      if (t.MentalAct > 0) items.push(['Mental Act', t.MentalAct]);
      if (t.Response > 0) items.push(['Response', t.Response]);
      if (distractionRounded > 0) items.push(['Distraction', distractionRounded, D]);
      if (t.Gesture > 0) items.push(['Gesture', t.Gesture]);
      if (t.Pinch > 0) items.push(['Pinch', t.Pinch]);
      if (t.Zoom > 0) items.push(['Zoom', t.Zoom]);
      if (t.InitialAct > 0) items.push(['Inicial act', t.InitialAct]);
      if (t.Tap > 0) items.push(['Tap', t.Tap]);
      if (t.Swipe > 0) items.push(['Swipe', t.Swipe]);
      if (t.Tilt > 0) items.push(['Tilt', t.Tilt]);
      if (t.Rotate > 0) items.push(['Rotate', t.Rotate]);
      if (t.Drag > 0) items.push(['Drag', t.Drag]);
      var breakdown = {
        Keystroke: ksSubs,
        Tap: tapSubs,
        Reading: readSubs
      };
      await upsertAnnotation(frame, {
        total: totalRounded,
        items: items,
        breakdown: breakdown
      });
    }
    if (loadingNotify && loadingNotify.cancel) loadingNotify.cancel();
    figma.notify('Análises geradas!');
  } catch (e) {
    if (loadingNotify && loadingNotify.cancel) loadingNotify.cancel();
    figma.notify('Erro ao analisar: ' + (e && e.message ? e.message : String(e)));
    console.error(e);
  }
}
async function upsertAnnotation(ownerFrame, result) {
  var old = figma.currentPage.findAll(function (n) {
    return n.type === 'FRAME' && n.getPluginData(NOTE_KEY) === ownerFrame.id;
  });
  for (var i = 0; i < old.length; i++) { try { old[i].remove(); } catch (e) { } }
  var GAP = 32;
  var box = figma.createFrame();
  box.name = 'TLM - ' + ownerFrame.name;
  box.layoutMode = 'VERTICAL';
  box.primaryAxisSizingMode = 'AUTO';
  box.counterAxisSizingMode = 'FIXED';
  box.paddingTop = 8; box.paddingBottom = 8; box.paddingLeft = 8; box.paddingRight = 8;
  box.itemSpacing = 8; box.cornerRadius = 8;
  box.strokes = [{ type: 'SOLID', color: { r: 0.90, g: 0.90, b: 0.95 } }];
  box.strokeWeight = 1;
  box.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.97, b: 0.99 } }];
  var title = figma.createText();
  title.characters = 'Interacoes';
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.fontSize = 14;
  title.fills = [{ type: 'SOLID', color: { r: 0.216, g: 0.251, b: 0.306 } }];
  title.layoutAlign = 'STRETCH';
  if ('textAutoResize' in title) title.textAutoResize = 'HEIGHT';
  var subtitle = figma.createText();
  subtitle.characters = 'Total: ' + formatSecondsComma(result.total);
  subtitle.fontName = { family: 'Inter', style: 'Bold' };
  subtitle.fontSize = 12;
  subtitle.fills = [{ type: 'SOLID', color: { r: 0.216, g: 0.251, b: 0.306 } }];
  subtitle.layoutAlign = 'STRETCH';
  if ('textAutoResize' in subtitle) subtitle.textAutoResize = 'HEIGHT';
  var body = figma.createText();
  var lines = [];
  for (var a = 0; a < result.items.length; a++) {
    var label = result.items[a][0];
    var value = result.items[a][1];
    var factor = result.items[a][2];
    if (!value || value <= 0) continue;
    if (label === 'Distraction') {
      var factorStr = (Math.round(factor * 100) / 100).toFixed(2).replace('.', ',');
      lines.push('Distraction (x' + factorStr + '): +' + formatSecondsComma(value));
    } else {
      lines.push(label + ': ' + formatSecondsComma(value));
      var subs = result.breakdown ? result.breakdown[label] : null;
      if (subs && subs.length) {
        for (var s = 0; s < subs.length; s++) {
          var sv = subs[s].seconds;
          if (!sv || sv <= 0) continue;
          lines.push('- ' + subs[s].label + ': ' + formatSecondsComma(sv));
        }
      }
    }
  }
  body.characters = lines.length ? lines.join('\n') : '—';
  body.fontName = { family: 'Inter', style: 'Regular' };
  body.fontSize = 12;
  body.lineHeight = { value: 20, unit: 'PIXELS' };
  body.fills = [{ type: 'SOLID', color: { r: 0.216, g: 0.251, b: 0.306 } }];
  body.layoutAlign = 'STRETCH';
  if ('textAutoResize' in body) body.textAutoResize = 'HEIGHT';
  box.appendChild(title);
  box.appendChild(subtitle);
  box.appendChild(body);
  box.resize(ownerFrame.width, box.height);
  box.x = ownerFrame.x;
  box.y = ownerFrame.y + ownerFrame.height + GAP;
  figma.currentPage.appendChild(box);
  box.setPluginData(NOTE_KEY, ownerFrame.id);
  return box;
}

/* =====================
 * Mensageria
 * ===================== */
figma.ui.onmessage = function (msg) {
  if (msg.type === 'ping') {
    generateAnalysisAutoFromSelection().catch(function (e) {
      figma.notify('Erro: ' + (e && e.message ? e.message : String(e)));
      console.error(e);
    });
  }
};

function isIgnoredElement(node, rootFrame) {
  if (!isNodeVisibleInFrame(node, rootFrame)) return true;
  if (isInsideKeyboard(node, rootFrame)) return true;
  if (isInsideStatusBar(node, rootFrame)) return true;
  // Futuro: adicionar mais regras aqui
  return false;
}

function isTapComponent(node) {
  if (!node || !node.name) return false;
  for (const pattern of TAP_NAME_PATTERNS) {
    if (pattern.test(node.name)) return true;
  }
  return false;
}

function detectTapComponents(frame) {
  // 1. Encontre todos os nodes que são tap
  const allTapNodes = frame.findAll(n => isTapComponent(n) && !isIgnoredElement(n, frame));

  // 2. Filtre para manter só os "leaves" (não contar pai e filho ao mesmo tempo)
  const tapLeaves = [];
  const tapIds = new Set(allTapNodes.map(n => n.id));

  for (const node of allTapNodes) {
    let ancestorIsTap = false;
    let p = node.parent;
    while (p && p !== frame) {
      if (tapIds.has(p.id)) {
        ancestorIsTap = true;
        break;
      }
      p = p.parent;
    }
    if (!ancestorIsTap) tapLeaves.push(node);
  }

  return tapLeaves;
}

function buildKeystrokeFields(frame, inputs) {
  // Exemplo básico: retorna um array vazio ou implemente sua lógica
  return [];
}

function buildReadingBreakdown(frame, excludeSet) {
  // Exemplo básico: retorna um objeto vazio ou implemente sua lógica
  return { items: [], total: 0 };
}