# RCCP Man-Hours - Design System

**Date:** 15 Feb 2026  
**Designer:** Captain Stitch  
**Tool:** Figma + HTML Prototypes

---

## 1. COLOR PALETTE

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Blue** | #2563EB | Buttons, links, active states |
| **Primary Dark** | #1D4ED8 | Hover states |
| **Primary Light** | #DBEAFE | Backgrounds, badges |

### Secondary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| **Success Green** | #22C55E | Completed status, success messages |
| **Warning Yellow** | #EAB308 | Draft status, cautions |
| **Error Red** | #EF4444 | Errors, delete actions |
| **Info Purple** | #A855F7 | Info states |

### Neutral Colors
| Color | Hex | Usage |
|-------|-----|-------|
| **Black** | #111827 | Headings, primary text |
| **Gray 800** | #1F2937 | Body text |
| **Gray 600** | #4B5563 | Secondary text |
| **Gray 400** | #9CA3AF | Placeholder text |
| **Gray 200** | #E5E7EB | Borders, dividers |
| **Gray 100** | #F3F4F6 | Backgrounds |
| **White** | #FFFFFF | Card backgrounds |

### Gradient (Login Page)
```css
background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0F172A 100%);
```

---

## 2. TYPOGRAPHY

### Font Family
**Primary:** Inter (Google Fonts)  
**Weights:** 300, 400, 500, 600, 700

### Type Scale
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Page Title) | 24px | 700 (Bold) | 1.2 |
| H2 (Section) | 20px | 600 (Semibold) | 1.3 |
| H3 (Card Title) | 18px | 600 (Semibold) | 1.4 |
| Body Large | 16px | 400 (Regular) | 1.5 |
| Body | 14px | 400 (Regular) | 1.5 |
| Small | 12px | 400 (Regular) | 1.5 |
| Label | 14px | 500 (Medium) | 1.4 |
| Button | 14px | 600 (Semibold) | 1 |

---

## 3. SPACING SYSTEM

### Base Unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Tight spacing |
| space-2 | 8px | Small gaps |
| space-3 | 12px | Default padding |
| space-4 | 16px | Card padding |
| space-5 | 20px | Section gaps |
| space-6 | 24px | Large gaps |
| space-8 | 32px | Page sections |
| space-10 | 40px | Major sections |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| rounded-sm | 4px | Small elements |
| rounded | 8px | Buttons, inputs |
| rounded-lg | 12px | Cards |
| rounded-xl | 16px | Modals |
| rounded-full | 9999px | Pills, avatars |

---

## 4. COMPONENTS

### 4.1 Buttons

**Primary Button**
```css
background-color: #2563EB;
color: #FFFFFF;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 14px;
/* Hover */
background-color: #1D4ED8;
/* Disabled */
opacity: 0.5;
```

**Secondary Button**
```css
background-color: transparent;
color: #2563EB;
border: 1px solid #2563EB;
padding: 12px 24px;
border-radius: 8px;
/* Hover */
background-color: #DBEAFE;
```

**Danger Button**
```css
background-color: #EF4444;
color: #FFFFFF;
/* Hover */
background-color: #DC2626;
```

### 4.2 Cards

**Standard Card**
```css
background-color: #FFFFFF;
border-radius: 12px;
box-shadow: 0 1px 3px rgba(0,0,0,0.1);
padding: 24px;
```

**Hover State**
```css
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
transform: translateY(-2px);
transition: all 0.2s ease;
```

### 4.3 Form Inputs

**Text Input**
```css
width: 100%;
padding: 12px 16px;
border: 1px solid #E5E7EB;
border-radius: 8px;
font-size: 14px;
/* Focus */
border-color: #2563EB;
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
outline: none;
/* Error */
border-color: #EF4444;
```

**Select Dropdown**
```css
/* Same as text input */
appearance: none;
background-image: url('dropdown-arrow.svg');
background-repeat: no-repeat;
background-position: right 12px center;
```

### 4.4 Tables

**Data Table**
```css
/* Header */
background-color: #F9FAFB;
font-weight: 500;
text-transform: uppercase;
font-size: 12px;
color: #6B7280;

/* Row */
border-bottom: 1px solid #E5E7EB;
/* Hover */
background-color: #F9FAFB;
```

### 4.5 Status Badges

```css
/* Active */
background-color: #DBEAFE;
color: #1D4ED8;
padding: 4px 12px;
border-radius: 9999px;
font-size: 12px;
font-weight: 600;

/* Completed */
background-color: #D1FAE5;
color: #047857;

/* Draft */
background-color: #FEF3C7;
color: #B45309;

/* Cancelled */
background-color: #FEE2E2;
color: #B91C1C;
```

