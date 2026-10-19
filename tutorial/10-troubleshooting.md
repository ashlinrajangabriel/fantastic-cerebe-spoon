# Troubleshooting

## GitHub App vs dashboard

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| App “Installed” but factory.cerebe.ai empty | Logged into Factory with **different GitHub user** than install owner | Sign out; sign in as install owner; use “link existing install” if offered |
| No `cerebe/critic` on PR | App not installed or repo not selected | [Install App](https://github.com/apps/cerebe-factory/installations/new); reopen PR |
| Dashboard empty but check runs | Dashboard is analytics-only | Trust PR Checks tab |

**PR review can work without dashboard UI.** If **`cerebe/critic`** appears, the App is working.

## Size limits

| Symptom | Cause | Fix |
|---------|-------|-----|
| `changedFileBytes=… cap=16000000` | PR diff too large | Split PR; rebase/cherry-pick; see [11-large-prs-and-waves.md](./11-large-prs-and-waves.md) |

## Local CLI

| Symptom | Fix |
|---------|-----|
| `cerebe` not found (Windows) | Use release zips + PATH; see [install docs](https://cerebe.ai/docs/factory/install) |
| Push never blocked | No critics — `cerebe model add cursor` |
| Push blocked, “no verdict” | Review still running — `cerebe watch` |
| Weird state after amend | New commit; never amend reviewed SHAs |
| Pushed to `main`, no Cerebe | No PR — use branch + PR workflow |
| `cerebe doctor` fails | Read error; fix AGENTS digest / yaml / config |

## CI

| Symptom | Fix |
|---------|-----|
| `cerebe doctor` red on PR | Reproduce locally; fix contract files |
| Tests pass locally, fail in CI | Node version, lockfile, env vars |

## Hosted check stuck

1. Re-run check on GitHub PR UI
2. Push empty commit or doc fix to retrigger
3. See [Cerebe security / retries](https://cerebe.ai/security)

## Verify anytime

```bash
cerebe doctor
cerebe review-status --pr <N>
gh pr checks <N>
```
