# AGENTS.md and the Factory contract

## Why `AGENTS.md` matters

Cerebe critics and coding agents (Cursor, Claude Code, Codex, etc.) read **`AGENTS.md`** as the **single shared contract**:

- What the repo is
- Commands that must pass before merge
- Production / security facts critics should not guess wrong
- How to respond to review (new commits, no amend)

**`CLAUDE.md`** should stay thin and point at `AGENTS.md` so Claude-only settings do not fork the contract.

## File roles

| File | Commit? | Notes |
|------|---------|--------|
| `AGENTS.md` | Yes | Customer-owned section at top; Cerebe pack below digest markers |
| `CLAUDE.md` | Yes | Pointer only |
| `cerebe.yaml` | Yes | Team policy — locked fields managed by Cerebe tooling |
| `cerebe/config.json` | Yes | Start with empty `critics[]`, quorum `0` |
| `cerebe.local.yaml` | **No** | Personal overlay — gitignore |
| `cerebe/reviews/`, `runs.ndjson` | **No** | Local runtime |

## The Cerebe pack in `AGENTS.md`

Between HTML comments `<!-- cerebe:pack-digest:v1 ... -->` and `<!-- /cerebe:pack-digest:v1 -->` lives **standard review doctrine** (fix loops, bypass rules, `cerebe verify`). The digest hash must match the pack body — **`cerebe doctor`** fails if you edit the pack by hand incorrectly.

**Safe edits:**

- Change the **top** of `AGENTS.md` (your repo description, test commands, production posture tables).
- After changing Cerebe-managed sections, run `cerebe doctor` and commit whatever the tool fixes.

## `cerebe.yaml` (policy)

Typical team locks:

- Deny `git push --force`, `git reset --hard`, `git clean`
- Lock `behavior.doctrine`, `tools.deny`, `critics.quorum`

Personal overrides belong in **`cerebe.local.yaml`** (not committed).

## `cerebe/config.json` (local fleet)

Important fields:

| Field | Starter value | Meaning |
|-------|---------------|---------|
| `critics` | `[]` | No local review until `cerebe model add` |
| `aggregation.quorum` | `0` | Matches empty fleet |
| `aggregation.blockingSeverities` | `blocker`, `high` | Pre-push gate severities |
| `context.guidanceFiles` | `AGENTS.md`, `CLAUDE.md` | What local critics load |

Hosted PR review ignores your laptop fleet — it uses the Platform panel.

## Keeping agents aligned

When you add a new required test command:

1. Add it to **AGENTS.md** (and to `.github/workflows/ci.yaml` if CI should enforce it).
2. Mention it in PR template or team chat once.
3. Run `cerebe doctor` after contract file edits.

Critics cite **committed** sources. If production posture lives only in Slack, expect false positives.
