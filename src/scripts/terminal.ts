// ── Color helpers ─────────────────────────────────────────────────────────────
import { BANNER } from './banner-art';
import { formatCommand, onInstallTabChange } from './install-runner';

const C = {
  z4: 'color:#a1a1aa',
  z5: 'color:#71717a',
  z6: 'color:#52525b',
  z7: 'color:#3f3f46',
  te: 'color:#2dd4bf',
  t3: 'color:#5eead4',
  bl: 'color:#3b82f6',
  or: 'color:#fb923c',
  em: 'color:#34d399',
  wh: 'color:#f4f4f5',
  whb: 'color:#f4f4f5;font-weight:bold',
  gn: 'color:#22c55e',
  sky: 'color:#38bdf8',
  yl: 'color:#eab308',
  mg: 'color:#e879f9',
} as const;

function s(style: string, text: string) {
  return `<span style="${style}">${text}</span>`;
}

// ── Run command follows the active install tab ──────────────────────────────
function getRunCommand(): string {
  // cargo installs first; running the tool is just `skillindex`
  return formatCommand('skillindex');
}

let restartRequested = false;

/** Restart the loop so the animation picks up the newly selected tab command. */
export function requestTerminalRestart(): void {
  restartRequested = true;
}

function printAsciiWithAnimation(ascii: string[], id: string) {
  const REVEAL_WIDTH = 5;
  const SPEED = 2.5;
  const FRAME_DELAY_MS = 28;
  function brandRgb(progress: number): [number, number, number] {
    const p = Math.max(0, Math.min(1, progress));
    const r = Math.round(56 + p * (251 - 56));
    const g = Math.round(189 + p * (146 - 189));
    const b = Math.round(248 + p * (60 - 248));
    return [r, g, b];
  }
  const logo = document.getElementById(id);
  if (!logo) return;
  const cols = Math.max(...ascii.map((l) => l.length));
  const rows = ascii.length;
  const grid: HTMLSpanElement[][] = [];
  for (const line of ascii) {
    const row: HTMLSpanElement[] = [];
    const lineEl = document.createElement('div');
    lineEl.style.height = '1lh';
    lineEl.style.lineHeight = '1';
    for (let c = 0; c < cols; c++) {
      const ch = line[c] ?? ' ';
      const span = document.createElement('span');
      span.textContent = ch;
      span.style.color = 'rgb(0,0,0)'; // sombra, no revelado — igual que Rust
      lineEl.appendChild(span);
      row.push(span);
    }
    logo.appendChild(lineEl);
    grid.push(row);
  }
  const maxDistance = cols + (rows - 1) * 2;
  const totalFrames = Math.ceil((maxDistance + REVEAL_WIDTH) / SPEED);
  let frame = 0;
  function tick() {
    const waveFront = frame * SPEED;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const ch = ascii[r][c];
        if (!ch || ch === ' ') continue;
        const distance = c + r * 2;
        const delta = waveFront - distance;
        const hueProgress = distance / maxDistance;
        const [br, bg, bb] = brandRgb(hueProgress);
        let rr: number, gg: number, bb2: number;
        if (delta <= 0) {
          // todavía no llegó la ola: negro puro
          rr = 0;
          gg = 0;
          bb2 = 0;
        } else if (delta >= REVEAL_WIDTH) {
          // la ola ya asentó: color de marca pleno
          rr = br;
          gg = bg;
          bb2 = bb;
        } else {
          // en tránsito: interpolación directa negro -> color de marca
          const t = delta / REVEAL_WIDTH;
          rr = Math.round(t * br);
          gg = Math.round(t * bg);
          bb2 = Math.round(t * bb);
        }
        grid[r][c].style.color = `rgb(${rr},${gg},${bb2})`;
      }
    }
    frame++;
    if (frame <= totalFrames) {
      setTimeout(tick, FRAME_DELAY_MS);
    }
  }
  tick();
}

// ── Step definitions ───────────────────────────────────────────────────────────
// Mirrors the real CLI output (see SkillIndex src/display, src/prompt, src/ui):
// banner + subtitle, 3-col ✔ grid, ⚡ combos, grouped multi-select,
// single spinner line, green summary. No per-skill install lines exist.
type InstantStep = { html: string; delay: number };
type CharStep = { type: 'char'; text: string; charDelay: number; delay: number };
type BlockStep = { type: 'block'; id: string; lines: string[]; delay: number };
type ClearStep = { type: 'clear'; id: string; delay: number };
type SpinStep = { type: 'spin'; frames: number; frameDelay: number; delay: number };
type Step = InstantStep | CharStep | BlockStep | ClearStep | SpinStep;

