# PoE2 HUB Navigation Redesign

## Overview

This redesign converts the current PoE2 HUB from a browser-local editable bookmark manager into a pure static navigation page for GitHub Pages.

The updated site should feel like a curated PoE2 portal rather than a CRUD tool. Users land on the page, scan clear content groups, and jump directly to the destination they need. There will be no editing UI, no local persistence, no search, and no filtering.

## Goals

- Turn the homepage into a clean read-only navigation portal.
- Improve visual hierarchy so users can quickly identify where to go.
- Group links by purpose instead of showing one flat list.
- Keep the implementation lightweight and easy to maintain on GitHub Pages.
- Add a readable README with local development and deployment guidance.

## Non-Goals

- User-managed custom links
- Browser-side localStorage persistence
- Add, edit, delete, or reset flows
- Search input and tag filters
- Backend services or CMS integration

## Information Architecture

The homepage will be a single-page experience with four primary sections:

1. Hero
2. Navigation groups
3. Maintenance / source note
4. Footer links

### Hero

The hero introduces the site as a curated PoE2 resource hub.

Content:

- Site title: `PoE2 HUB`
- Short Chinese subtitle explaining that this is a commonly used PoE2 portal collection
- One or two supporting lines that set expectations: read-only, curated, fast access
- A compact meta line linking to GitHub repository and Pages URL

The hero should visually anchor the page and establish the dark fantasy / archive-like tone.

### Navigation Groups

Links will be reorganized into semantic groups instead of a shared flat card grid.

Recommended groups:

- Official entry
- Build tools
- Data references
- Community forums

Each group contains:

- Chinese section title
- Short helper description
- A compact grid of read-only link cards

Each link card contains:

- Site name
- Short description
- External URL or domain hint
- Single primary action: `前往站点`

### Maintenance / Source Note

Below the groups, include a small maintenance section explaining:

- This page is maintained as a static project
- Link data is stored in code
- Updates are made through the repository

This replaces the old "local browser storage" messaging.

### Footer Links

The footer provides:

- GitHub repository link
- GitHub Pages link
- A short maintenance note

## Visual Direction

The page should preserve the PoE2-inspired dark theme but shift away from "admin panel" styling.

### Tone

- Dark, restrained, game-adjacent
- Gold / ember accents
- More like a curated codex or waypoint board
- Less like a settings panel

### Layout

- Desktop: strong hero, followed by stacked grouped sections
- Tablet: groups remain distinct with 2-column cards where space allows
- Mobile: fully single-column, easy scanning

### Components

- Group containers should feel like framed content blocks
- Link cards should feel interactive but not button-heavy
- Use a single clear CTA per card
- Remove all management affordances and form-like UI

### Typography

- Keep a decorative display face for headings
- Use a readable sans-serif for body text
- Make section titles more prominent than card labels

## Technical Design

### Data Model

Replace the mutable site data flow with static grouped data.

Recommended shape:

```ts
type SiteLink = {
  name: string;
  url: string;
  description: string;
};

type SiteGroup = {
  id: string;
  title: string;
  description: string;
  links: SiteLink[];
};
```

The source file should hold curated content only, with final Chinese descriptions and stable grouping.

### Component Structure

Refactor the current single large component into small read-only components.

Suggested structure:

- `App`
- `HeroSection`
- `SiteGroupSection`
- `SiteLinkCard`
- `FooterSection`

This keeps rendering logic simple and avoids mixing content, layout, and deprecated editing concerns in one file.

### State Management

Minimal or no React state should remain.

Expected behavior:

- No editor modal state
- No localStorage hook
- No query state
- No tag filter state

The page can be fully rendered from imported static data.

### Styling Strategy

Continue using the existing Tailwind + custom component classes setup.

Changes:

- Remove styles for form controls and management buttons that are no longer used
- Add styles for grouped sections and more polished read-only cards
- Improve spacing, section rhythm, and mobile presentation

## Content Migration

The current seed data already contains useful sites, but it needs cleanup.

Migration tasks:

- Rewrite damaged Chinese text with proper UTF-8 content
- Reclassify each site into one target group
- Standardize descriptions to short, readable phrases
- Preserve English site names where that is the real brand name

## Error Handling

This is a static page, so failure handling is limited.

Expected safeguards:

- External links open in a new tab
- Data file should be typed to reduce malformed entries
- Build should fail if the TypeScript data structure is invalid

## Testing Strategy

Required checks before completion:

- Run production build successfully
- Verify desktop layout visually
- Verify mobile-width layout visually
- Confirm all rendered links have valid `href` values
- Confirm removed features no longer appear in the UI

## README Scope

The README should be rewritten in readable Chinese and cover:

- Project purpose
- Tech stack
- Local development commands
- Build commands
- GitHub Pages deployment notes
- Where navigation data is maintained

It should also avoid mentioning removed features such as local storage and editable links.

## Implementation Boundaries

This redesign should stay focused on the current project goal.

Included:

- UI redesign for a read-only navigation homepage
- Static grouped content model
- README rewrite

Excluded for now:

- Automated deployment workflow changes
- Analytics
- Search / filtering
- Internationalization
- Screenshot generation for README

## Risks And Mitigations

### Risk: page feels too empty after removing interactions

Mitigation:

- Use grouped presentation and stronger section descriptions
- Improve hero copy and visual rhythm

### Risk: content grouping feels arbitrary

Mitigation:

- Use intuitive, user-first group labels
- Keep each site in exactly one primary group

### Risk: README and site content drift apart later

Mitigation:

- Document the data source location clearly in README
- Keep content definitions centralized in one file

## Delivery Notes

- This spec is written in the current workspace, but this workspace is not a git repository, so the requested spec commit cannot be created here.
- Implementation should begin only after spec review and approval.
