# RCCP Man-Hours Calculator - Design System

## Project Overview
Minimal, functional UI for RCCP (Resource Capacity Planning) Man-Hours calculation workflow.

## Color Scheme

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #2563EB | Buttons, active states, links |
| Primary Dark | #1D4ED8 | Button hover, emphasis |
| Primary Light | #DBEAFE | Backgrounds, highlights |

### Neutral Colors
| Color | Hex | Usage |
|-------|-----|-------|
| White | #FFFFFF | Card backgrounds, inputs |
| Gray 50 | #F9FAFB | Page background |
| Gray 100 | #F3F4F6 | Borders, dividers |
| Gray 200 | #E5E7EB | Input borders |
| Gray 400 | #9CA3AF | Placeholder text |
| Gray 600 | #4B5563 | Secondary text |
| Gray 800 | #1F2937 | Primary text, headings |
| Gray 900 | #111827 | Stepper active, strong emphasis |

### Status Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Green 500 | #22C55E | Completed steps, success |
| Green 100 | #DCFCE7 | Completed step background |
| Blue 100 | #DBEAFE | Current step background |
| Amber 500 | #F59E0B | Warning, pending |

## Typography
- **Font Family**: Inter, system-ui, -apple-system, sans-serif
- **Headings**: 600 weight
- **Body**: 400 weight
- **Small/Caption**: 12px, 500 weight

## Spacing System
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

## Component Styles

### Buttons
- **Primary**: bg-#2563EB, text-white, px-4, py-2, rounded-md, hover:bg-#1D4ED8
- **Secondary**: bg-white, border-#E5E7EB, text-#374151, hover:bg-#F9FAFB
- **Disabled**: opacity-50, cursor-not-allowed

### Inputs
- Border: 1px solid #E5E7EB
- Border Radius: 6px
- Padding: 10px 12px
- Focus: border-#2563EB, ring-2 ring-#DBEAFE

### Cards
- Background: white
- Border Radius: 8px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Padding: 24px

### Stepper
- Active: bg-#2563EB, text-white
- Completed: bg-#22C55E, text-white
- Pending: bg-#F3F4F6, text-#9CA3AF, border-#E5E7EB
- Connector: 2px height, gray background

## Responsive Breakpoints
- Desktop: 1024px+ (primary target)
- Tablet: 768px
- Mobile: 640px

## Design Principles
1. **Clarity First**: Every element has a clear purpose
2. **Progressive Disclosure**: Show only what's needed at each step
3. **Consistent Feedback**: Visual states for all interactions
4. **Efficiency**: Minimize clicks, maximize information density
