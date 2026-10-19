# GitHub App and requiring `cerebe/critic`

## What the App does

The [Cerebe Factory GitHub App](https://github.com/apps/cerebe-factory/installations/new):

- Subscribes to pull request events on selected repos
- Posts a status check named **`cerebe/critic`**
- Attaches findings to the check / PR (annotations)

It does **not** merge PRs or push commits.

## What YAML does *not* do

You **cannot** replace the App with a GitHub Actions job that “runs Cerebe review” for merge authority. Actions in this starter repo only:

- Run **`cerebe doctor`** (config health)
- Run **`npm test`**

See [08-ci-and-actions.md](./08-ci-and-actions.md).

## Require the check (merge gate)

After you trust the signal:

### Rulesets (recommended)

1. Repository **Settings** → **Rules** → **Rulesets** → edit ruleset for `main`.
2. **Require status checks** → search **`cerebe/critic`**.
3. Publisher should show **Cerebe Factory**.

### Classic branch protection

Same idea under **Branches** → protection rule for `main` → **Require status checks**.

### If the check is missing from search

1. Open or update a PR (any branch).
2. Wait until **`cerebe/critic`** appears on the Checks tab.
3. Retry adding the required check.

## Merge types

| Merge button | Cerebe behavior |
|--------------|-----------------|
| Squash merge | New commit on `main`; next PR diff is from new work only |
| Merge commit | Preserves branch commits on `main` |
| Rebase merge | Rewritten SHAs on `main` |

All are fine if **`cerebe/critic`** is green on the **PR head** you merge.

## Platform plans

Requiring **`cerebe/critic`** to **block** merge on private repos typically needs a Cerebe Platform plan. The check may still **run** and report without blocking — depends on billing and settings.

## Infra outages

Teams sometimes configure `gate.on_infra_error: pass` in `cerebe.yaml` for base-branch policy during outages — see [Cerebe security](https://cerebe.ai/security). Use rarely and document in an issue.
