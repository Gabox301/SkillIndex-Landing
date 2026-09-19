import { getRunnerPrefix, onInstallTabChange } from './install-runner';

/**
 * Keeps `--domain` rows in sync with the active install tab:
 * `$ npx skillindex -d …` → `$ bunx skillindex -d …` → `$ skillindex -d …`.
 */
export function initDomainCommands(): void {
  const refresh = () => {
    const prefix = getRunnerPrefix();
    document.querySelectorAll('[data-runner-prefix]').forEach((el) => {
      el.textContent = prefix ? `${prefix} ` : '';
    });
  };
  refresh();
  onInstallTabChange(refresh);
}
