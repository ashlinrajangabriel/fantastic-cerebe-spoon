# GitHub CLI (`gh`) for Cerebe workflows

Install: [cli.github.com](https://cli.github.com/)

Authenticate once:

```bash
gh auth login
```

## Repository & clone

```bash
gh repo clone ashlinrajangabriel/fantastic-cerebe-spoon
gh repo view --web
```

## Branch → PR

```bash
git checkout -b feat/sample-change
git push -u origin HEAD
gh pr create --base main --title "feat: sample change" --body "$(cat <<'EOF'
## Summary
- …

## Test plan
- [ ] npm test
- [ ] cerebe/critic green

EOF
)"
```

## Watch checks on a PR

```bash
gh pr checks 42 --watch
gh pr checks 42
gh pr view 42 --web
```

List check runs (includes **`cerebe/critic`** when App ran):

```bash
gh api repos/{owner}/{repo}/commits/$(git rev-parse HEAD)/check-runs --jq '.check_runs[] | {name, status, conclusion}'
```

Replace `{owner}/{repo}` or use:

```bash
gh api repos/$(gh repo view --json nameWithOwner -q .nameWithOwner)/commits/$(git rev-parse HEAD)/check-runs
```

## PR comments & reviews

```bash
gh pr comment 42 --body "Cerebe finding X: disagree because … (cite file:line)"
gh pr review 42 --comment -b "LGTM after cerebe green"
```

## Merge (after required checks pass)

```bash
gh pr merge 42 --squash --delete-branch
# or
gh pr merge 42 --merge
```

## Issues for pre-existing gate debt

```bash
gh issue create --title "CI: npm test fails on main" --body "Triage: cerebe verify --triage-base origin/main …"
```

## Re-run failed Actions (not Cerebe App)

```bash
gh run list --workflow ci.yaml
gh run rerun <run-id>
```

Re-run **`cerebe/critic`** from the GitHub PR Checks UI (Re-run) when the Platform supports it — not all failures are Actions jobs.

## Status from Cerebe CLI (complement to `gh`)

```bash
cerebe login
cerebe review-status --pr 42
cerebe review-status --pr 42 --json
```

## Useful aliases (optional)

```bash
gh alias set prchecks 'pr checks "$1" --watch'
```