const TECH_NAMES = ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Supabase', 'Prisma'];
const TECH_COL_WIDTH = Math.max(...TECH_NAMES.map((n) => n.length)) + 3;

const SKILL_LIST = [
  { skill: 'vercel-react-best-practices', source: 'React' },
  { skill: 'vercel-composition-patterns', source: 'React' },
  { skill: 'next-best-practices', source: 'Next.js' },
  { skill: 'next-cache-components', source: 'Next.js' },
  { skill: 'next-upgrade', source: 'Next.js' },
  { skill: 'prisma-database-setup', source: 'Prisma' },
  { skill: 'tailwind-css-patterns', source: 'Tailwind CSS' },
  { skill: 'typescript-advanced-types', source: 'TypeScript' },
  { skill: 'react-hook-form-zod', source: 'React Hook Form + Zod' },
  { skill: 'supabase-postgres-best-practices', source: 'Supabase' },
  { skill: 'frontend-design', source: 'Frontend' },
];

interface SkillGroup {
  name: string;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = (() => {
  const out: SkillGroup[] = [];
  for (const sk of SKILL_LIST) {
    const g = out.find((x) => x.name === sk.source);
    if (g) g.skills.push(sk.skill);
    else out.push({ name: sk.source, skills: [sk.skill] });
  }
  return out;
})();

const SPIN_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

function head(glyphStyle: string, glyph: string, title: string, suffix = ''): string {
  return '   ' + s(glyphStyle, glyph) + ' ' + s(C.whb, title) + suffix;
}

function techGrid(): string[] {
  const rows: string[] = [];
  for (let i = 0; i < TECH_NAMES.length; i += 3) {
    rows.push(
      '     ' +
        TECH_NAMES.slice(i, i + 3)
          .map((n) => s(C.gn, '✔ ') + s(C.wh, n.padEnd(TECH_COL_WIDTH)))
          .join(''),
    );
  }
  return rows;
}

function selectRow(cursor: boolean, kind: 'group' | 'item', text: string): string {
  const pointer = cursor ? s(C.sky, '❯') : ' ';
  if (kind === 'group') {
    return '   ' + pointer + ' ' + s(C.gn, '◼') + ' ' + s(C.yl + ';font-weight:bold', text);
  }
  return '       ' + pointer + ' ' + s(C.gn, '◼') + ' ' + s(C.sky + ';font-weight:bold', text);
}

function selectHint(): string {
  const kb = (t: string) => s(C.whb, `[${t}]`);
  return (
    '   ' +
    kb('↑↓') +
    s(C.z5, ' mover · ') +
    kb('espacio') +
    s(C.z5, ' alternar item/grupo · ') +
    kb('a') +
    s(C.z5, ' todas · ') +
    kb('enter') +
    s(C.z5, ` confirmar (${SKILL_LIST.length}/${SKILL_LIST.length})`)
  );
}

function selectHtml(cursor: number): string[] {
  const lines: string[] = [];
  let r = 0;
  for (const g of SKILL_GROUPS) {
    lines.push(selectRow(r++ === cursor, 'group', g.name));
    for (const sk of g.skills) lines.push(selectRow(r++ === cursor, 'item', sk));
  }
  lines.push(selectHint());
  return lines;
}

function buildSteps(cmd: string, version: string): Step[] {
  const steps: Step[] = [];
  const d = (delay: number, html: string) => steps.push({ html, delay });
  steps.push({ type: 'char', text: `$ ${cmd}`, charDelay: 55, delay: 500 });
  d(400, '');
  d(30, '__BANNER__');
  d(
    400,
    // Shortened for the narrow demo panel; the real CLI appends
    // `· Desarrollado por Gabriel Ortega` after the version.
    '   ' + s(C.z5, `Instala las mejores skills de IA para tu proyecto · v${version}`),
  );
  d(200, '');
  d(300, head(C.sky, '◆', 'Tecnologías detectadas:'));
  d(200, '');
  for (const row of techGrid()) d(250, row);
  d(300, '');
  d(300, head(C.mg, '◆', 'Combinaciones detectadas:'));
  d(250, s(C.mg, '     ⚡ Next.js + Supabase'));
  d(300, '');
  d(300, head(C.sky, '◆', 'Selecciona las skills a instalar', ' ' + s(C.z5, `(${SKILL_LIST.length} encontradas)`)));
  d(200, '');
  steps.push({ type: 'block', id: 'select-block', lines: selectHtml(0), delay: 800 });
  steps.push({ type: 'block', id: 'select-block', lines: selectHtml(1), delay: 600 });
  steps.push({ type: 'block', id: 'select-block', lines: selectHtml(3), delay: 700 });
  steps.push({ type: 'clear', id: 'select-block', delay: 400 });
  d(0, head(C.sky, '◆', 'Instalando skills...'));
  d(0, s(C.z5, '   Agentes: cursor'));
  d(200, '');
  steps.push({ type: 'spin', frames: 6, frameDelay: 120, delay: 200 });
  d(400, '');
  d(0, s(C.gn + ';font-weight:bold', `   ✔ ¡Listo! ${SKILL_LIST.length} skills instaladas en 3.2s.`));
  d(0, '');
  return steps;
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

async function runAnimation() {
  const body = document.getElementById('term-body')!;
  body.innerHTML = '';
  const version = document.getElementById('terminal')?.dataset.version ?? '';
  for (const step of buildSteps(getRunCommand(), version)) {
    if (restartRequested) return;
    if ('type' in step && step.type === 'char') {
      const line = document.createElement('p');
      body.appendChild(line);
      const cursor = '<span class="animate-pulse" style="' + C.z4 + '">▋</span>';
      for (let i = 0; i < step.text.length; i++) {
        const sofar = step.text.slice(0, i + 1);
        const colored = sofar.startsWith('$ ')
          ? '<span style="' + C.z6 + '">$ </span><span style="' + C.z4 + '">' + sofar.slice(2) + '</span>'
          : sofar;
        line.innerHTML = colored + cursor;
        await sleep(step.charDelay);
      }
      line.innerHTML =
        '<span style="' + C.z6 + '">$ </span><span style="' + C.z4 + '">' + step.text.slice(2) + '</span>';
      await sleep(step.delay);
      continue;
    }
    if ('type' in step && step.type === 'block') {
      let block = document.getElementById(step.id);
      if (!block) {
        block = document.createElement('div');
        block.id = step.id;
        body.appendChild(block);
      }
      block.innerHTML = '';
      for (const html of step.lines) {
        const line = document.createElement('p');
        line.innerHTML = html || '&nbsp;';
        block.appendChild(line);
      }
      body.scrollTop = body.scrollHeight;
      await sleep(step.delay);
      continue;
    }
    if ('type' in step && step.type === 'clear') {
      document.getElementById(step.id)?.remove();
      await sleep(step.delay);
      continue;
    }
    if ('type' in step && step.type === 'spin') {
      const line = document.createElement('p');
      body.appendChild(line);
      for (let f = 0; f < step.frames; f++) {
        if (restartRequested) return;
        line.innerHTML = s(C.z4, `   ${SPIN_FRAMES[f % SPIN_FRAMES.length]} Instalando skills...`);
        await sleep(step.frameDelay);
      }
      line.remove();
      await sleep(step.delay);
      continue;
    }
    const { html, delay } = step as InstantStep;
    if (html === '__BANNER__') {
      const pre = document.createElement('pre');
      pre.id = 'term-ascii';
      pre.style.margin = '0';
      pre.style.lineHeight = '1.15';
      pre.style.fontSize = '0.72em';
      body.appendChild(pre);
      printAsciiWithAnimation(BANNER, 'term-ascii');
      await sleep(delay);
      continue;
    }
    const line = document.createElement('p');
    line.innerHTML = html || '&nbsp;';
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
    if (delay > 0) await sleep(delay);
  }
}

async function loop() {
  while (true) {
    restartRequested = false;
    await runAnimation();
    await sleep(4000);
  }
}

export function initTerminal() {
  onInstallTabChange(() => {
    requestTerminalRestart();
  });
  const terminal = document.getElementById('terminal');
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  if (isDesktop) {
    loop();
    return;
  }
  if (!terminal) return;
  let running = false;
  const observer = new IntersectionObserver(
    async (entries) => {
      if (entries[0].isIntersecting && !running) {
        running = true;
        observer.disconnect();
        loop();
      }
    },
    { threshold: 0.3 },
  );
  observer.observe(terminal);
}
