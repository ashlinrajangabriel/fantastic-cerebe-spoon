# Verification routes and `cerebe verify`

Some repositories define **verification routes**: commands that must pass when certain paths change. Cerebe binds **evidence** to a specific commit SHA.

This starter repo uses a simple **`npm test`** gate in AGENTS.md and CI. Advanced repos add route definitions via Cerebe tooling — check `cerebe gates` output in your clone.

## Commands

```bash
# Run all routes triggered by the current commit
cerebe verify

# One route
cerebe verify --route <id>

# Triage vs base branch (whose failure is it?)
cerebe verify --triage-base origin/main --route <id>
cerebe verify --triage-base origin/main --gate "npm test"

# List gates without invoking critics
cerebe gates
```

## Workflow before push (when routes exist)

1. Make changes
2. `cerebe verify` (or targeted `--route`)
3. Commit
4. If hooks enabled: local review completes
5. `git push` — pre-push may call `cerebe gate-push`

After **any** new commit, re-run `cerebe verify` — evidence is SHA-bound.

## Triage outcomes

Documented in `AGENTS.md`:

| Result | Meaning |
|--------|---------|
| `in-diff` | Failure introduced in your branch — fix before merge |
| `inconclusive` | Treat as yours — fix or investigate |
| `pre-existing` | Fails on base too — file issue; optional bypass with reason |

Bypass example (pre-existing only):

```bash
CEREBE_BYPASS="npm test fails at origin/main; tracked at #42" git push
```

See [06-bypass-and-triage.md](./06-bypass-and-triage.md).

## Rules

- **Never** hand-edit evidence artifacts under `cerebe/`.
- **Never** bypass failures your diff caused.
- Keep **AGENTS.md** command list aligned with what `cerebe verify` runs.
