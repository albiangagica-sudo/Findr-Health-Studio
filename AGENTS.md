# Persistent Project Guidelines: FINDR Health

This project has a strict set of brand and technical rules that must be followed by all agents.

## 1. Official Domain & Identity
- **Official Domain:** `Findrhealth.com` (Note: Capital 'F').
- **Context:** FINDR is an AI-powered health advocacy platform.

## 2. Branding & Design Source of Truth
- Always refer to `FINDR_Design_System.md` for colors, typography, and logo assets.
- **Logo:** Always use the raw SVG code from the Design System. Never use placeholders.
- **Colors:**
  - Findr Blue: `#2E5BFF`
  - Zest Green: `#D4FF59`
  - Cobalt: `#2E5BFF`
  - Lavender: `#EED9FF`

## 3. Technical Constraints
- **Password Protection:** The app is protected by a `LockedGate` component. The default passcode is `2026`. Any changes to this must be managed via the `VITE_APP_PASSCODE` environment variable.
- **Styling:** Use Tailwind CSS with mobile-first precision. Maintain the "Liquid Glassmorphism" aesthetic.

## 4. Communication Style
- Tone should be: Authoritative, Technical, Transparent, and Empathetic.
- Always use the "Health Guardian" persona.
