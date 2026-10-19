# Large pull requests and wave strategy

Hosted Cerebe rejects oversized PRs when **changed file bytes** exceed roughly **16 MB** (`cap=16000000` in check output).

## Symptoms

- `cerebe/critic` fails immediately with a byte cap message
- PR touches hundreds of files or huge generated assets

## Strategy: wave PRs

Instead of one mega-PR:

1. Plan **ordered slices** (feature A, then B, then locales/assets).
2. Each slice: branch from **`main`**, small diff, own PR.
3. Merge each wave after **`cerebe/critic`** (+ CI) green.
4. Prefer **squash merge** per wave if you want linear history on `main`.

### Worktrees (optional)

Keep `main` clean while cutting waves:

```bash
git fetch origin
git worktree add ../wave-02 -B sync/wave-02 origin/main
cd ../wave-02
git cherry-pick <commit>...
git push -u origin sync/wave-02
gh pr create --base main --head sync/wave-02 --title "sync(wave-02): …"
```

### Fix loop per wave

1. Open PR → wait for **`cerebe/critic`** and CI.
2. Fix on **wave branch** only — new commits, no amend.
3. `cerebe review-status --pr N` before merge.
4. Squash merge → fetch → next wave from updated `origin/main`.

## Content splitting tips

| Risk | Mitigation |
|------|------------|
| Huge i18n / locale dumps | Ship English + code first; locale batches in follow-up PRs |
| Generated binaries | Avoid in PR; use release artifacts or LFS with team policy |
| Long-lived branch vs `main` | Rebase or cherry-pick onto fresh `main` before opening PR |

## Local `main` far ahead of `origin/main`

`git rev-list --count origin/main..main` may stay high after squash merges until you reset local `main` to `origin/main`. That is expected — use wave lists / planner scripts in your own repo if you maintain them.

## Merge gate checklist (each wave)

- [ ] **`cerebe/critic`** pass (or documented admin exception)
- [ ] CI pass
- [ ] No amend-after-review on commits Cerebe already saw
