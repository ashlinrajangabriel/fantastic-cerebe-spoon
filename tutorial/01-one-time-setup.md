# One-time setup

## Repo admin (once per GitHub repository)

### 1. Install the GitHub App

1. Open [Install Cerebe Factory](https://github.com/apps/cerebe-factory/installations/new).
2. Choose your org or user account.
3. Select **this repository** (or all repos, per policy).
4. Confirm permissions (read code/PRs; write checks — it does **not** push code or merge for you).

Sign in at [factory.cerebe.ai](https://factory.cerebe.ai) with the **same GitHub identity** that owns the installation to see PR analytics.

**Private repos:** Platform hosting often needs a [plan or trial](https://cerebe.ai). The CLI on your machine remains free.

### 2. Commit the Factory contract on `main`

| File | Purpose |
|------|---------|
| `cerebe.yaml` | Team policy (deny dangerous git commands, locked doctrine) |
| `cerebe/config.json` | Local fleet: critics, quorum, blocking severities |
| `AGENTS.md` | Shared rules for agents + critics |
| `CLAUDE.md` | Thin pointer to `AGENTS.md` for Claude Code |
| `.github/workflows/ci.yaml` | Runs `cerebe doctor` (+ your tests) |

This starter repo already includes these files.

### 3. (Later) Require `cerebe/critic` before merge

When the team trusts the signal:

1. GitHub → **Settings** → **Rules** → **Rulesets** (or classic branch protection on `main`).
2. Enable **Require status checks**.
3. Add **`cerebe/critic`** (publisher: **Cerebe Factory**).

If the check does not appear in search, open any PR once so the App posts it, then search again.

---

## Every developer (once per clone)

### Install the CLI

**macOS / Linux** (from repo root):

```bash
curl -fsSL https://cerebe.ai/install.sh | sh
cerebe --version
cerebe doctor
```

**Windows:** the install script stops on Windows. Download **`cerebe_*_windows_amd64.zip`** and **`cyclone_*_windows_amd64.zip`** from [cerebe-ai/cerebe releases](https://github.com/cerebe-ai/cerebe/releases/latest), extract both to a folder on `PATH`, then:

```powershell
cd path\to\fantastic-cerebe-spoon
cerebe install   # first clone without committed cerebe/
# OR
cerebe init      # clone already has cerebe/ committed — wires hooks only
cerebe doctor
```

**Do not install Factory via npm/pip stubs:**

- `npm i @cerebe/cli` → redirect to `install.sh`
- `npm i @cerebe/sdk` / `pip install cerebe` → different product (Cognitive API)

### Optional: link CLI to Platform

```bash
cerebe login    # factory.cerebe.ai — PR status from terminal
```

### Optional: local review before push

Default after install: **0 critics** — hooks exist but **do not block** push.

```bash
cerebe model add cursor    # or: claude, codex, gemini, kimi
cerebe doctor
```

See [09-local-critic-cursor-composer.md](./09-local-critic-cursor-composer.md) for Cursor / Composer specifics.
