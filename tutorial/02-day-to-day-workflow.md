# Day-to-day workflow

End-to-end: branch → PR → checks → fix loop → merge → clean up local. For more `gh` one-liners see [07-github-cli-cheatsheet.md](./07-github-cli-cheatsheet.md).

---

## Path A — hosted review only (most teams)

### 1. Branch and push

```bash
git fetch origin
git checkout main
git pull origin main
git checkout -b feat/my-change

# … edit, commit …
git push -u origin feat/my-change
```

### 2. Open the PR

**GitHub CLI:**

```bash
gh pr create --base main --head feat/my-change --title "feat: …" --body "## Summary
- …

## Test plan
- [ ] npm test
- [ ] cerebe/critic green"
```

**Or** push with `-u` and follow the URL Git prints, or `gh pr create --fill`.

### 3. Watch PR and check status

Each **new push to the PR branch** re-triggers **`cerebe/critic`** and **CI**.

```bash
# Summary: state, checks, review decision
gh pr status

# One PR
gh pr view 42
gh pr view 42 --json state,statusCheckRollup,mergeable,reviewDecision

# Wait until checks finish (Actions + App)
gh pr checks 42 --watch
gh pr checks 42

# Cerebe-specific (after cerebe login)
cerebe review-status --pr 42
cerebe review-status --pr 42 --json
```

Open in browser: `gh pr view 42 --web` — use the **`cerebe/critic`** check details or [factory.cerebe.ai](https://factory.cerebe.ai).

**Ready for human review (optional):**

```bash
gh pr ready 42          # if you opened as draft
gh pr review 42 --comment -b "Cerebe + CI green, ready for look"
```

### 4. Fix findings

For each finding you accept: fix in a **new commit** on the **same branch**, push — do **not** amend a SHA Cerebe already reviewed.

```bash
git add -A
git commit -m "fix: address cerebe finding on …"
git push
gh pr checks 42 --watch
cerebe review-status --pr 42
```

Disagree? `gh pr comment 42 --body "…"` with file/line evidence; do not ignore required blockers silently.

### 5. Keep the PR branch current with `main`

While the PR is open, `main` may move. Update your branch so CI and the diff stay honest.

**Rebase (linear history on the branch):**

```bash
git fetch origin
git checkout feat/my-change
git rebase origin/main
# resolve conflicts, then:
git rebase --continue
git push --force-with-lease
```

Rebase rewrites commits → **force-with-lease** is required. After a rebase, Cerebe reviews the **new PR head** — that is expected.

**Merge `main` into the branch (no rewrite):**

```bash
git fetch origin
git checkout feat/my-change
git merge origin/main
git push
```

**GitHub UI:** “Update branch” on the PR (merge commit from `main` into your branch).

---

## Path B — local review (power users)

With at least one critic enabled (`cerebe model add …`):

```bash
git commit -m "feat: …"     # post-commit starts review in background
cerebe watch                # live progress (Ctrl+C when done)
cerebe status --commit HEAD
cerebe show --commit HEAD

git push                    # pre-push gate; may block on blocker/high
```

Then open the PR (Path A steps 2–3). Hosted **`cerebe/critic`** still runs independently.

---

## Fix loop with your coding agent

1. Copy failing `cerebe/critic` summary **or** run `cerebe review-status --pr <n>`.
2. Prompt your agent: *“Address these Cerebe findings; follow AGENTS.md; new commit only, no amend.”*
3. Run the same commands listed in **AGENTS.md** (for this repo: `npm test`).
4. Commit, push, `gh pr checks <n> --watch`, confirm **`cerebe/critic`** and **CI** are green.

---

## Merge (after required checks pass)

Confirm mergeability:

```bash
gh pr view 42 --json mergeable,mergeStateStatus,statusCheckRollup
cerebe review-status --pr 42
```

| Strategy | When | Command |
|----------|------|---------|
| **Squash** | One commit on `main` per PR (common) | `gh pr merge 42 --squash --delete-branch` |
| **Merge commit** | Preserve all branch commits on `main` | `gh pr merge 42 --merge --delete-branch` |
| **Rebase merge** | Linear `main` without a merge commit | `gh pr merge 42 --rebase --delete-branch` |

`--delete-branch` removes the **remote** branch on GitHub. Cerebe has already reviewed the **PR head**; any merge strategy is fine if checks were green on that head.

**Merge from the web:** Squash and merge / Create a merge commit / Rebase and merge — same rules.

Merging to `main` does not deploy anywhere unless you added a deploy workflow separately.

---

## After merge — sync your machine

```bash
# Remote branch gone after --delete-branch; refresh refs
git fetch origin --prune

git checkout main
git pull origin main

# Delete local feature branch
git branch -d feat/my-change
# if Git complains it is not fully merged (e.g. squash on GitHub):
git branch -D feat/my-change
```

Confirm the PR is closed:

```bash
gh pr view 42 --json state,mergedAt,mergedBy
```

Start the next change from updated `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/next-thing
```

---

## What not to do

| Anti-pattern | Why |
|--------------|-----|
| `git commit --amend` after Cerebe reviewed a SHA | Verdict detaches from amended commit; use a **new commit** instead |
| Rebase then forget to push | PR head stale; use `git push --force-with-lease` |
| Push huge batches to one PR | Hosted cap ~**16 MB** changed-file bytes — see [11-large-prs-and-waves.md](./11-large-prs-and-waves.md) |
| Direct push to `main` expecting Cerebe | No PR → no hosted **`cerebe/critic`** |
| Merge with red **`cerebe/critic`** while check is required | Branch protection blocks merge; fix or documented admin exception |

---

## Quick reference (copy-paste)

```bash
# Open + watch
gh pr create --base main --fill
gh pr checks --watch

# Status
gh pr status
cerebe review-status --pr <n>

# Update from main (pick one)
git fetch origin && git rebase origin/main && git push --force-with-lease
git fetch origin && git merge origin/main && git push

# Merge + cleanup
gh pr merge <n> --squash --delete-branch
git fetch origin --prune && git checkout main && git pull && git branch -d feat/my-change
```
