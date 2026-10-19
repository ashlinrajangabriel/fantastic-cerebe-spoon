# Findings playbook (generic)

How to treat Cerebe findings without turning review into endless whack-a-mole.

## For each finding

1. **Read evidence** — file, line, quoted diff.
2. **Reproduce** — does the issue exist on the PR head?
3. **Decide**
   - **Fix** — new commit
   - **Push back** — comment on PR with code citation; finding may be wrong context
   - **Track** — issue + defer if severity allows and check is not required

## Severity guide

| Severity | Typical response |
|----------|------------------|
| `blocker` | Must fix or block merge (if check required) |
| `high` | Fix unless demonstrably false positive with evidence |
| Medium / low | Fix if cheap; batch tech-debt issues if advisory |

Hosted Platform may require **corroboration** (multiple critics agree) for some blockers — treat dissent seriously.

## Convergence (three rounds)

After each Cerebe run:

- Count **new kinds** of findings in the same subsystem
- If kinds keep multiplying, **split or simplify** the PR instead of one-line patches

## Production posture findings

If critics assume unsafe production defaults but your diff does not enable them:

1. Add or point to a **committed** posture doc (table in `AGENTS.md` is ideal).
2. Reply on PR linking paths — do not rely on oral tradition.

## Tracker (team optional)

Maintain a committed markdown tracker:

| Column | Example |
|--------|---------|
| ID | SEC-01 |
| Theme | Auth bypass in admin route |
| Status | Fixed / Open / Accepted |
| PR | #12 |
| Verification | test name or manual step |

This starter does not include a live tracker — copy the pattern when findings volume grows.

## Product feedback

When Cerebe helps or hurts process, capture anonymized notes for the vendor (no secrets):

- What finding saved a bug
- What finding was noise and why
- Cap / latency / false positive patterns

Official channel: [cerebe.ai](https://cerebe.ai) support / your account team.
