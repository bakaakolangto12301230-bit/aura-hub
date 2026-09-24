# Unified Customer Platform

## Goal
Build a polished, frontend-only destination where customers can fluidly shop merchandise, explore event packages, and book automotive care without encountering dashboard-style complexity.

## Experience
- Create a shared floating glass navigation with a compact Explore selector, contextual links, global search, cart, profile, and mobile menu.
- Build an immersive home page with concise discovery messaging and an editorial flow through Shop, Events, and Auto using distinct visual worlds rather than repeated cards.
- Add dedicated `/shop`, `/events`, and `/auto` experiences so each area can adapt its navigation and interactions while remaining visually connected.
- Support progressive-disclosure interactions through product, package, service, search, cart, checkout, and booking drawers/dialogs.
- Keep all commerce and booking interactions functional with realistic mock data and local React state, including selection, cart feedback, date/time choice, checkout/booking steps, and confirmations.

## Visual Direction
- Use a refined light liquid-glass material system with crisp translucent surfaces, fine borders, restrained blur, controlled reflections, and selective deep contrast.
- Give each world a related accent and photographic mood: tactile editorial commerce, luminous celebrations, and cinematic polished automotive care.
- Use expressive typography, asymmetric compositions, horizontal streams, full-width imagery, layered captions, and generous whitespace.
- Add purposeful spring-like transitions, hover depth, selection feedback, drawer motion, page-entry crossfades, and reduced-motion fallbacks.

## Technical Approach
- Define semantic colors, glass levels, typography, shadows, motion, focus states, and responsive rules in the global design system.
- Add reusable customer-facing components for navigation, search overlay, experience selector, media compositions, horizontal rails, product/service previews, cart, and booking flows.
- Use TanStack Router routes and links; share local state through a React context mounted in the root layout.
- Use bundled generated imagery for the three visual worlds; no remote placeholders or backend dependencies.
- Add unique metadata for every content route and keep the existing error/not-found experience aligned with the new system.

## Validation
- Verify the homepage and each destination on desktop and mobile.
- Exercise the central flows: add a product and inspect cart, open an event package and complete a mock booking, choose an auto service and confirm an appointment, and use global search/navigation.
- Check keyboard focus, dialog labels, touch targets, reduced motion, text fit, console errors, and final build status.
