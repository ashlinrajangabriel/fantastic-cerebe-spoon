# Day-to-day workflow

## Path A — hosted review only (most teams)

1. Create a branch, commit, push.
2. Open a **pull request** to `main`.
3. Wait for checks:
   - **`cerebe/critic`** — AI review (GitHub App)
   - **`CI`** — tests + `cerebe doctor` (this repo)
4. Open **`cerebe/critic`** on GitHub or [factory.cerebe.ai](https://factory.cerebe.ai).
5. For each finding you accept: fix in a **new commit**, push, PR updates → Cerebe re-runs.
6. Disagree? Comment on the PR with file/line evidence; do not ignore required blockers silently.

**CLI (after `cerebe login`):**

```bash
cerebe review-status --pr 42
cerebe review-status --pr 42 --json
```

## Path B — local review (power users)

With at least one critic enabled (`cerebe model add …`):

```bash
git commit -m "feat: …"     # post-commit starts review in background
cerebe watch                # live progress (Ctrl+C when done)
cerebe status --commit HEAD
cerebe show --commit HEAD

git push                    # pre-push gate; may block on blocker/high
```

## Fix loop with your coding agent

1. Copy failing `cerebe/critic` summary **or** run `cerebe review-status --pr <n>`.
2. Prompt your agent: *“Address these Cerebe findings; follow AGENTS.md; new commit only, no amend.”*
3. Run the same commands listed in **AGENTS.md** (for this repo: `npm test`).
4. Commit, push, confirm checks are green.

## Merge

- **Squash merge** and **merge commit** both work; Cerebe reviews each new PR head commit.
- Merging to `main` does not automatically deploy anywhere unless **you** wired deploy workflows separately.

## What not to do

| Anti-pattern | Why |
|--------------|-----|
| `git commit --amend` after Cerebe reviewed a SHA | Verdict detaches from amended commit |
| Push huge batches to one PR | Hosted cap ~**16 MB** changed-file bytes — see [11-large-prs-and-waves.md](./11-large-prs-and-waves.md) |
| Direct push to `main` expecting Cerebe | No PR → no hosted review |
