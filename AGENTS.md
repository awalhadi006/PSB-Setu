# AGENTS.md — PSB Skills Repository

This is a **skills lockfile repository** for OpenCode/Claude. No build, test, or lint commands exist.

## Structure

```
.
├── skills-lock.json          # Pinned skill versions (80+ skills)
├── .agents/skills/           # Project-level skills (source of truth)
├── .claude/skills/           # Duplicate for Claude Code compatibility
└── .omo/                     # Orchestration continuation data
```

## Skill Sources (from `skills-lock.json`)

| Source | Skills |
|--------|--------|
| `emilkowalski/skill` | animate, animate-expo, animation-performance, animation-vocabulary, apple-design, ask-sonner, break-ui, emil-design-eng, find-animation-opportunities, improve-animations, mobile-native, pick-ui-library, review-animations, write-swift |
| `mattpocock/skills` | ask-matt, chief-of-staff, claude-handoff, code-review, codebase-design, diagnosing-bugs, domain-modeling, grill-me, grill-with-docs, grilling, handoff, implement, implement-spec, improve-codebase-architecture, loop-me, migrate-to-shoehorn, pr, prototype, research, retro, setup-matt-pocock-skills, setup-pre-commit, setup-ts-deep-modules, tdd, teach, to-questionnaire, to-spec, to-tickets, triage, wait-what, wayfinder, wizard, writing-beats, writing-for-agents, writing-fragments, writing-shape |
| `greensock/gsap-skills` | gsap-core, gsap-frameworks, gsap-performance, gsap-plugins, gsap-react, gsap-scrolltrigger, gsap-timeline, gsap-utils |
| `ibelick/ui-skills` | baseline-ui |
| `Leonxlnx/taste-skill` | design-taste-frontend |
| `pbakaus/impeccable` | impeccable |
| `ayghri/i-have-adhd` | i-have-adhd |

## Key Commands

| Action | Command |
|--------|---------|
| Update skills | Edit `skills-lock.json` hashes, then re-sync via OpenCode |
| Add skill | Add entry to `skills-lock.json` with correct `computedHash` |
| List installed skills | `ls .agents/skills/` |

## Agent Notes

- **No package manager** — skills are vendored markdown files, not npm packages
- **Hash verification** — `computedHash` in lockfile must match skill file content
- **Dual install** — skills exist in both `.agents/skills/` and `.claude/skills/`
- **No CI/CD** — this repo is configuration/data only
- **`.omo/` is ephemeral** — contains session continuation data, safe to ignore

## Agent skills

### Issue tracker

Local markdown under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five canonical labels. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout (`GLOSSARY.md` + `docs/adr/`). See `docs/agents/domain.md`.