### 4.6 Progress Stepper

```css
/* Active Step */
.circle {
  width: 32px;
  height: 32px;
  background-color: #2563EB;
  color: #FFFFFF;
  border-radius: 9999px;
}

/* Completed Step */
.circle {
  background-color: #22C55E;
}

/* Connector Line */
.line {
  height: 2px;
  background-color: #22C55E; /* Completed */
  background-color: #E5E7EB; /* Pending */
}
```

---

## 5. LAYOUT PRINCIPLES

### Container
```css
max-width: 1280px;
margin: 0 auto;
padding-left: 16px;
padding-right: 16px;
```

### Grid System
- 12-column grid
- Gap: 24px
- Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Page Structure
```
┌─────────────────────────────┐
│          Header             │
│    (Logo + Nav + User)      │
├─────────────────────────────┤
│        Stepper              │
│   (Progress Indicator)      │
├─────────────────────────────┤
│                             │
│         Content             │
│       (Main Form/Table)     │
│                             │
├─────────────────────────────┤
│    Action Buttons           │
│  (Back + Save + Continue)   │
└─────────────────────────────┘
```

---

## 6. SCREEN-SPECIFIC DESIGNS

### Login Screen
- Dark gradient background (#0F172A to #1E3A8A)
- Centered white card
- Logo at top
- Social login buttons (optional)
- "Remember me" checkbox
- "Forgot password" link
- Sign up link at bottom

### Dashboard
- White header with shadow
- Stats cards (4 columns)
- Search + filter bar
- Data table with pagination
- "New Project" CTA button

### Project Entry
- Stepper showing progress
- Form card with sections
- Product type selector
- Technical parameters grid
- Save/Continue buttons

### Components Screen
- Tabbed interface (5 tabs)
- Editable data table
- Add/Delete row buttons
- Inline editing

### Scope Selection
- Hierarchical tree
- Expand/collapse
- Checkboxes with partial state
- Progress counter
- Template save/load

### Activities Grid
- Compact data table
- Inline editing (double-click)
- Real-time calculations
- Summary bar at top
- Add/Delete rows

### Results Screen
- Summary cards (4)
- Pie chart (Chart.js)
- Progress bars
- Detailed breakdown table
- Export buttons

---

## 7. RESPONSIVE BREAKPOINTS

### Mobile (< 640px)
- Single column layout
- Stacked form fields
- Hamburger menu
- Simplified tables (horizontal scroll)
- Touch-friendly buttons (min 44px)

### Tablet (640px - 1024px)
- 2-column grids
- Side navigation
- Full tables with horizontal scroll if needed

### Desktop (> 1024px)
- Full multi-column layouts
- All features visible
- Optimized for mouse/keyboard

---

## 8. ACCESSIBILITY

### Color Contrast
- All text meets WCAG AA (4.5:1 ratio)
- Large text (18px+) meets AA Large (3:1 ratio)

### Focus States
- Visible focus ring on all interactive elements
- 2px solid blue (#2563EB) outline
- Offset: 2px

### Keyboard Navigation
- Tab order follows visual order
- Enter/Space activates buttons
- Arrow keys for dropdowns
- Escape closes modals

### Screen Readers
- Semantic HTML elements
- ARIA labels where needed
- Alt text for icons

---

## 9. ANIMATIONS

### Transitions
```css
/* Standard */
transition: all 0.2s ease-in-out;

/* Button hover */
transition: background-color 0.15s ease, transform 0.1s ease;

/* Card hover */
transition: box-shadow 0.2s ease, transform 0.2s ease;
```

### Micro-interactions
- Button press: scale(0.98)
- Card lift: translateY(-2px)
- Input focus: border color + shadow
- Checkbox: smooth check animation

---

## 10. ICONS

### Icon Library
**Heroicons** (outline style)
- Size: 20px (default), 24px (large)
- Stroke width: 2
- Color: inherit from text

### Common Icons
- Home (dashboard)
- Plus (add)
- Trash (delete)
- Pencil (edit)
- Check (success)
- X (close/error)
- ChevronRight (navigation)
- Download (export)
- Calendar (date)
- User (profile)

---

## 11. EXPORT SPECIFICATIONS

### Figma Export
- Frames: 1440px width (desktop)
- Components: Organized in library
- Styles: Published to team
- Prototype: Interactive flows

### HTML Prototypes
- All 8 screens implemented
- Tailwind CSS for styling
- Responsive design
- Clickable navigation
- Located in: `02-DESIGN/*.html`

---

**Design System Complete**  
**Ready for Phase 3: Development**