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
  { test: s => /\b(senha|password|pass|pwd)\b/.test(s), canonical: 'Senha', count: 6 },
  { test: s => /\bnome\b/.test(s), canonical: 'Nome', count: 12 },
  { test: s => /\bsobrenome\b/.test(s), canonical: 'Sobrenome', count: 15 },
  { test: s => /\bcpf\b/.test(s), canonical: 'CPF', count: 11, onlyDigits: true },
  { test: s => /\brg\b/.test(s), canonical: 'RG', count: 9, onlyDigits: true },
  { test: s => /\bcnpj\b/.test(s), canonical: 'CNPJ', count: 14, onlyDigits: true },
  { test: s => /\bcep\b/.test(s), canonical: 'CEP', count: 8, onlyDigits: true },
  { test: s => /\btelefone\b/.test(s), canonical: 'Telefone', count: 11, onlyDigits: true },
  { test: s => /\bcelular\b/.test(s), canonical: 'Celular', count: 11, onlyDigits: true },
  { test: s => /\bdata\b/.test(s), canonical: 'Data', count: 8 },
  { test: s => /\bnascimento\b/.test(s), canonical: 'Data de Nascimento', count: 8 },
  { test: s => /\bendere[cç]o\b/.test(s), canonical: 'Endereço', count: 30 },
  { test: s => /\bbairro\b/.test(s), canonical: 'Bairro', count: 20 },
  { test: s => /\bcidade\b/.test(s), canonical: 'Cidade', count: 20 },
  { test: s => /\bestado\b/.test(s), canonical: 'Estado', count: 2 },
  { test: s => /\bnumero\b/.test(s), canonical: 'Número', count: 5 },
  { test: s => /\bcomplemento\b/.test(s), canonical: 'Complemento', count: 20 },
  { test: s => /\bpais\b/.test(s), canonical: 'País', count: 20 },
  { test: s => /\bprofiss[aã]o\b/.test(s), canonical: 'Profissão', count: 20 },
  { test: s => /\brenda\b/.test(s), canonical: 'Renda', count: 10 },
  { test: s => /\bempresa\b/.test(s), canonical: 'Empresa', count: 30 },
  { test: s => /\bmatr[ií]cula\b/.test(s), canonical: 'Matrícula', count: 10 },
  { test: s => /\bplaca\b/.test(s), canonical: 'Placa', count: 7 },
  { test: s => /\bcart[aã]o\b/.test(s), canonical: 'Cartão', count: 16 },
  { test: s => /\bconta\b/.test(s), canonical: 'Conta', count: 10 },
  { test: s => /\bag[êe]ncia\b/.test(s), canonical: 'Agência', count: 4 },
  { test: s => /\bchave\b/.test(s), canonical: 'Chave', count: 15 },
  { test: s => /\btoken\b/.test(s), canonical: 'Token', count: 8 },
  { test: s => /\bpis\b/.test(s), canonical: 'PIS', count: 11, onlyDigits: true },
  { test: s => /\btitulo\b/.test(s), canonical: 'Título', count: 12 },
  { test: s => /\bserie\b/.test(s), canonical: 'Série', count: 6 },
  { test: s => /\bnacionalidade\b/.test(s), canonical: 'Nacionalidade', count: 20 },
  { test: s => /\bnaturalidade\b/.test(s), canonical: 'Naturalidade', count: 20 },
  { test: s => /\buser(name)?\b/.test(s), canonical: 'Usuário', count: 15 },
  { test: s => /\blogin\b/.test(s), canonical: 'Login', count: 15 },
  { test: s => /\bvalor\b/.test(s), canonical: 'Valor', count: 10 },
  { test: s => /\bmensagem\b/.test(s), canonical: 'Mensagem', count: 100 },
  { test: s => /\bcoment[aá]rio\b/.test(s), canonical: 'Comentário', count: 100 },
  { test: s => /\bdescricao\b/.test(s), canonical: 'Descrição', count: 100 },
  { test: s => /\bdescription\b/.test(s), canonical: 'Descrição', count: 100 },
  { test: s => /\bobs(erv[aã]o)?\b/.test(s), canonical: 'Observação', count: 30 }
];

/**
 * TAP_NAME_PATTERNS
 * 
 * Lista centralizada de padrões de nomes para identificar elementos clicáveis (tap).
 * Para adicionar um novo termo, basta incluir um novo regex aqui.
 */
const TAP_NAME_PATTERNS = [
  /button/i,
  /\bbtn\b/i,
  /\bcta\b/i,
  /tap/i,
  /banner/i,
  /card/i,
  /toast/i,
  /snackbar/i,
  /pill/i,
  /chip/i,
  /fab\b/i,
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
  /iniciar\b/i,
  /começar\b/i,
  /start\b/i,
  /stop\b/i,
  /pausar\b/i,
  /play\b/i,
  /pause\b/i,
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
  /checkout\b/i
  // Adicione mais padrões aqui no futuro
];

/**
 * INPUT_NAME_PATTERNS
 * 
 * Lista centralizada de padrões de nomes para identificar componentes de input (campos de digitação).
 * Para adicionar um novo termo, basta incluir um novo regex aqui.
 * Exemplos: input, text field, campo, senha, password, search, busca, etc.
 */
const INPUT_NAME_PATTERNS = [
  /input/i,
  /text\s*field/i,
  /textfield/i,
  /campo/i,
  /senha/i,
  /password/i,
  /search/i,
  /busca/i,
  /e-mail/i,
  /email/i,
  /cpf/i,
  /cep/i,
  /nome/i,
  /telefone/i,
  /celular/i,
  /address/i,
  /endereço/i,
  /number/i,
  /número/i,
  /user/i,
  /usuario/i,
  /usuário/i,
  /login/i,
  /mensagem/i,
  /message/i,
  /comentário/i,
  /comment/i,
  /obs\b/i,
  /observação/i,
  /note/i,
  /notas/i,
  /data/i,
  /date/i,
  /form/i,
  /formulário/i,
  /valor/i,
  /value/i,
  /quantidade/i,
  /quantity/i
  // Adicione mais padrões aqui no futuro
];

