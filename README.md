# fantastic-cerebe-spoon

Minimal starter repository for **[Cerebe Factory](https://cerebe.ai/docs/factory/quickstart)** — AI code review on pull requests (`cerebe/critic`) plus an optional local critic before `git push`.

## Start here

| Step | Action |
|------|--------|
| 1 | Read [`tutorial/README.md`](tutorial/README.md) |
| 2 | Install the [Cerebe Factory GitHub App](https://github.com/apps/cerebe-factory/installations/new) on this repo |
| 3 | Clone, then `cerebe init` (or the [install one-liner](https://cerebe.ai/docs/factory/install)) |
| 4 | Open a PR and wait for **`cerebe/critic`** |
| 5 | Optionally require **`cerebe/critic`** on `main` (see tutorial) |

This repo ships the **Factory contract** (`cerebe.yaml`, `cerebe/config.json`, `AGENTS.md`) and a **GitHub Actions** workflow that runs `cerebe doctor`. Hosted PR review is **not** implemented in YAML — it comes from the GitHub App.

## Layout

```
AGENTS.md              # Rules for agents + Cerebe critics
CLAUDE.md              # Thin pointer for Claude Code
cerebe.yaml            # Team policy (locked doctrine, denied git commands)
cerebe/config.json     # Local critic fleet (empty by default)
.github/workflows/ci.yaml
tutorial/              # Operator guides (no product-specific secrets)
```

## License

MIT — use as a template for your own projects.
