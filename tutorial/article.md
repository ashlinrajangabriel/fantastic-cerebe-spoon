# LinkedIn article — copy instructions

1. Open this file in any editor.
2. Select **everything** from the line **`COPY START`** through **`COPY END`** (inclusive).
3. Paste into LinkedIn **Start a post** (long post) or **Write article**.
4. If LinkedIn strips spacing, paste once into Notepad first, then into LinkedIn.

Optional title for LinkedIn article field:

We Added a Second Reviewer to Every Pull Request — and It Isn’t a Human

---

COPY START

We Added a Second Reviewer to Every Pull Request — and It Isn’t a Human

AI writes most of the diff now. Your review process still assumes a human wrote every line.

That gap is where regressions, security slips, and “looks fine in the IDE” merges show up. We did not fix it by asking people to review more. We fixed it by making AI review a first-class gate — the same way tests and lint are gates — using Cerebe Factory.

Here is the model that actually stuck with our team.


TWO REVIEWERS, TWO JOBS

Think of quality in layers.

First: deterministic CI — tests, boot checks, wiring smoke. Fast, repeatable, no judgment.

Second: an AI critic on the pull request — reads the diff plus your repo rules (AGENTS.md), posts findings with severity and evidence.

Third: humans — product calls, architecture, and disagreements with the critic (with citations, not vibes).

The mistake teams make is treating the AI critic as a nice-to-have chat in the IDE. The setup that scales is hosted review on every pull request as a GitHub check named cerebe/critic, optionally required before merge — same mental model as “CI must be green.”

Important detail: that check does not come from a GitHub Actions YAML that calls an LLM. It comes from the Cerebe Factory GitHub App. Your workflow validates the contract (cerebe doctor). The App delivers the verdict on the PR.


HOW THE LOOP WORKS

Local (optional): commit, background review, pre-push may block on blocker or high severity.

GitHub (authoritative for merge): open PR, cerebe/critic runs, fix in new commits, Cerebe re-runs on push.

Golden rules we enforce in docs and habit:

Use pull requests, not direct pushes to main, if you want hosted review every time.

Use new commits to address findings. Do not git commit --amend after Cerebe has reviewed a SHA. The verdict is bound to commit plus diff.

Treat AGENTS.md as the contract for Cursor, Claude Code, Codex, and the critic. If production posture lives only in Slack, expect false positives.


WHAT cerebe doctor IS (AND IS NOT)

People confuse cerebe doctor with “run AI review.”

cerebe doctor answers: Is this repo correctly wired for Factory? Hooks, cerebe.yaml, fleet config, AGENTS.md digest health, detected agent CLIs. An empty local critic fleet is fine.

cerebe/critic answers: Is this change acceptable?

We run cerebe doctor in CI when contract files change so broken doctrine never lands on main. That is hygiene, not a substitute for the App.


LOCAL CRITIC VS CURSOR COMPOSER

Composer is how we produce code in the IDE.

cerebe model add cursor is how we optionally review commits locally before push.

There is not a separate “Composer critic” ID — Cursor maps to cursor and your agent CLI on PATH.

We still treat PR cerebe/critic as the merge authority when branch protection requires it. Local review catches issues earlier. Hosted review stays independent.


BYPASS: RARE, LOUD, AUDITED

Bypass is not “skip review because we are late.”

Local pre-push (example on Windows PowerShell):

$env:CEREBE_BYPASS = "npm test fails at origin/main; tracked at #123"; git push

That reason is recorded in the audit trail.

Pre-existing CI failure on main: triage with cerebe verify --triage-base origin/main before blaming the PR.

Hosted cerebe/critic: no env-var bypass — fix, split the PR, or an admin changes required checks with a paper trail.


WHEN ONE PR IS TOO BIG

Hosted review hits roughly a 16 MB changed-file cap. One branch with months of local commits will fail before anyone reads a finding.

The fix is boring and effective: wave PRs — small diffs, squash merge per wave, then the next slice from updated main. Same discipline as any large migration. Cerebe just makes the failure mode explicit.


STARTER FOR OTHER TEAMS

We open-sourced a generic starter (no product code, no secrets): contract files, a tutorial runbook, and CI that runs tests plus cerebe doctor. Install the GitHub App, require cerebe/critic, point devs at the tutorial.

Repo: https://github.com/ashlinrajangabriel/fantastic-cerebe-spoon

Official docs: https://cerebe.ai/docs/factory/quickstart


TAKEAWAYS FOR ENGINEERING LEADERS

1. Treat AI review as infrastructure, not a side chat — App plus optional required check.

2. Centralize rules in AGENTS.md so agents and critics do not diverge.

3. Keep CI and Cerebe separate — tests in Actions, critic on the PR.

4. Optimize for small PRs — caps and review quality move together.

5. Measure convergence — if findings multiply in the same area after three rounds, restructure the change; do not patch forever.


If you are standardizing how your team ships AI-assisted code, I would love to hear whether you are gating on tests only, human review only, or tests plus machine critic. What broke first when you tried it?

#AI #SoftwareEngineering #DevSecOps #CodeReview #GitHub #DeveloperExperience #EngineeringLeadership

COPY END

---

## Short post version (optional)

Copy from **SHORT START** to **SHORT END** for a ~1,300 character post.

SHORT START

Most teams still review AI-generated code like a human wrote every line.

We did not fix that with “review harder.” We added a second reviewer on every PR: Cerebe Factory → GitHub check cerebe/critic (GitHub App, not an Actions LLM job).

What worked:
→ AGENTS.md = one contract for Cursor + critics
→ Fix findings in new commits (never amend after review)
→ cerebe doctor in CI = wiring hygiene; cerebe/critic = merge gate
→ Small PRs (hosted cap ~16 MB)

Free starter runbook + contract files:
https://github.com/ashlinrajangabriel/fantastic-cerebe-spoon

Are you gating on tests only, humans only, or tests + machine critic?

#AI #CodeReview #DevSecOps #SoftwareEngineering

SHORT END
