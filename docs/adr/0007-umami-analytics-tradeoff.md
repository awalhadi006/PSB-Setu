# ADR-0007: Umami Self-Hosted Analytics

## Status
Accepted (with documented trade-off)

## Context
The spec states "no third-party scripts." Analytics was not explicitly requested but is common for landing pages. Umami is a privacy-friendly, self-hostable analytics option.

## Decision
Document Umami self-hosted as a potential future addition, but do NOT include in current build. The "no third-party scripts" constraint takes precedence.

If analytics is added later:
- Self-host Umami on own infrastructure
- No external script domains
- No cookies, GDPR-compliant by default
- Configure via environment variable (optional opt-in)

Current build: Zero analytics scripts.

## Consequences
- Spec compliance maintained
- Future analytics path documented
- No tracking in current deployment

## Trade-off
- No visitor insights without analytics
- Acceptable for informational brochure site
- Can be added later without architecture changes