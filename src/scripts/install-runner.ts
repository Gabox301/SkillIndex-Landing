/**
 * install-runner — single source of truth for the package-manager runner.
 * The active install tab (npm/pnpm/yarn/bun/cargo) drives every displayed
 * command: install buttons, terminal animation and `--domain` rows.
 */

export const RUNNER_PREFIX: Record<string, string> = {
  npm: 'npx',
  pnpm: 'pnpm dlx',
  yarn: 'yarn dlx',
  bun: 'bunx',
  // cargo installs a binary: commands run bare, without runner prefix
  cargo: '',
};

export function getActiveTab(): string {
  return document.querySelector('.install-tab--active')?.getAttribute('data-tab') ?? 'npm';
}

export function getRunnerPrefix(tab: string = getActiveTab()): string {
  return RUNNER_PREFIX[tab] ?? RUNNER_PREFIX.npm;
}

/** Prefix a bare command (`skillindex ...`) with the active runner. */
export function formatCommand(base: string, tab: string = getActiveTab()): string {
  const prefix = getRunnerPrefix(tab);
  return prefix ? `${prefix} ${base}` : base;
}

export type TabListener = (tab: string) => void;

const listeners = new Set<TabListener>();

export function onInstallTabChange(fn: TabListener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function notifyInstallTabChange(tab: string): void {
  listeners.forEach((fn) => fn(tab));
}
