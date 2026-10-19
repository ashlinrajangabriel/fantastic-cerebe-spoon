# CI and GitHub Actions

## Split responsibilities

| Layer | Mechanism | What it validates |
|-------|-----------|-------------------|
| **Hosted AI review** | Cerebe Factory **GitHub App** | PR diff + `AGENTS.md` → check **`cerebe/critic`** |
| **Contract CI** | `.github/workflows/ci.yaml` job **`cerebe doctor`** | Valid `cerebe.yaml`, fleet config, AGENTS digest |
| **Product CI** | Same workflow job **`npm test`** | Your tests |

**You do not add a workflow step to “call Cerebe review” for merge authority.** Install the App instead.

## This repo’s workflow

File: [`.github/workflows/ci.yaml`](../.github/workflows/ci.yaml)

```yaml
# Pattern (abbreviated)
- uses: cerebe-ai/cerebe/setup@v9.8.0
- run: cerebe init
- run: cerebe doctor
```

Notes from Cerebe docs:

- `cerebe-ai/cerebe/setup` installs **binaries only** on the runner.
- `CI=true` and ephemeral runners skip persisting repo-local runtime junk.
- Pin setup action version to match CLI you use locally (`CEREBE_VERSION` on install script).

## When `cerebe doctor` runs

This starter runs **`cerebe doctor` on every PR and push to `main`**.

Larger repos often **path-filter** to contract files only:

```yaml
on:
  pull_request:
    paths:
      - 'cerebe.yaml'
      - 'cerebe/**'
      - 'AGENTS.md'
      - 'CLAUDE.md'
      - '.github/workflows/ci.yaml'
```

## Running a local critic in CI (usually skip)

Factory docs emphasize:

- **Hosted** review = GitHub App (authoritative for merge).
- **Local** critics = developer machine with vendor CLIs (Cursor, Claude, …).

Running `cerebe model add cursor` on a GitHub-hosted runner is **not** the default pattern — runners lack your Cursor subscription and IDE session. If you experiment:

- You need the vendor CLI on the runner (often impractical).
- Secrets must not hold personal AI API keys in the repo.

Prefer **`cerebe doctor` + App** for CI.

## Require both checks on `main`

In branch rules, require:

- **`cerebe/critic`** (App)
- **`CI`** or job names like **`cerebe doctor`**, **`npm test`** (Actions)

Job names appear as check contexts like **`CI / cerebe doctor`**.

List what GitHub sees:

```bash
gh pr checks <n>
```

## Doctor failed in CI?

1. Reproduce locally: `cerebe doctor`
2. Common fixes: AGENTS pack digest mismatch, invalid `cerebe.yaml`, missing `cerebe/config.json`
3. Push fix in a **new commit**
