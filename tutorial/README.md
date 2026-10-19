# Cerebe Factory — tutorial index

Hands-on guides distilled from production runbooks. No vendor secrets, no customer code — only patterns you can reuse.

## Read in order (first hour)

| # | Doc | You will learn |
|---|-----|----------------|
| 00 | [Overview](./00-overview.md) | Hosted vs local review, mental model |
| 01 | [One-time setup](./01-one-time-setup.md) | GitHub App, CLI, `cerebe init` |
| 02 | [Day-to-day workflow](./02-day-to-day-workflow.md) | PR loop, fix in new commits |
| 03 | [AGENTS.md contract](./03-agents-md-and-contract.md) | What critics read; pack digest |
| 04 | [GitHub App & merge gates](./04-github-app-and-branch-protection.md) | Require `cerebe/critic` |
| 05 | [CLI reference](./05-cli-reference.md) | Commands cheat sheet |
| 06 | [Bypass & triage](./06-bypass-and-triage.md) | When and how to bypass safely |
| 07 | [GitHub CLI](./07-github-cli-cheatsheet.md) | `gh` for PRs and checks |
| 08 | [CI & Actions](./08-ci-and-actions.md) | `cerebe doctor` vs hosted critic |
| 09 | [Cursor & Composer](./09-local-critic-cursor-composer.md) | Local critic with Cursor |
| 10 | [Troubleshooting](./10-troubleshooting.md) | Common failures |
| 11 | [Large PRs](./11-large-prs-and-waves.md) | ~16 MB cap, wave strategy |
| 12 | [Verification routes](./12-verification-routes.md) | `cerebe verify`, evidence |
| 13 | [Findings playbook](./13-findings-playbook.md) | Triage, convergence, trackers |

## Official docs

- [Quickstart](https://cerebe.ai/docs/factory/quickstart)
- [Install](https://cerebe.ai/docs/factory/install)
- [CLI overview](https://cerebe.ai/docs/factory/cli/overview)
- [GitHub App](https://cerebe.ai/docs/factory/platform/github-app)
- Dashboard: [factory.cerebe.ai](https://factory.cerebe.ai)

## Two checks, one PR

On a typical pull request you may see:

| Check | Source | Blocks merge? |
|-------|--------|----------------|
| **`cerebe/critic`** | Cerebe Factory **GitHub App** | Only if you **require** it on `main` |
| **`CI`** (this repo) | `.github/workflows/ci.yaml` | Only if required in branch rules |

Cerebe does **not** need a “run review” step in YAML. The App posts the critic check when the PR opens or updates.
