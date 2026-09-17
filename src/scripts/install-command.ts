import { requestTerminalRestart } from './terminal';

export function initInstallCommand(): void {
  // Tab switching
  document.querySelectorAll<HTMLButtonElement>('.install-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.install-tab').forEach((t) => {
        t.classList.remove('install-tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.install-panel').forEach((p) => p.classList.add('install-panel--hidden'));
      tab.classList.add('install-tab--active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(`panel-${tab.dataset.tab}`)?.classList.remove('install-panel--hidden');
      requestTerminalRestart();
    });
  });

  // Copy to clipboard
  document.querySelectorAll<HTMLButtonElement>('.hero-cta[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy!;
      await navigator.clipboard.writeText(text);
      const cmdEl = btn.querySelector('.hero-cta-cmd') as HTMLElement;
      const iconEl = btn.querySelector('.hero-cta-copy-icon');
      const feedback = document.getElementById('install-copied')!;
      const original = cmdEl.textContent!;
      cmdEl.textContent = 'copiado';
      iconEl?.classList.add('is-copied');
      feedback.textContent = `"${text}" copiado al portapapeles`;
      setTimeout(() => {
        cmdEl.textContent = original;
        iconEl?.classList.remove('is-copied');
        feedback.textContent = '';
      }, 1800);
    });
  });
}
