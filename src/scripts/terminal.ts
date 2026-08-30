// ── Color helpers ─────────────────────────────────────────────────────────────
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
  gn: 'color:#22c55e',
} as const;

function s(style: string, text: string) {
  return `<span style="${style}">${text}</span>`;
}

// ── ASCII banner ───────────────────────────────────────────────────────────────
const BANNER = [
  ' ███████╗██╗  ██╗██╗██╗     ██╗     ██╗███╗   ██╗██████╗ ███████╗██╗  ██╗',
  ' ██╔════╝██║ ██╔╝██║██║     ██║     ██║████╗  ██║██╔══██╗██╔════╝╚██╗██╔╝',
  ' ███████╗█████╔╝ ██║██║     ██║     ██║██╔██╗ ██║██║  ██║█████╗   ╚███╔╝ ',
  ' ╚════██║██╔═██╗ ██║██║     ██║     ██║██║╚██╗██║██║  ██║██╔══╝   ██╔██╗ ',
  ' ███████║██║  ██╗██║███████╗███████╗██║██║ ╚████║██████╔╝███████╗██╔╝ ██╗',
  ' ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝',
];

function printAsciiWithAnimation(ascii: string[], id: string) {
  const START_COLOR = [30, 64, 175];
  const END_COLOR = [45, 212, 191];
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
      span.style.color = 'rgb(63,63,70)';
      lineEl.appendChild(span);
      row.push(span);
    }
    logo.appendChild(lineEl);
    grid.push(row);
  }
  const maxDist = cols + rows;
  const SPEED = 0.9;
  let frame = 0;
  const totalFrames = Math.ceil((maxDist + 10) / SPEED);
  function animate() {
    const waveFront = frame * SPEED;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const dist = c + r * 3;
        const progress = Math.max(0, Math.min(1, (waveFront - dist) / 10));
        const mixed = START_COLOR.map((v, i) => Math.round(v + progress * (END_COLOR[i] - v)));
        grid[r][c].style.color = `rgb(${mixed[0]},${mixed[1]},${mixed[2]})`;
      }
    }
    frame++;
    if (frame <= totalFrames) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// ── Step definitions ───────────────────────────────────────────────────────────
type InstantStep = { html: string; delay: number };
type CharStep = { type: 'char'; text: string; charDelay: number; delay: number };
type Step = InstantStep | CharStep;

const TECH_NAMES = ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Supabase', 'Astro'];
const TECH_COL_WIDTH = Math.max(...TECH_NAMES.map((n) => n.length)) + 14;

function dotLeader(label: string, width: number) {
  return '.'.repeat(Math.max(3, width - label.length));
}

const SKILL_LIST = [
  { skill: 'vercel-react-best-practices', source: 'React' },
  { skill: 'vercel-composition-patterns', source: 'React' },
  { skill: 'next-best-practices', source: 'Next.js' },
  { skill: 'next-cache-components', source: 'Next.js' },
  { skill: 'next-upgrade', source: 'Next.js' },
  { skill: 'astro', source: 'Astro' },
  { skill: 'tailwind-css-patterns', source: 'Tailwind CSS' },
  { skill: 'typescript-advanced-types', source: 'TypeScript' },
  { skill: 'react-hook-form-zod', source: 'React Hook Form + Zod' },
  { skill: 'supabase-postgres-best-practices', source: 'Supabase' },
  { skill: 'frontend-design', source: 'Frontend' },
];
const maxSkillLen = Math.max(...SKILL_LIST.map((sk) => sk.skill.length));
const SKILLS = SKILL_LIST.map((sk, i) => {
  const num = String(i + 1).padStart(2, ' ');
  const pad = ' '.repeat(maxSkillLen - sk.skill.length);
  return s(C.z6, `   ${num}.`) + ' ' + s(C.t3, sk.skill) + pad + '  ' + s(C.z7, `← ${sk.source}`);
});

