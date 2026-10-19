# Bypass, triage, and when *not* to bypass

Cerebe records bypasses in an audit trail (`cerebe stats`). Use bypasses for **documented exceptions**, not to hide real regressions.

## Local pre-push bypass

When the **local** pre-push gate blocks and you have a **legitimate** reason (emergency hotfix, false positive you will track):

```bash
CEREBE_BYPASS="short reason everyone can audit" git push
```

Rules:

- Reason string is **required** and stored.
- Never bypass **`blocker`/`high`** you introduced in the same change without a follow-up issue/PR.
- Hosted **`cerebe/critic`** on GitHub is **not** bypassed this way — fix findings or adjust branch protection / get human approval per team policy.

## Base-branch gate failures (`cerebe verify` triage)

When a **verification route** or shell gate fails on push but might be **pre-existing on `main`**:

```bash
cerebe verify --triage-base origin/main --route <route-id>
# or
cerebe verify --triage-base origin/main --gate "npm test"
```

| Verdict | Action |
|---------|--------|
| `in-diff` or `inconclusive` | **Your PR** — fix it |
| `pre-existing` | Do not block the feature on unrelated debt; file an issue and cite it |

If push gate blocks **only** because of a pre-existing failure:

```bash
CEREBE_BYPASS="npm test fails at origin/main; tracked at #123" git push
```

**Never** bypass a failure your change caused.

## Evidence routes

If the repo defines verification routes:

- Run `cerebe verify` before push when routes trigger.
- Re-run after every new commit (evidence binds to SHA).
- **Never** hand-edit evidence files under `cerebe/`.

See [12-verification-routes.md](./12-verification-routes.md).

## GitHub merge when check is required

There is **no** supported `CEREBE_BYPASS` for the hosted check. Options:

1. Fix findings → push → green **`cerebe/critic`**
2. Temporarily remove required check (admin, documented)
3. Platform / support path for infra errors (see security docs)

## Review convergence

If findings keep changing kind in the same area after three rounds, **restructure** the change (split PR, simplify) instead of bypassing.

From `AGENTS.md`:

- Budget **three** review rounds by default.
- Lower severity or “same finding, different file” is not always progress.
