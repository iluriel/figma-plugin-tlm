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

const TAP_NAME_PATTERNS = [
  /button/i,
  /\bbtn\b/i,
  /\bcta\b/i,
  /tap/i,
  /banner/i,
  /toast/i,
  /snackbar/i,
  /pill/i,
  /chip/i,
  /fab\b/i,         // Floating Action Button
  /action/i,
  /primary/i,
  /secondary/i,
  /tertiary/i,
  /close\b/i,
  /dismiss\b/i,
  /ok\b/i,
  /confirm\b/i,
  /cancel\b/i,
  /continue\b/i,
  /next\b/i,
  /previous\b/i,
  /back\b/i,
  /voltar\b/i,
  /avançar\b/i,
  /concluir\b/i,
  /finalizar\b/i,
  /enviar\b/i,
  /submit\b/i,
  /salvar\b/i,
  /save\b/i,
  /remover\b/i,
  /delete\b/i,
  /excluir\b/i,
  /editar\b/i,
  /edit\b/i,
  /adicionar\b/i,
  /add\b/i,
  /mais\b/i,
  /menos\b/i,
  /item\b/i,
  /itens\b/i,
  /select\b/i,
  /selecionar\b/i,
  /opção\b/i,
  /option\b/i,
  /abrir\b/i,
  /abrir conta\b/i,
  /entrar\b/i,
  /login\b/i,
  /logout\b/i,
  /sair\b/i,
  /acessar\b/i,
  /detalhes\b/i,
  /detalhe\b/i,
  /ver mais\b/i,
  /vermenos\b/i,
  /ver\b/i,
  /ir\b/i,
  /comprar\b/i,
  /pagar\b/i,
  /assinar\b/i,
  /continuar\b/i,
  /prosseguir\b/i,
  /avançar\b/i,
  /voltar\b/i,
  /iniciar\b/i,
  /começar\b/i,
  /start\b/i,
  /stop\b/i,
  /pausar\b/i,
  /play\b/i,
  /pause\b/i,
  /finalizar\b/i,
  /concluir\b/i,
  /aceitar\b/i,
  /recusar\b/i,
  /recuperar\b/i,
  /esqueci\b/i,
  /senha\b/i,
  /nova senha\b/i,
  /confirmar\b/i,
  /sim\b/i,
  /não\b/i,
  /yes\b/i,
  /no\b/i,
  /ok\b/i,
  /done\b/i,
  /ready\b/i,
  /go\b/i,
  /send\b/i,
  /share\b/i,
  /compartilhar\b/i,
  /download\b/i,
  /baixar\b/i,
  /upload\b/i,
  /carregar\b/i,
  /filtrar\b/i,
  /filter\b/i,
  /aplicar\b/i,
  /apply\b/i,
  /limpar\b/i,
  /clear\b/i,
  /buscar\b/i,
  /search\b/i,
  /pesquisar\b/i,
  /favoritar\b/i,
  /favorito\b/i,
  /like\b/i,
  /curtir\b/i,
  /descurtir\b/i,
  /dislike\b/i,
  /seguir\b/i,
  /follow\b/i,
  /unfollow\b/i,
  /compra\b/i,
  /cart\b/i,
  /carrinho\b/i,
  /checkout\b/i,
  /continuar\b/i,
  /prosseguir\b/i,
  /avançar\b/i,
  /voltar\b/i
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
function detectTapButtons(frame) {
  var all = frame.findAll(function (n) {
    return !!n.name && nameLooksLikeButton(n.name);
  }) || [];
  var visible = [];
  for (var i = 0; i < all.length; i++) {
    if (isIgnoredElement(all[i], frame)) continue;
    visible.push(all[i]);
  }
  var leaves = [];
  for (var j = 0; j < visible.length; j++) {
    var node = visible[j];
    var hasButtonDesc = false;
    var descendants = canFindAll(node)
      ? (node.findAll(function (n) { return !!n.name && nameLooksLikeButton(n.name); }) || [])
      : [];
    for (var k = 0; k < descendants.length; k++) {
      if (descendants[k] === node) continue;
      if (isIgnoredElement(descendants[k], frame)) continue;
      hasButtonDesc = true; break;
    }
    if (!hasButtonDesc) leaves.push(node);
  }
  // Não precisa mais filtrar headerBackIds aqui
  leaves.sort(function (a, b) {
    var ay = ('y' in a ? a.y : 1e12), by = ('y' in b ? b.y : 1e12);
    return ay - by;
  });
  return leaves;
}
function buildKeystrokeFields(frame, inputs) {
  var fields = [];
  for (var i = 0; i < inputs.length; i++) {
    var lblNode = inputs[i].labelNode;
    if (!lblNode) continue;
    var lblRaw = (lblNode.characters || '').trim();
    if (!lblRaw) continue;
    var norm = normalizeLabel(lblRaw);
    var matched = null;
    for (var g = 0; g < FIELD_GUESSES.length; g++) {
      if (FIELD_GUESSES[g].test(norm)) { matched = FIELD_GUESSES[g]; break; }
    }
    if (!matched) continue;
    var canonical = matched.canonical;
    var isNumeric = (canonical === 'CPF' || canonical === 'CEP');
    var count = matched.count;
    if (isNumeric) {
      var maxDigits = 0;
      var contNodes = inputs[i].contentNodes || [];
      for (var c = 0; c < contNodes.length; c++) {
        if (!isNodeVisibleInFrame(contNodes[c], frame)) continue;
        var digits = countDigits(contNodes[c].characters || '');
        if (digits > maxDigits) maxDigits = digits;
      }
      if (maxDigits > 0) count = maxDigits;
    }
    var displayName = (inputs[i].container && inputs[i].container.name)
      ? String(inputs[i].container.name)
      : (nearestNamedAncestor(lblNode) || 'Input');
    fields.push({ label: canonical, count: count, containerName: displayName });
  }
  return fields;
}

// buildReadingBreakdown pode usar isIgnoredElement também:
function buildReadingBreakdown(frame, excludeSet) {
  excludeSet = excludeSet || {};
  var texts = frame.findAll(function (n) { return n.type === 'TEXT'; }) || [];
  var arr = [];
  var total = 0;
  var ordered = texts
    .map(function (t) { return { n: t, y: t.y }; })
    .sort(function (a, b) { return a.y - b.y; })
    .map(function (x) { return x.n; });
  for (var i = 0; i < ordered.length; i++) {
    var t = ordered[i];
    if (isIgnoredElement(t, frame)) continue;
    if (excludeSet[t.id]) continue;
    var raw = (t.characters || '').trim();
    if (!raw) continue;
    var words = countWords(raw);
    if (words <= 0) continue;
    var readWords = (words <= 3) ? words : (words * 0.28);
    var seconds = readWords * 0.3;
    if (seconds <= 0) continue;
    var labelName = (t.name && t.name.trim()) ? t.name.trim() : (nearestNamedAncestor(t) || 'Texto');
    arr.push({ label: labelName + ' (' + words + ')', seconds: seconds });
    total += seconds;
  }
  arr.reverse();
  return { items: arr, total: total };
}
function getHeaderBackButtonIds(frame, buttonLeaves) {
  var headers = frame.findAll(function (n) { return !!n.name && /header/i.test(n.name); }) || [];
  var ids = {};
  for (var h = 0; h < headers.length; h++) {
    var header = headers[h];
    if (!isNodeVisibleInFrame(header, frame)) continue;
    var inHeader = [];
    for (var i = 0; i < buttonLeaves.length; i++) {
      if (isDescendantOf(buttonLeaves[i], header)) inHeader.push(buttonLeaves[i]);
    }
    if (!inHeader.length) continue;
    var best = null, bx = 1e12, by = 1e12;
    for (var j = 0; j < inHeader.length; j++) {
      var b = inHeader[j];
      var bb = getAbsBounds(b);
      var x = bb.x, y = bb.y;
      if (x < bx || (x === bx && y < by)) { best = b; bx = x; by = y; }
    }
    if (best && best.id) ids[best.id] = true;
  }
  return ids;
}
function detectBannerTaps(frame) {
  var res = [];
  var banners = frame.findAll(function (n) { return !!n.name && /banner/i.test(n.name); }) || [];
  for (var i = 0; i < banners.length; i++) {
    var b = banners[i];
    if (isIgnoredElement(b, frame)) continue;
    var hasVisibleButton = false;
    if (canFindAll(b)) {
      var btns = b.findAll(function (n) { return !!n.name && nameLooksLikeButton(n.name); }) || [];
      for (var k = 0; k < btns.length; k++) {
        if (isIgnoredElement(btns[k], frame)) continue;
        hasVisibleButton = true; break;
      }
    }
    if (!hasVisibleButton) res.push(b);
  }
  return res;
}
function detectSelectItemTaps(frame) {
  var items = [];
  var scopes = [];
  var itemGroups = frame.findAll(function (n) { return !!n.name && /\bitens\b/i.test(n.name); }) || [];
  for (var g = 0; g < itemGroups.length; g++) {
    var grp = itemGroups[g];
    if (isIgnoredElement(grp, frame)) continue;
    if (!('children' in grp) || !grp.children) continue;
    var local = 0;
    for (var c = 0; c < grp.children.length; c++) {
      var child = grp.children[c];
      if (isIgnoredElement(child, frame)) continue;
      items.push(child);
      local++;
    }
    if (local > 0) scopes.push(grp);
  }
  var selects = frame.findAll(function (n) { return !!n.name && /select/i.test(n.name); }) || [];
  for (var s = 0; s < selects.length; s++) {
    var sel = selects[s];
    if (isIgnoredElement(sel, frame)) continue;
    var covered = false;
    for (var sc = 0; sc < scopes.length; sc++) { if (isDescendantOf(scopes[sc], sel)) { covered = true; break; } }
    if (covered) continue;
    if (!('children' in sel) || !sel.children) continue;
    var localCount = 0;
    for (var c2 = 0; c2 < sel.children.length; c2++) {
      var ch = sel.children[c2];
      if (isIgnoredElement(ch, frame)) continue;
      var nm = String(ch.name || '').toLowerCase();
      if (/background|bg|divider|separator/.test(nm)) continue;
      items.push(ch);
      localCount++;
    }
    if (localCount > 0) scopes.push(sel);
  }
  return { items: items, scopes: scopes };
}
function detectParallelItemTaps(frame) {
  var resultItems = [];
  var scopes = [];
  var containers = frame.findAll(function (n) {
    return ('children' in n) && n.children && n.children.length > 0;
  }) || [];
  for (var i = 0; i < containers.length; i++) {
    var parent = containers[i];
    if (isIgnoredElement(parent, frame)) continue;
    var candidates = [];
    for (var c = 0; c < parent.children.length; c++) {
      var ch = parent.children[c];
      var nm = String(ch.name || '');
      if (!/item/i.test(nm)) continue;
      if (isIgnoredElement(ch, frame)) continue;
      if (containsVisibleButton(ch, frame)) continue;
      candidates.push(ch);
    }
    if (candidates.length >= 2) {
      for (var x = 0; x < candidates.length; x++) resultItems.push(candidates[x]);
      scopes.push(parent);
    }
  }
  resultItems.sort(function (a, b) {
    var ay = ('y' in a ? a.y : 1e12), by = ('y' in b ? b.y : 1e12);
    return ay - by;
  });
  return { items: resultItems, scopes: scopes };
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
      var buttonLeaves = detectTapButtons(frame);
      var bannerNodes = detectBannerTaps(frame);
      var parallel = detectParallelItemTaps(frame);
      var selectItems = parallel.items || [];
      var itemScopes = parallel.scopes || [];
      var buttonLeavesFiltered = [];
      for (var b = 0; b < buttonLeaves.length; b++) {
        var leaf = buttonLeaves[b];
        var inside = false;
        for (var s = 0; s < itemScopes.length; s++) {
          if (isDescendantOf(leaf, itemScopes[s])) { inside = true; break; }
        }
        if (!inside) buttonLeavesFiltered.push(leaf);
      }
      var tapSubs = [];
      for (var tni = 0; tni < buttonLeavesFiltered.length; tni++) {
        tapSubs.push({ label: buttonLeavesFiltered[tni].name, seconds: round2(TIME.Tap) });
      }
      for (var bn = 0; bn < bannerNodes.length; bn++) {
        tapSubs.push({ label: bannerNodes[bn].name || 'Banner', seconds: round2(TIME.Tap) });
      }
      for (var si = 0; si < selectItems.length; si++) {
        tapSubs.push({ label: selectItems[si].name || 'Item', seconds: round2(TIME.Tap) });
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

  // Ignorar botões de voltar em headers
  if (isHeaderBackButton(node, rootFrame)) return true;

  // Futuro: adicionar mais regras aqui
  return false;
}

// Função auxiliar para identificar botões de voltar em headers
function isHeaderBackButton(node, rootFrame) {
  // Só faz sentido para botões
  if (!nameLooksLikeButton(node.name)) return false;

  // Procura headers na tela
  var headers = rootFrame.findAll(function (n) {
    return !!n.name && /header/i.test(n.name);
  }) || [];

  for (var h = 0; h < headers.length; h++) {
    var header = headers[h];
    if (!isNodeVisibleInFrame(header, rootFrame)) continue;
    if (!isDescendantOf(node, header)) continue;

    // Busca o botão mais à esquerda e acima dentro do header
    var btns = header.findAll(function (n) {
      return !!n.name && nameLooksLikeButton(n.name) && isNodeVisibleInFrame(n, rootFrame);
    }) || [];
    if (!btns.length) continue;

    var best = null, bx = 1e12, by = 1e12;
    for (var j = 0; j < btns.length; j++) {
      var b = btns[j];
      var bb = getAbsBounds(b);
      var x = bb.x, y = bb.y;
      if (x < bx || (x === bx && y < by)) { best = b; bx = x; by = y; }
    }
    if (best && best.id === node.id) return true;
  }
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