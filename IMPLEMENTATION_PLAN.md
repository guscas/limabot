# LimaBot implementation plan

## What exists

The source repository starts with only a README, MIT license and Node-oriented `.gitignore`. The Figma file contains several mobile flows; the first frame is the 390 × 890 home screen. It establishes reusable patterns for the status/header area, language and profile controls, voice activation, quick prompts and bottom navigation.

## Reusable design assets and components

- Exact Figma assets are stored locally in `public/assets`; no temporary Figma URLs remain.
- UI primitives: `LanguageSwitcher`, `VoiceButton`, `QuickSuggestions`, and `BottomNavigation`.
- Content is centralized in `src/content.ts`, with English as the default and Spanish as an alternative.
- Design tokens currently live in `src/index.css`; move them to a shared token layer when more screens are added.

## Delivery phases

1. **Foundation and home screen** — complete: React, TypeScript, Vite, Tailwind CSS, responsive home screen, localization, voice recognition enhancement and accessible interactions.
2. **Voice session** — complete: full-screen listening state, animated orb and waveform, transcription hand-off, typing fallback and safe camera placeholder.
3. **Results conversation** — complete: assistant response, horizontally scrollable place cards, follow-up chips, typed prompt, voice return and reusable navigation.
4. **Conversation shell** — message history, streaming UI, loading/error states, safe server API contract and moderation/error handling.
5. **Tourism tools** — server-side adapters for verified places, events, nearby search and routing. Responses must expose source and freshness metadata; never fabricate live availability.
6. **Trip workspace** — itinerary, saved places and route views, with explicit permission handling for geolocation.
7. **Hardening** — automated unit/E2E/accessibility tests, WCAG 2.2 AA audit, observability, rate limiting and deployment configuration.

## Security boundary

The browser should call a project-owned backend endpoint. Provider credentials, tourism API tokens and prompt/tool orchestration belong exclusively on the server via environment variables or a secret manager. The frontend must only receive the minimum public result data and must never embed keys in `VITE_*` variables.
