# Local critic: Cursor, Composer, and CI

## Terminology

| Name | What it is |
|------|------------|
| **Cursor Composer** | In-IDE agent mode in Cursor (multi-file edits, chat) |
| **`cerebe model add cursor`** | Factory local critic that invokes Cursor’s **agent CLI** on each commit |
| **Hosted `cerebe/critic`** | Independent Platform panel on the PR — always separate from your laptop |

Composer is **not** a separate `cerebe model add composer` id in official docs. The supported id for Cursor is **`cursor`**.

## Enable local review (developer machine)

Prerequisites:

1. [Cerebe CLI installed](./01-one-time-setup.md)
2. Cursor installed
3. Cursor **agent CLI** available on `PATH` (what `cerebe doctor` detects)

```bash
cerebe model add cursor
cerebe doctor
```

Expected hook behavior after a critic is enabled:

```bash
git commit -m "feat: …"   # triggers background review
cerebe watch
git push                  # blocked on open blocker/high findings
```

If `cerebe doctor` reports **`cursor-agent not installed`**:

- Use **hosted PR review only**, or
- Install/configure Cursor’s CLI per Cursor docs, then re-run `cerebe doctor`

## Using Composer day-to-day with Cerebe

Suggested loop:

1. Implement with **Composer** in Cursor.
2. Commit (local critic runs if enabled).
3. `cerebe show --commit HEAD` — fix findings in a **new commit** (Composer again).
4. Push → open PR → **`cerebe/critic`** runs on GitHub.

Prompt template for Composer:

> Address Cerebe findings below. Follow AGENTS.md. New commit only; do not amend the reviewed SHA. Run npm test before commit.

## Other local critics

Same pattern:

```bash
cerebe model add claude
cerebe model add codex
cerebe model add gemini
cerebe model add kimi
```

Each uses **your** subscription via vendor CLI — no repo secrets.

## GitHub Actions + Composer

**Composer runs in the IDE**, not on GitHub runners. CI should:

- Run **`cerebe doctor`** (contract)
- Run **tests**
- Rely on **GitHub App** for AI review on PRs

Do not expect `cerebe model add cursor` on `ubuntu-latest` to mirror your laptop without non-standard runner setup.

## Optional: Cursor Cloud / background agents

If your team uses cloud agents, the merge gate remains **`cerebe/critic`** on the PR. Keep `AGENTS.md` accurate so both local and hosted critics share rules.

## Disable local critic

Remove critics from fleet via CLI (`cerebe model` subcommands — see `cerebe model --help`) or reset `critics` to `[]` in `cerebe/config.json` with team agreement, then `cerebe doctor`.

Empty fleet → pre-push does **not** block for missing verdict.
