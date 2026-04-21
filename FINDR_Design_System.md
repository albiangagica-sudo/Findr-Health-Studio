# FINDR Brand Identity & Design System Guidelines
**Version 1.0** | **Confidential** | **Property of FINDR Health**

---

## 1. Brand Essence & Story
FINDR is the world's first AI-powered health advocacy platform built for the modern family. We bridge the gap between complex medical billing and human financial wellness. Our mission is to dismantle the opaque walls of healthcare finance through precision auditing and expert-led advocacy.

**Official Domain:** [Findrhealth.com](https://Findrhealth.com)

**The Tone**: Authoritative, Technical, Transparent, and Empathetic.

---

## 2. Logo Architecture
The FINDR brand mark is a precision-engineered SVG asset that must be used consistently across all touchpoints.

### 2.1. Geometry & Relationship
The logo consists of a distinctive "F" mark combined with a custom wordmark. The relationship between the symbol and the text is fixed and must never be altered.

```svg
<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 580.5 308.3">
  <defs>
    <style>.st0 { fill: #2E5BFF; }</style>
  </defs>
  <path class="st0" d="M24.8,127.8v106.4h41.1v-57.3h36.1v-41.8h-36.1v-7.3c0-8,2.8-14.8,8.5-20.5,5.7-5.6,14.9-8.5,27.5-8.5v-41.1c-24.2,0-43.1,6.8-56.7,20.5-13.6,13.6-20.5,30.2-20.5,49.6Z"/>
  <g>
    <path class="st0" d="M136.2,57.3c-5.8,0-10.6,2-14.6,6-4,4-6,8.8-6,14.5s2,10.6,6,14.6c4,4,8.9,6,14.6,6s10.5-2,14.5-6c4-4,6-8.9,6-14.6s-2-10.5-6-14.5c-4-4-8.8-6-14.5-6Z"/>
    <rect class="st0" x="115.6" y="111.5" width="41.1" height="122.7"/>
  </g>
  <!-- ... Remaining geometry defined in the operational SVG code ... -->
</svg>
```

### 2.2. Clear Space
To ensure visual integrity, the logo must be surrounded by a minimum exclusion zone equal to the width of the "i" in the wordmark (unit "X"). No other elements should enter this space.

---

## 3. Color Palette
Our color system represents the intersection of technical precision (Cobalt) and vibrant human health (Zest).

### 3.1. Primary Colors
| Color | HEX | RGB | CMYK | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **FINDR Blue** | `#2E5BFF` | `46, 91, 255` | `82, 64, 0, 0` | Primary Branding, CTAs |
| **Zest Green** | `#D4FF59` | `212, 255, 89` | `17, 0, 65, 0` | Success States, Accents |
| **Cobalt** | `#2E5BFF` | `46, 91, 255` | `82, 64, 0, 0` | Technical Audits, Labels |

### 3.2. Secondary & Atmospheric
| Color | HEX | Usage |
| :--- | :--- | :--- |
| **Lavender** | `#EED9FF` | Background Gradients, Soft surfaces |
| **Slate Black** | `#141414` | Primary Typography |
| **Cloud Blue** | `#DBEAFE` | Subtle Borders, Background Blends |

---

## 4. Typography
Typography is our most critical signal of precision.

### 4.1. Display (Headings) - **Space Grotesk**
Used for all H1-H3 headlines. 
*   **Weight:** Bold (700)
*   **Tracking:** -0.02em (Tight)
*   **Scaling:** Leading should be 0.85 to 0.9 for large headers.

### 4.2. Functional (Body) - **Inter**
Used for paragraphs, descriptions, and buttons.
*   **Weight:** Medium (500) for UI, Regular (400) for long-form.
*   **Character:** High legibility, neutral.

### 4.3. Technical (Data) - **JetBrains Mono**
Used for Document IDs, Progress Codes, and Audit logs.
*   **Weight:** Regular (400) or Bold (700).
*   **Character:** Systematic, Monospace.

---

## 5. Visual Language & Spacing
### 5.1. Liquid Glassmorphism
The FINDR interface uses "Liquid Glass" surfaces:
*   **Surface:** `bg-white/40`
*   **Blur:** `backdrop-blur-3xl`
*   **Shadow:** Deep, soft shadows (e.g., `shadow-[0_32px_80px_rgba(0,0,0,0.12)]`)
*   **Liquid Blobs:** Animated background gradients (Lavender to Zest) with high blur (80px+).

### 5.2. Spacing Rhythm
Consistency is maintained through a 4px grid system. Standard card padding is `p-8` (32px), expanding to `p-14` (56px) for high-impact hero elements.

---

## 6. Incorrect Usage (Don'ts)
*   **No Stretching:** Never alter the aspect ratio of the logo.
*   **No Drop Shadows on Logos:** The logo should inhabit a clean space.
*   **Unauthorized Colors:** Do not use reds or purples as primary branding colors; we are an optimistic, not alarmist, brand.
*   **Improper Separation:** The "F" mark must never be shown smaller than the wordmark.

---

## 7. Application Examples
*   **Digital Web:** Use Mesh Gradients (Lavender/Zest/Cobalt) edge-to-edge for top-of-fold sections.
*   **Mobile App:** High-density cards with live "Live Savings Feed" status indicators.
*   **Stationery:** All business cards must use the Zest accent for the back face to ensure memorability.

---
*Created by Senior Brand Identity Architect for FINDR Health.*