function buildSteps(): Step[] {
  const steps: Step[] = [];
  const d = (delay: number, html: string) => steps.push({ html, delay });
  steps.push({ type: 'char', text: '$ npx skillindex', charDelay: 55, delay: 500 });
  d(400, '');
  d(30, '__BANNER__');
  d(400, '');
  d(300, '   ' + s(C.or, '[ SCAN ] ') + s(C.wh, 'Tecnologías detectadas'));
  d(200, '');
  for (const name of TECH_NAMES) {
    d(0, '__TECHROW__' + name);
    d(220 + Math.random() * 260, '__TECHDONE__' + name);
  }
  d(400, '');
  d(300, s(C.te, '   ▸ ') + s(C.wh, 'Skills por instalar ') + s(C.z6, `(${SKILL_LIST.length})`));
  d(200, '');
  for (const r of SKILLS) d(90, r);
  d(0, '');
  d(
    400,
    '   ¿Instalar ' +
      s(C.wh, String(SKILL_LIST.length)) +
      ' skills? ' +
      s(C.z6, '[S/n]') +
      ' <span id="term-cursor" class="animate-pulse" style="' +
      C.z4 +
      '">▋</span>',
  );
  d(700, '__ANSWER_Y__');
  d(300, '');
  d(0, s(C.bl, '   ▸ ') + s(C.wh, 'Verificando registro curado...'));
  d(200, s(C.gn, '   ✔ ') + s(C.z5, 'manifiesto y hashes cargados'));
  d(200, '');
  d(0, s(C.te, '   ▸ ') + s(C.wh, 'Instalando skills...'));
  d(200, '');
  for (const sk of SKILL_LIST) {
    d(0, '__SPINNER__' + sk.skill);
    d(350 + Math.random() * 450, '__DONE__' + JSON.stringify(sk));
  }
  d(400, '');
  d(0, s(C.gn, `   ✔ ¡Listo! ${SKILL_LIST.length} skills instaladas en 3.2s.`));
  d(0, '');
  return steps;
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

async function runAnimation() {
  const body = document.getElementById('term-body')!;
  body.innerHTML = '';
  for (const step of buildSteps()) {
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
      line.innerHTML = '<span style="' + C.z6 + '">$ </span><span style="' + C.z4 + '">npx skillindex</span>';
      await sleep(step.delay);
      continue;
    }
    const { html, delay } = step as InstantStep;
    if (html === '__ANSWER_Y__') {
      const cursor = document.getElementById('term-cursor');
      if (cursor) cursor.outerHTML = s(C.wh, 'S');
      await sleep(delay);
      continue;
    }
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
    if (html.startsWith('__TECHROW__')) {
      const name = html.replace('__TECHROW__', '');
      const line = document.createElement('p');
      line.id = 'tech-' + name.replace(/[^a-z0-9]/gi, '');
      line.innerHTML =
        '   ' +
        s(C.z7, '▸ ') +
        s(C.z5, name) +
        ' ' +
        s(C.z7, dotLeader(name, TECH_COL_WIDTH)) +
        ' ' +
        s(C.z6, 'bloqueado');
      body.appendChild(line);
      body.scrollTop = body.scrollHeight;
      await sleep(delay);
      continue;
    }
    if (html.startsWith('__TECHDONE__')) {
      const name = html.replace('__TECHDONE__', '');
      const line = document.getElementById('tech-' + name.replace(/[^a-z0-9]/gi, ''));
      if (line) {
        line.innerHTML =
          '   ' +
          s(C.gn, '▸ ') +
          s(C.wh, name) +
          ' ' +
          s(C.z7, dotLeader(name, TECH_COL_WIDTH)) +
          ' ' +
          s(C.gn, '✔ detectado');
        line.removeAttribute('id');
      }
      body.scrollTop = body.scrollHeight;
      await sleep(delay);
      continue;
    }
    if (html.startsWith('__SPINNER__')) {
      const skill = html.replace('__SPINNER__', '');
      const line = document.createElement('p');
      line.id = 'install-line';
      line.innerHTML = s(C.z6, '   ◌ ') + s(C.z5, skill + '...');
      body.appendChild(line);
      body.scrollTop = body.scrollHeight;
      await sleep(delay);
      continue;
    }
    if (html.startsWith('__DONE__')) {
      const inst = JSON.parse(html.replace('__DONE__', ''));
      const line = document.getElementById('install-line');
      if (line) {
        line.innerHTML = s(C.em, '   ✔ ' + inst.skill);
        line.removeAttribute('id');
      }
      body.scrollTop = body.scrollHeight;
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
    await runAnimation();
    await sleep(4000);
  }
}

export function initTerminal() {
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
