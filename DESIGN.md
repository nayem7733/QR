---
name: Obsidian Lumina
colors:
  surface: '#0e1321'
  surface-dim: '#0e1321'
  surface-bright: '#343948'
  surface-container-lowest: '#090e1c'
  surface-container-low: '#161b2a'
  surface-container: '#1a1f2e'
  surface-container-high: '#252a39'
  surface-container-highest: '#303444'
  on-surface: '#dee2f6'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dee2f6'
  inverse-on-surface: '#2b303f'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#0e1321'
  on-background: '#dee2f6'
  surface-variant: '#303444'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies a forward-looking, high-precision aesthetic engineered for next-generation dynamic QR and interactive video workflows. It marries technical authority with fluid, consumer-grade elegance.

### Philosophy & Visual Expression
- **Futuristic Precision Meets Tactile Depth:** Seamless convergence of sleek obsidian dark surfaces, frosted optical glass, and luminescent spectral signals.
- **Atmospheric Clarity:** Interfaces feel weightless yet physically anchored, utilizing calibrated multi-layered translucent glass, micro-glows, and strict architectural alignment.
- **Emotional Resonance:** Inspires confidence, technological prowess, seamless creation speed, and premium craft.

### Aesthetic Foundation
- **Glassmorphism & Tonal Layering:** 12px to 24px backdrop blurs layered over rich obsidian gradients, finished with delicate inner highlights.
- **High-Tech Signal Gradients:** Electric indigo transitioning to violet with focused cyan focal points representing laser scanning accuracy and dynamic telemetry.

## Colors

The color palette balances deep obsidian substrates with hyper-saturated luminous accents.

### Foundation Roles
- **Primary (`#6366F1` - Electric Indigo):** Primary calls to action, active navigation anchors, and focal brand moments.
- **Secondary (`#8B5CF6` - Vivid Violet):** Secondary brand expressions, gradient blends with primary, interactive indicators, and processing states.
- **Tertiary (`#06B6D4` - Cyber Cyan):** High-priority scanning pulses, live preview targets, telemetry readouts, and success/active dynamic states.
- **Neutral Deep (`#0A0F1D` - Void Obsidian):** Base root application canvas in dark mode; grounds all elevated glass strata.

### Surface Architecture & Elevation Palette
- **Canvas Base:** `#0A0F1D`
- **Surface Level 1 (Panels & Navbars):** `rgba(17, 24, 39, 0.75)` with `backdrop-blur-md`
- **Surface Level 2 (Cards & Trays):** `rgba(26, 34, 53, 0.65)` with `backdrop-blur-md`
- **Surface Hover:** `rgba(37, 48, 74, 0.8)`
- **Border Ghost Substrates:** `rgba(255, 255, 255, 0.08)` (Rest) and `rgba(99, 102, 241, 0.4)` (Focus/Interactive)

### Light Mode Inversion
- Base: `#F8FAFC` (Pure Slate Mist)
- Surface Level 1: `rgba(255, 255, 255, 0.85)`
- Surface Level 2: `rgba(241, 245, 249, 0.9)`
- Text High Contrast: `#0F172A`
- Text Subdued: `#475569`

## Typography

Typography establishes a crystalline structural hierarchy using **Plus Jakarta Sans** for expressive, geometric headers and **Inter** for neutral, utilitarian body copy.

### Pairing Strategy
- **Plus Jakarta Sans:** Selected for display and headline roles. Its geometric bowls and modern terminal cuts deliver an approachable yet cutting-edge SaaS presence.
- **Inter:** Serves all functional prose, data grids, dashboard readouts, and operational labels, ensuring crisp rendering across OLED and retina mobile displays.
- **Monospace Accent:** JetBrains Mono is utilized strictly for technical metadata, short URLs, QR payload hashes, and frame counts.

### Sizing and Optical Weight Scale
- Titles and high-level marketing counters employ generous negative letter-spacing (`-0.02em` to `-0.03em`) to reinforce tension and solidity.
- Micro-labels (`label-sm`) utilize slight positive tracking (`+0.04em`) and uppercase styling to ensure readability on mobile interfaces.

## Layout & Spacing

The layout is built on a responsive 12-column adaptive fluid grid governed by an 8pt architectural rhythm (with a 4pt sub-grid for icons and compact micro-controls).

### Breakpoints & Reflow Philosophy
- **Mobile (390px - 767px):** 4 columns. Gutter: `1rem` (16px), Canvas Margin: `1.25rem` (20px). Bottom navigation sheets and stacked controls prioritize single-thumb operation on handheld devices.
- **Tablet (768px - 1023px):** 8 columns. Gutter: `1.25rem` (20px), Canvas Margin: `2rem` (32px). Dynamic side-by-side canvas and studio controls appear.
- **Desktop (1024px+):** 12 columns with a max canvas constraint of `1440px`. Gutter: `1.5rem` (24px), Canvas Margin: `3rem` (48px). Tri-pane studio workspace layout (Assets / Live Viewport / Properties).

