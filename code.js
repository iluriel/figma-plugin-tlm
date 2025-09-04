// UI
figma.showUI(__html__, { width: 600, height: 520 });

/* =====================
 * Constantes
 * ===================== */
var TIME = {
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

var DISTRACTION = { none: 1.00, low: 1.06, medium: 1.14, high: 1.21 };
var PLUGIN_KEY = 'tlm.config';
var NOTE_KEY = 'tlm.noteOwner';
var AUTO_TAP_PER_FIELD = true;

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
// Checagens utilitárias
function canFindAll(n) { return !!(n && typeof n.findAll === 'function'); }
function isDescendantOf(node, ancestor) {
  var p = node && node.parent;
  while (p) { if (p === ancestor) return true; p = p.parent; }
  return false;
}

// Áreas nomeadas (status-bar / header)
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

// "input" e "text field"
function nameLooksLikeInput(name) {
  name = String(name || '');
  // input | text field | text-field | textfield
  return /(input|text\s*[\-\s]?field|textfield)/i.test(name);
}
function nameLooksLikeButton(name) {
  name = String(name || '');
  return /button/i.test(name);
}

// Encontra o ancestral mais próximo que tenha filhos (suporte a findAll/children)
function nearestChildrenContainer(node) {
  var p = node;
  while (p) {
    if (canFindAll(p)) return p;
    p = p.parent;
  }
  return null;
}

function canFindAll(n) {
  return !!(n && typeof n.findAll === 'function');
}

function nearestChildrenContainer(node) {
  var p = node;
  while (p) {
    if (canFindAll(p)) return p;
    p = p.parent;
  }
  return null;
}

function nameLooksLikeInput(name) {
  name = String(name || '');
  return /(^|[^a-z])input([^a-z]|$)/i.test(name);
}

function nameLooksLikeButton(name) {
  name = String(name || '');
  return /button/i.test(name);
}

function countDigits(s) {
  var m = String(s || '').match(/\d/g);
  return m ? m.length : 0;
}


// Mantém apenas containers "folha" dentro do conjunto de containers (remove quem contém outro container da lista)

// Mantém apenas containers "folha" (sem outro container da mesma lista dentro dele)
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


function canFindAll(n) {
  return !!(n && typeof n.findAll === 'function');
}

function nearestChildrenContainer(node) {
  var p = node;
  while (p) {
    if (canFindAll(p)) return p;
    p = p.parent;
  }
  return null;
}


// Nome parece "input"?
function nameLooksLikeInput(name) {
  name = String(name || '');
  return /(^|[^a-z])input([^a-z]|$)/i.test(name);
}

// TEXT descendentes visíveis de um container
function getVisibleTextDescendants(container, rootFrame) {
  if (!canFindAll(container)) return [];
  var texts = container.findAll(function (n) { return n.type === 'TEXT'; }) || [];
  var out = [];
  for (var i = 0; i < texts.length; i++) {
    if (isNodeVisibleInFrame(texts[i], rootFrame)) out.push(texts[i]);
  }
  return out;
}


// Retorna o TEXT "logo acima" do container (mais próximo), com alguma sobreposição horizontal
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

// Encontra containers de input + rótulos e conteúdo

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

  // Filtra visíveis e fora de status-bar
  var filtered = [];
  for (var v = 0; v < containers.length; v++) {
    if (!isNodeVisibleInFrame(containers[v], rootFrame)) continue;
    if (isInsideStatusBar(containers[v], rootFrame)) continue;
    filtered.push(containers[v]);
  }
  containers = filtered;

  // Mantém apenas "folhas"
  containers = filterInputContainersLeaves(containers);

  // 3) Para cada container, decide label e conteúdo
  var result = [];
  var usedLabelIds = {}; // evita usar o mesmo label em dois inputs

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


// Retorna true se o texto bruto parece ser um rótulo de campo de input
function isLikelyInputFieldLabel(raw) {
  var norm = normalizeLabel(raw || '');
  // Reusa as regras de FIELD_GUESSES (E-mail, Senha, Nome, CPF, CEP)
  for (var i = 0; i < FIELD_GUESSES.length; i++) {
    if (FIELD_GUESSES[i].test(norm)) return true;
  }
  return false;
}

// Detecta candidatos de Tap pelo nome (button/btn/cta/link/...)
// Ordena de cima->baixo e deduplica por nome.
function nameLooksLikeButton(name) {
  name = String(name || '');
  return /button/i.test(name);
}

function detectTapButtons(frame) {
  var all = frame.findAll(function (n) {
    return !!n.name && nameLooksLikeButton(n.name);
  }) || [];

  // Visíveis e fora de status-bar / keyboard
  var visible = [];
  for (var i = 0; i < all.length; i++) {
    if (!isNodeVisibleInFrame(all[i], frame)) continue;
    if (isInsideStatusBar(all[i], frame)) continue;
    if (isInsideKeyboard(all[i], frame)) continue; // <<< NOVO
    visible.push(all[i]);
  }

  // Folhas
  var leaves = [];
  for (var j = 0; j < visible.length; j++) {
    var node = visible[j];
    var hasButtonDesc = false;

    var descendants = canFindAll(node)
      ? (node.findAll(function (n) { return !!n.name && nameLooksLikeButton(n.name); }) || [])
      : [];

    for (var k = 0; k < descendants.length; k++) {
      if (descendants[k] === node) continue;
      if (!isNodeVisibleInFrame(descendants[k], frame)) continue;
      if (isInsideStatusBar(descendants[k], frame)) continue;
      if (isInsideKeyboard(descendants[k], frame)) continue; // <<< NOVO
      hasButtonDesc = true; break;
    }
    if (!hasButtonDesc) leaves.push(node);
  }

  // Ignora o "back" no header
  var headerBackIds = getHeaderBackButtonIds(frame, leaves);
  var filtered = [];
  for (var m = 0; m < leaves.length; m++) {
    if (!headerBackIds[leaves[m].id]) filtered.push(leaves[m]);
  }

  // Ordena por Y
  filtered.sort(function (a, b) {
    var ay = ('y' in a ? a.y : 1e12), by = ('y' in b ? b.y : 1e12);
    return ay - by;
  });

  return filtered;
}

function buildKeystrokeFields(frame, inputs) {
  var fields = []; // { label: 'CPF', count: 11, containerName: 'Input/CPF' }

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
    if (!matched) continue; // sem tipo -> não chuta

    var canonical = matched.canonical;
    var isNumeric = (canonical === 'CPF' || canonical === 'CEP');

    var count = matched.count; // base
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


// Regras: email 25, senha 6, nome 12, cpf 11, cep 8
var FIELD_GUESSES = [
  { test: function (s) { return /\bemail\b/.test(s); }, canonical: 'E-mail', count: 25 },
  { test: function (s) { return /\b(senha|password)\b/.test(s); }, canonical: 'Senha', count: 6 },
  { test: function (s) { return /\bnome\b/.test(s); }, canonical: 'Nome', count: 12 },
  { test: function (s) { return /\bcpf\b/.test(s); }, canonical: 'CPF', count: 11 },
  { test: function (s) { return /\bcep\b/.test(s); }, canonical: 'CEP', count: 8 }
];

// Conta palavras (A–Z, acentuadas e dígitos)
function countWords(s) {
  if (!s) return 0;
  var stripped = String(s).trim().replace(/\s+/g, ' ');
  var m = stripped.match(/[A-Za-zÀ-ÖØ-öø-ÿ0-9]+/g);
  return m ? m.length : 0;
}

// Sobe na árvore até achar um ancestral com "name"
function nearestNamedAncestor(node) {
  var p = node.parent;
  while (p) {
    if (p.name && String(p.name).trim()) return String(p.name).trim();
    p = p.parent;
  }
  return '';
}

// Bounds absolutas (tenta usar absoluteRenderBounds; fallback em absoluteTransform+width/height)
function getAbsBounds(node) {
  // Alguns nodes têm absoluteRenderBounds (melhor p/ rotações, efeitos, etc.)
  if ('absoluteRenderBounds' in node && node.absoluteRenderBounds) {
    var r = node.absoluteRenderBounds; // { x, y, width, height }
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  }
  // Fallback geométrico simples
  var m = node.absoluteTransform; // [[a,c,e],[b,d,f]]
  var x = m[0][2];
  var y = m[1][2];
  return { x: x, y: y, w: node.width || 0, h: node.height || 0 };
}

function rectsIntersect(a, b) {
  return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
}

// Verifica se o TEXT está realmente visível na tela/Frame
function isNodeVisibleInFrame(node, rootFrame) {
  // 1) Cadeia de visibilidade e opacidade
  var n = node;
  while (n) {
    if (n.visible === false) return false;
    if ('opacity' in n && typeof n.opacity === 'number' && n.opacity === 0) return false;
    if (n === rootFrame) break;
    n = n.parent;
  }

  // 2) Clipping: se algum ancestral clipa, o texto precisa intersectar a área clipada
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

// Constrói o breakdown de Reading (0,3s/word; >3 palavras => lê 28%)
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

    if (!isNodeVisibleInFrame(t, frame)) continue;
    if (isInsideStatusBar(t, frame)) continue;
    if (isInsideKeyboard(t, frame)) continue; // <<< NOVO: ignora teclado
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

  arr.reverse(); // ordem invertida (B, A)
  return { items: arr, total: total };
}

// Botão "voltar": primeiro button dentro de cada header (esquerda->direita; empate: mais alto)
function getHeaderBackButtonIds(frame, buttonLeaves) {
  var headers = frame.findAll(function (n) { return !!n.name && /header/i.test(n.name); }) || [];
  var ids = {};
  for (var h = 0; h < headers.length; h++) {
    var header = headers[h];
    if (!isNodeVisibleInFrame(header, frame)) continue;

    // buttons dentro do header
    var inHeader = [];
    for (var i = 0; i < buttonLeaves.length; i++) {
      if (isDescendantOf(buttonLeaves[i], header)) inHeader.push(buttonLeaves[i]);
    }
    if (!inHeader.length) continue;

    // escolhe o mais à esquerda; empate -> mais alto
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

// Banners: contam 1 Tap se não tiverem botões dentro
function detectBannerTaps(frame) {
  var res = [];
  var banners = frame.findAll(function (n) { return !!n.name && /banner/i.test(n.name); }) || [];
  for (var i = 0; i < banners.length; i++) {
    var b = banners[i];
    if (!isNodeVisibleInFrame(b, frame)) continue;
    if (isInsideStatusBar(b, frame)) continue;
    if (isInsideKeyboard(b, frame)) continue; // <<< NOVO

    var hasVisibleButton = false;
    if (canFindAll(b)) {
      var btns = b.findAll(function (n) { return !!n.name && nameLooksLikeButton(n.name); }) || [];
      for (var k = 0; k < btns.length; k++) {
        if (!isNodeVisibleInFrame(btns[k], frame)) continue;
        if (isInsideStatusBar(btns[k], frame)) continue;
        if (isInsideKeyboard(btns[k], frame)) continue; // <<< NOVO
        hasVisibleButton = true; break;
      }
    }
    if (!hasVisibleButton) res.push(b);
  }
  return res;
}

// Select/Itens: conta 1 Tap por item
function detectSelectItemTaps(frame) {
  var items = [];
  var scopes = []; // containers onde os itens foram contabilizados (para evitar duplo-contar botões dentro)

  // 1) Grupos "itens"
  var itemGroups = frame.findAll(function (n) { return !!n.name && /\bitens\b/i.test(n.name); }) || [];
  for (var g = 0; g < itemGroups.length; g++) {
    var grp = itemGroups[g];
    if (!isNodeVisibleInFrame(grp, frame)) continue;
    if (isInsideStatusBar(grp, frame)) continue;
    if (!('children' in grp) || !grp.children) continue;

    var local = 0;
    for (var c = 0; c < grp.children.length; c++) {
      var child = grp.children[c];
      if (!isNodeVisibleInFrame(child, frame)) continue;
      items.push(child);
      local++;
    }
    if (local > 0) scopes.push(grp);
  }

  // 2) Containers com "select" no nome (se não tinham "itens" explícito)
  var selects = frame.findAll(function (n) { return !!n.name && /select/i.test(n.name); }) || [];
  for (var s = 0; s < selects.length; s++) {
    var sel = selects[s];
    if (!isNodeVisibleInFrame(sel, frame)) continue;
    if (isInsideStatusBar(sel, frame)) continue;

    // Se já pegamos os "itens" dentro dele, pula
    var covered = false;
    for (var sc = 0; sc < scopes.length; sc++) { if (isDescendantOf(scopes[sc], sel)) { covered = true; break; } }
    if (covered) continue;

    if (!('children' in sel) || !sel.children) continue;
    var localCount = 0;
    for (var c2 = 0; c2 < sel.children.length; c2++) {
      var ch = sel.children[c2];
      if (!isNodeVisibleInFrame(ch, frame)) continue;
      // Evita pegar elementos óbvios de fundo
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

  // Procura qualquer node com children
  var containers = frame.findAll(function (n) {
    return ('children' in n) && n.children && n.children.length > 0;
  }) || [];

  for (var i = 0; i < containers.length; i++) {
    var parent = containers[i];
    if (!isNodeVisibleInFrame(parent, frame)) continue;
    if (isInsideStatusBar(parent, frame)) continue;

    // Filhos cujo nome contém "item"
    var candidates = [];
    for (var c = 0; c < parent.children.length; c++) {
      var ch = parent.children[c];
      var nm = String(ch.name || '');
      if (!/item/i.test(nm)) continue;
      if (!isNodeVisibleInFrame(ch, frame)) continue;
      if (isInsideStatusBar(ch, frame)) continue;

      // Só conta se NÃO tiver botão interno
      if (containsVisibleButton(ch, frame)) continue;

      candidates.push(ch);
    }

    // Só conta se tiver pelo menos 2 "items" em paralelo no mesmo grupo
    if (candidates.length >= 2) {
      for (var x = 0; x < candidates.length; x++) resultItems.push(candidates[x]);
      scopes.push(parent); // escopo para evitar duplo-contar botões dentro desses itens
    }
  }

  // Ordena por Y, só para uma saída consistente
  resultItems.sort(function (a, b) {
    var ay = ('y' in a ? a.y : 1e12), by = ('y' in b ? b.y : 1e12);
    return ay - by;
  });

  return { items: resultItems, scopes: scopes };
}

/* =====================
 * Detecção de labels
 * ===================== */
function detectInputLabels(frame) {
  var textNodes = frame.findAll(function (n) { return n.type === 'TEXT'; }) || [];
  var ordered = textNodes
    .map(function (t) { return { n: t, y: t.y }; })
    .sort(function (a, b) { return a.y - b.y; })
    .map(function (x) { return x.n; });

  var out = [];
  for (var i = 0; i < ordered.length; i++) {
    var raw = (ordered[i].characters || '').trim().replace(/\s+/g, ' ');
    if (!raw) continue;
    var norm = normalizeLabel(raw);
    for (var g = 0; g < FIELD_GUESSES.length; g++) {
      if (FIELD_GUESSES[g].test(norm)) {
        out.push({ label: FIELD_GUESSES[g].canonical, count: FIELD_GUESSES[g].count });
        break;
      }
    }
  }

  // se nada por texto, tenta nome dos nós
  if (out.length === 0) {
    var all = frame.findAll(function () { return true; }) || [];
    var byY = all
      .map(function (n) { return { n: n, y: ('y' in n ? n.y : 1e12) }; })
      .sort(function (a, b) { return a.y - b.y; })
      .map(function (x) { return x.n.name || ''; });
    for (var j = 0; j < byY.length; j++) {
      var nm = normalizeLabel(byY[j]);
      for (var g2 = 0; g2 < FIELD_GUESSES.length; g2++) {
        if (FIELD_GUESSES[g2].test(nm)) {
          out.push({ label: FIELD_GUESSES[g2].canonical, count: FIELD_GUESSES[g2].count });
          break;
        }
      }
    }
  }

  // dedup
  var seen = {};
  var dedup = [];
  for (var k = 0; k < out.length; k++) {
    var key = out[k].label + '|' + out[k].count;
    if (seen[key]) continue;
    seen[key] = true;
    dedup.push(out[k]);
  }
  return dedup;
}

function containsVisibleButton(node, frame) {
  if (!canFindAll(node)) return false;
  var btns = node.findAll(function (n) { return !!n.name && nameLooksLikeButton(n.name); }) || [];
  for (var i = 0; i < btns.length; i++) {
    if (!isNodeVisibleInFrame(btns[i], frame)) continue;
    if (isInsideStatusBar(btns[i], frame)) continue;
    if (isInsideKeyboard(btns[i], frame)) continue; // <<< NOVO
    return true;
  }
  return false;
}

function detectParallelItemTaps(frame) {
  var resultItems = [];
  var scopes = [];

  var containers = frame.findAll(function (n) {
    return ('children' in n) && n.children && n.children.length > 0;
  }) || [];

  for (var i = 0; i < containers.length; i++) {
    var parent = containers[i];
    if (!isNodeVisibleInFrame(parent, frame)) continue;
    if (isInsideStatusBar(parent, frame)) continue;
    if (isInsideKeyboard(parent, frame)) continue; // <<< NOVO

    var candidates = [];
    for (var c = 0; c < parent.children.length; c++) {
      var ch = parent.children[c];
      var nm = String(ch.name || '');
      if (!/item/i.test(nm)) continue;
      if (!isNodeVisibleInFrame(ch, frame)) continue;
      if (isInsideStatusBar(ch, frame)) continue;
      if (isInsideKeyboard(ch, frame)) continue; // <<< NOVO
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
  // Loading persistente (cancelado manualmente no finally)
  var loadingNotify = null;
  try {
    // Antes de começar
    figma.ui.postMessage({ type: 'loading', state: 'start' });

    // ... no finally, independente de sucesso/erro:
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

      // Inputs + Labels
      var inputs = findInputsAndLabels(frame);

      // Keystroke fields (com máscara numérica se houver)
      var fields = buildKeystrokeFields(frame, inputs);

      // Excluir conteúdos de inputs no Reading
      var exclude = {};
      for (var c = 0; c < inputs.length; c++) {
        var contNodes = inputs[c].contentNodes || [];
        for (var h = 0; h < contNodes.length; h++) {
          if (contNodes[h] && contNodes[h].id) exclude[contNodes[h].id] = true;
        }
      }

      // Reading
      var readingBD = buildReadingBreakdown(frame, exclude); // { items, total }

      // Tap: buttons-folha (já ignora status-bar e o back do header)
      var buttonLeaves = detectTapButtons(frame);

      // Tap: banners (1 tap se sem botões dentro)
      var bannerNodes = detectBannerTaps(frame);

      // Tap: itens "em paralelo" (irmãos com 'item' no nome, sem botão interno)
      var parallel = detectParallelItemTaps(frame); // { items, scopes }
      var selectItems = parallel.items || [];
      var itemScopes = parallel.scopes || [];

      // Evita duplo-contar: remove botões que estejam dentro dos escopos dos itens
      var buttonLeavesFiltered = [];
      for (var b = 0; b < buttonLeaves.length; b++) {
        var leaf = buttonLeaves[b];
        var inside = false;
        for (var s = 0; s < itemScopes.length; s++) {
          if (isDescendantOf(leaf, itemScopes[s])) { inside = true; break; }
        }
        if (!inside) buttonLeavesFiltered.push(leaf);
      }

      // Monta subitens de Tap: buttons, banners, itens
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

      // Totais
      var counts = { Tap: tapSubs.length, Swipe: 0, Drag: 0, Homing: 0, Pinch: 0, Zoom: 0, MentalAct: 0 };
      var extraKeystrokes = 0;
      var distractionKey = 'none';
      var D = DISTRACTION[distractionKey];

      // Keystrokes
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

      // Subitens arredondados
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

      // Linhas (arredondadas)
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

    // Sucesso
    if (loadingNotify && loadingNotify.cancel) loadingNotify.cancel();
    figma.notify('Análises geradas!');
  } catch (e) {
    if (loadingNotify && loadingNotify.cancel) loadingNotify.cancel();
    figma.notify('Erro ao analisar: ' + (e && e.message ? e.message : String(e)));
    console.error(e);
  }
}


async function upsertAnnotation(ownerFrame, result) {
  // Remove anotação antiga deste frame
  var old = figma.currentPage.findAll(function (n) {
    return n.type === 'FRAME' && n.getPluginData(NOTE_KEY) === ownerFrame.id;
  });
  for (var i = 0; i < old.length; i++) { try { old[i].remove(); } catch (e) { } }

  // --- Config ---
  var GAP = 32; // mesmo espaçamento de antes (pode ajustar se quiser)

  // Container visual
  var box = figma.createFrame();
  box.name = 'TLM - ' + ownerFrame.name;
  box.layoutMode = 'VERTICAL';
  box.primaryAxisSizingMode = 'AUTO';   // altura automática pelo conteúdo
  box.counterAxisSizingMode = 'FIXED';  // largura fixa (vamos setar igual ao frame)
  box.paddingTop = 8; box.paddingBottom = 8; box.paddingLeft = 8; box.paddingRight = 8;
  box.itemSpacing = 8; box.cornerRadius = 8;
  box.strokes = [{ type: 'SOLID', color: { r: 0.90, g: 0.90, b: 0.95 } }];
  box.strokeWeight = 1;
  box.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.97, b: 0.99 } }];

  // Título
  var title = figma.createText();
  title.characters = 'Interacoes';
  title.fontName = { family: 'Inter', style: 'Bold' };
  title.fontSize = 14;
  title.fills = [{ type: 'SOLID', color: { r: 0.216, g: 0.251, b: 0.306 } }];
  // ocupar largura e quebrar quando precisar
  title.layoutAlign = 'STRETCH';
  if ('textAutoResize' in title) title.textAutoResize = 'HEIGHT';

  // Subtitle (Total)
  var subtitle = figma.createText();
  subtitle.characters = 'Total: ' + formatSecondsComma(result.total);
  subtitle.fontName = { family: 'Inter', style: 'Bold' };
  subtitle.fontSize = 12;
  subtitle.fills = [{ type: 'SOLID', color: { r: 0.216, g: 0.251, b: 0.306 } }];
  subtitle.layoutAlign = 'STRETCH';
  if ('textAutoResize' in subtitle) subtitle.textAutoResize = 'HEIGHT';

  // Corpo: operadores + subitens
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

  // Monta node (ordem importa para auto layout)
  box.appendChild(title);
  box.appendChild(subtitle);
  box.appendChild(body);

  // Define a largura igual ao frame analisado (depois de montar o conteúdo)
  box.resize(ownerFrame.width, box.height);

  // Posiciona ABAIXO do frame, com o mesmo espaçamento
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