/**
 * LABEL_NAME_PATTERNS
 * 
 * Padrões para identificar labels de input (título do campo).
 */
const LABEL_NAME_PATTERNS = [
  /label/i,
  /t[ií]tulo/i,
  /campo/i,
  /input\s*title/i,
  /input\s*label/i,
  /descri[cç][aã]o/i,
  /description/i,
  /nome/i,
  /field\s*name/i
  // Adicione mais padrões aqui no futuro
];

/**
 * HINT_NAME_PATTERNS
 * 
 * Padrões para identificar hints, helpers, mensagens de erro ou ajuda.
 */
const HINT_NAME_PATTERNS = [
  /hint/i,
  /ajuda/i,
  /helper/i,
  /help/i,
  /erro/i,
  /error/i,
  /mensagem/i,
  /message/i,
  /dica/i,
  /exemplo/i,
  /placeholder/i,
  /info/i,
  /informativo/i,
  /sugest[aã]o/i,
  /suggestion/i
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
      return isInputComponent(n);
    }
    return false;
  }) || [];
  for (var i = 0; i < namedContainers.length; i++) containers.push(namedContainers[i]);

  // 2) TEXT com name de input -> ancestral com filhos vira container
  var inputTexts = rootFrame.findAll(function (n) {
    return n.type === 'TEXT' && isInputComponent(n);
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
      if (t.MentalAct > 0) items.push(['Mental', t.MentalAct]);
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
  const fields = [];
  for (const input of inputs) {
    // 1. Identificar textos internos visíveis
    const texts = (input.contentNodes || []).filter(t => t.type === 'TEXT');
    let digitavel = null;

    // 2. Heurística: se só tem um texto, é o campo digitável
    if (texts.length === 1) {
      digitavel = texts[0];
    } else if (texts.length > 1) {
      // Se tem labelNode, o campo digitável é o primeiro texto que não é o label
      if (input.labelNode && texts[0].id === input.labelNode.id) {
        digitavel = texts[1];
      } else {
        digitavel = texts[0];
      }
    }

    if (!digitavel) continue;

    // 3. Identificar o tipo do campo (label, hint, placeholder, máscara)
    let tipo = '';
    let count = 10; // valor padrão
    let labelRaw = '';
    if (input.labelNode && input.labelNode.characters) {
      labelRaw = input.labelNode.characters.trim();
    }
    let placeholder = '';
    if (digitavel.characters) {
      placeholder = digitavel.characters.trim();
    }

    // CORREÇÃO: Priorizar identificação por contexto antes do placeholder
    let norm = normalizeLabel(labelRaw || input.container.name || '');
    let matched = null;
    
    // Primeiro tenta identificar pelo label
    for (const guess of FIELD_GUESSES) {
      if (guess.test(norm)) {
        matched = guess;
        break;
      }
    }
    
    // Se não encontrou no label, tenta no placeholder
    if (!matched && placeholder) {
      let placeholderNorm = normalizeLabel(placeholder);
      for (const guess of FIELD_GUESSES) {
        if (guess.test(placeholderNorm)) {
          matched = guess;
          break;
        }
      }
    }

    if (matched) {
      tipo = matched.canonical;
      // Se for campo numérico, conte apenas dígitos se já estiver preenchido, senão use padrão
      if (matched.onlyDigits && digitavel.characters && digitavel.characters !== placeholder) {
        const digits = countDigits(digitavel.characters);
        count = digits > 0 ? digits : matched.count;
      } else {
        count = matched.count;
      }
    } else if (digitavel.characters && digitavel.characters !== placeholder) {
      // Se já está preenchido e não é placeholder, usa o tamanho do preenchido
      count = digitavel.characters.length;
      tipo = labelRaw || input.container.name || 'Campo';
    } else {
      // Último recurso: usa valor padrão
      tipo = labelRaw || input.container.name || 'Campo';
    }

    // Ajuste: use o label para o relatório, se existir
    let reportLabel = labelRaw || tipo || input.container.name || 'Campo';

    fields.push({
      label: tipo,
      count: count,
      containerName: reportLabel
    });
  }
  return fields;
}

function buildReadingBreakdown(frame, excludeSet) {
  // Exemplo básico: retorna um objeto vazio ou implemente sua lógica
  return { items: [], total: 0 };
}

function isInputComponent(node) {
  if (!node || !node.name) return false;
  // Só considere containers
  const validTypes = ['FRAME', 'COMPONENT', 'INSTANCE', 'GROUP', 'SECTION'];
  if (!validTypes.includes(node.type)) return false;
  // Nome deve bater com padrão
  let matchesPattern = false;
  for (const pattern of INPUT_NAME_PATTERNS) {
    if (pattern.test(node.name)) {
      matchesPattern = true;
      break;
    }
  }
  if (!matchesPattern) return false;
  // Deve ter pelo menos um filho de texto
  if (!canFindAll(node)) return false;
  const hasTextChild = (node.findAll(n => n.type === 'TEXT') || []).length > 0;
  return hasTextChild;
}

function isLabelNode(node) {
  if (!node || !node.name) return false;
  for (const pattern of LABEL_NAME_PATTERNS) {
    if (pattern.test(node.name)) return true;
  }
  return false;
}

function isHintNode(node) {
  if (!node || !node.name) return false;
  for (const pattern of HINT_NAME_PATTERNS) {
    if (pattern.test(node.name)) return true;
  }
  return false;
}