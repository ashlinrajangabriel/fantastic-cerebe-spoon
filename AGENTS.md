# Agent contract

This file is the shared contract every coding agent reads (Claude Code, Cursor, Codex, Gemini, OpenCode). Put repo-specific rules here: what this repo is, exact commands, and constraints that are not obvious from the code.

Do not put Claude-only settings here. Those belong in CLAUDE.md, which imports this file.

## This repo

Starter template for Cerebe Factory. Purpose: learn hosted PR review (`cerebe/critic`) and optional local pre-push review.

Commands that should stay green before merge (also run in GitHub Actions **`CI`**):

- `npm ci` (repo root)
- `npm test`

Never commit `.env`, keys, or live credentials. Keep diffs minimal.

Pull-request AI review is the hosted **`cerebe/critic`** check (Cerebe Factory GitHub App), not a workflow in this repo. Fix blocking findings in **new commits** (do not amend commits that already have a Cerebe verdict).

## Production posture (example)

When critics ask about deployment or security, point them at **committed** sources of truth in this repo (for example `docs/DEPLOY.md` if you add one). If a finding assumes production is exposed but the diff does not change guards, reply on the PR with file/line evidence.

<!-- cerebe:pack-digest:v1 sha256=4cc3f38a5b2ce6608ec15a4caa7a5d584768fedfdbe72adb00953b244f548093 -->
# Working with Cerebe's review

Cerebe reviews your changes and reports findings. Each finding names a file, the evidence, the impact and the fix it requires.

- Locally, when review is on: `cerebe status` shows the verdict and findings for your latest commit, and `cerebe show` prints the full review. The pre-push hook runs `cerebe gate-push`, which blocks a push while a blocking finding is unresolved.
- On a pull request: findings are annotations on the `cerebe/critic` check. `cerebe review-status --pr <number>` prints the result as data.
- Fix each finding whose evidence holds. When the evidence does not hold, say why in the pull request, citing the code.
- Commit and push again; the new commit is reviewed.

---

# When review rounds stop converging

A round is one review and the fixes that answer it.

- Budget three rounds by default; use the repository's number if its guidance sets one.
- After each round, compare the new findings with the last. You are converging when there are fewer and no new kinds. A lower severity, or the same finding moved to another file, is not progress.
- When new kinds of finding keep appearing in the same part of the change, stop fixing them one by one. Restructure that part: simplify it, remove it, or split it into its own change.
- Ask the person you work for only when a mergeable change needs a decision that is theirs.

---

# When a gate fails because of the base branch

Before you fix a failing gate, find out whose failure it is.

- Run `cerebe verify --triage-base <base-ref> --route <id>`, or `cerebe verify --triage-base <base-ref> --gate "<command>"` for a gate that is not a route. It runs the gate in your tree and at the base, and prints one verdict.
- `in-diff` or `inconclusive`: treat it as yours and fix it.
- `pre-existing`: leave it out of this change unless the fix is a few adjacent lines. File an issue naming the gate and cite it in your pull request.
- If the push gate blocks only on that failure, push with the reason: `CEREBE_BYPASS="<gate> fails at <base-ref>; tracked at #<issue>" git push`. Never bypass a failure your change caused.

---

# Producing the evidence the gate reads

This applies when the repository defines verification routes: commands that must pass when a change touches certain paths.

- Before you push, run `cerebe verify`. It runs the routes your commit triggers and records the result for that exact commit. `cerebe verify --route <id>` runs one route.
- `cerebe gate-push` blocks a push when a triggered route has no passing evidence. Evidence is bound to the diff, so run `cerebe verify` again after you change the commit.
- A failing route is a real failure: fix the cause. Never write or edit evidence by hand.
- `cerebe gates` runs the quality gates and the triggered routes with no model call.
<!-- /cerebe:pack-digest:v1 -->