### Spatial Hierarchy
- Compact elements (badges, micro tags) leverage `space-xs` and `space-sm`.
- Container cards, dialogs, and workspace toolbars use `space-lg` to `space-xl` to establish air and optical breathing room amidst high-density technical parameters.

## Elevation & Depth

Visual hierarchy uses frosted glassmorphism, multi-spectral backdrops, and low-intensity luminescence rather than mud-heavy drop shadows.

### Glassmorphism & Tonal Stacking
- **Level 0 (Root Workspace):** Deep `#0A0F1D` canvas accented by soft radial gradient light wells (Indigo/Cyan at 15% opacity).
- **Level 1 (Floating Navbars & Sidebars):** Translucent backdrop `rgba(17, 24, 39, 0.70)`, blur `16px`, bordered with `1px solid rgba(255, 255, 255, 0.08)`.
- **Level 2 (Active Studio Cards & Modals):** Translucent backdrop `rgba(26, 34, 53, 0.75)`, blur `24px`, bordered with `1px solid rgba(255, 255, 255, 0.12)`, casting shadow: `0 20px 40px -15px rgba(0, 0, 0, 0.5)`.
- **Level 3 (Tooltips & Popovers):** Translucent backdrop `rgba(30, 41, 67, 0.90)`, blur `12px`, border `1px solid rgba(99, 102, 241, 0.3)`.

### Optical Highlights & Luminescence
- Active or focused elements emit a targeted cyan or violet glow: `0 0 20px rgba(6, 182, 212, 0.25)`.
- Cards incorporate a linear gradient border via masking (`1px` top-lit highlight from `rgba(255, 255, 255, 0.2)` fading to `rgba(255, 255, 255, 0.02)` at bottom).

## Shapes

The design system employs smooth, hyper-modern rounded geometries that soften technical density while reinforcing modern hardware silhouettes.

### Radius System
- **Base Components (`rounded-lg` / 1rem / 16px):** Standard inputs, dropdown menus, context menus, and small interactive buttons.
- **Card Containers & Modules (`rounded-2xl` / 1.5rem / 24px):** Primary UI cards, inspector panels, video preview viewports, dynamic QR code containers.
- **Floating Modals & Sheets (`rounded-3xl` / 2rem / 32px):** Mobile bottom modal sheets, floating hub dialogs, and hero showcase surfaces.
- **Pills (`rounded-full`):** Status indicators, scanning tag chips, live indicators, and primary pill action buttons.

## Components

### Buttons
- **Primary Action:** Pill-shaped (`rounded-full`), dynamic linear gradient background (`135deg, #6366F1 0%, #8B5CF6 100%`), white text, subtle inner top edge highlight (`inset 0 1px 1px rgba(255, 255, 255, 0.3)`). Hover: ambient glow `0 0 24px rgba(99, 102, 241, 0.45)`.
- **Secondary / Ghost:** `rounded-full`, backdrop blur surface `rgba(255, 255, 255, 0.05)`, border `1px solid rgba(255, 255, 255, 0.12)`, text `#E2E8F0`. Hover: border `rgba(99, 102, 241, 0.5)`.
- **Tertiary Utility:** Pure text/icon button, transparent, cyan text on hover.

### Dynamic QR & Video Preview Cards
- **Structure:** `rounded-2xl`, background `rgba(17, 24, 39, 0.65)`, backdrop filter blur `16px`, dual-stroke border highlight.
- **QR Viewport:** Embedded high-contrast canvas with rounded inner corners (`12px`), bordered by animated cyan scanning guides.
- **Video Surface:** 16:9 or 9:16 aspect ratio container with soft inner vignette and floating pill overlay controls.

### Input Fields & Controls
- **Inputs:** `rounded-lg`, height `48px`, background `rgba(10, 15, 29, 0.8)`, border `1px solid rgba(255, 255, 255, 0.1)`. Typography: `body-md` in `#F8FAFC`.
- **Focus State:** Border transitions to `#6366F1`, accented by subtle cyan focus aura (`0 0 0 3px rgba(6, 182, 212, 0.2)`).
- **Sliders & Scrubbers:** Custom obsidian track with neon cyan filled track progress and violet glow grab-handles.

### Chips & Badges
- **Status Chips:** `rounded-full`, padding `4px 12px`, background `rgba(6, 182, 212, 0.12)`, text `#06B6D4`, border `1px solid rgba(6, 182, 212, 0.25)`. Includes dynamic pulsating 6px dot for live QR destinations.

### Lists & Navigation
- **Sidebar & Navigation:** Vertical tab layout with liquid indicator pills. Active tab receives glass highlight (`rgba(255, 255, 255, 0.08)`) and electric violet left accent bar.
- **Mobile Navigation:** Floating bottom frosted glass bar with elevated center scan/action button.