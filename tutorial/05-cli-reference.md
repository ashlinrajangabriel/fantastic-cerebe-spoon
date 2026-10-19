# CLI reference (cheat sheet)

Install: [cerebe.ai/docs/factory/install](https://cerebe.ai/docs/factory/install)

## Setup & health

| Command | Purpose |
|---------|---------|
| `cerebe --version` | CLI version |
| `cerebe install` | Adopt repo (writes contract + hooks) |
| `cerebe init` | Wire hooks when `cerebe/` already committed |
| `cerebe doctor` | Hooks, config, AGENTS.md digest health |
| `cerebe login` | Link workstation to factory.cerebe.ai |

## Local review loop

| Command | Purpose |
|---------|---------|
| `cerebe model add cursor` | Enable local critic (see [09](./09-local-critic-cursor-composer.md)) |
| `cerebe model list` | Show configured critics |
| `cerebe review` | Run review on HEAD now |
| `cerebe watch` | Live “factory floor” for current branch |
| `cerebe status --commit HEAD` | Short verdict |
| `cerebe show --commit HEAD` | Full findings artifact |
| `cerebe findings --range origin/main..HEAD` | Findings on branch (no re-gate) |
| `cerebe gate-push` | Same as pre-push hook (manual test) |

## Hosted / PR

| Command | Purpose |
|---------|---------|
| `cerebe review-status --pr <n>` | PR verdict as text |
| `cerebe review-status --pr <n> --json` | Machine-readable PR status |

## Verification & gates

| Command | Purpose |
|---------|---------|
| `cerebe verify` | Run triggered verification routes for current commit |
| `cerebe verify --route <id>` | Single route |
| `cerebe verify --triage-base <ref> --gate "<cmd>"` | Base vs HEAD triage for one gate |
| `cerebe verify --triage-base <ref> --route <id>` | Base vs HEAD triage for route |
| `cerebe gates` | Quality gates + routes without model call |

## Audit

| Command | Purpose |
|---------|---------|
| `cerebe stats` | Audit trail including bypasses |

## Pin CLI version (install script)

```bash
curl -fsSL https://cerebe.ai/install.sh | CEREBE_VERSION=9.8.0 sh
```

Match `cerebe-ai/cerebe/setup@v9.8.0` in CI when pinning.

## Supported local critic vendors

Documented IDs for `cerebe model add`:

- `cursor`
- `claude`
- `codex`
- `gemini`
- `kimi`

Each uses the vendor CLI you already run — **no API keys in the repo**.
