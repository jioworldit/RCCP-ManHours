# RCCP Man-Hours Calculator - UI Mockups

## Overview
This package contains **5 desktop UI mockups** for the RCCP (Resource Capacity Planning) Man-Hours Calculator application.

## Files Included

### Design Documentation
- **DESIGN.md** - Complete design system with color palette, typography, and component specs

### Screen Mockups (HTML)
Open any of these files in a web browser to view the mockups:

| Screen | File | Description |
|--------|------|-------------|
| 1. Project | `screen-1-project.html` | Project details form (number, name, client, location) |
| 2. Scope | `screen-2-scope.html` | Scope selection with 9 checkbox items |
| 3. Technical | `screen-3-technical.html` | Technical specs (thickness, material, diameter, etc.) |
| 4. Activities | `screen-4-activities.html` | Activity grid with Qty, Base Hrs, Factor, Total Hrs |
| 5. Results | `screen-5-results.html` | Calculation results with breakdown chart |

## Quick Start
```bash
# Option 1: Open files directly in browser
open screen-1-project.html

# Option 2: Start local server
cd rccp-design
python3 -m http.server 8080
# Then visit: http://localhost:8080/screen-1-project.html
```

## Key Features Implemented

### 1. Stepper Navigation
- 5-step progress indicator
- Visual states: pending → active → completed
- Clear step labels and connector lines

### 2. Scope Selection
- 9 activities with icons and descriptions
- Checkbox selection with visual feedback
- Select All functionality
- Selected count indicator

### 3. Technical Input Form
- Key fields: Thickness, Material Grade, Diameter, Nozzles, Weld Length
- Material grade dropdown (CS, SS304, SS316, Duplex, etc.)
- Quick-select chips for common values
- Input validation styling

### 4. Activity Calculation Grid
- Table with: Activity | Qty | Base Hrs | Factor | Total Hrs
- Editable quantity inputs
- Factor dropdown for complexity multipliers
- Real-time total calculation
- Row selection checkboxes

### 5. Results Dashboard
- Summary card with total hours
- Visual breakdown with progress bars
- Activity distribution percentages
- Export options (Excel, Print, Email)

## Color Scheme

| Purpose | Hex | Usage |
|---------|-----|-------|
| Primary | `#2563EB` | Buttons, active states, links |
| Primary Dark | `#1D4ED8` | Hover states |
| Success | `#22C55E` | Completed steps, success messages |
| Background | `#F9FAFB` | Page background |
| Card | `#FFFFFF` | Card backgrounds |
| Text Primary | `#1F2937` | Headings, primary text |
| Text Secondary | `#6B7280` | Labels, descriptions |
| Border | `#E5E7EB` | Input borders, dividers |

## Typography
- **Font**: Inter (system fallback)
- **Headings**: 600 weight
- **Body**: 400 weight
- **Scale**: 12px (caption) → 48px (display)

## Responsive Design
- Primary target: Desktop (1024px+)
- Fluid layout with max-width containers
- Mobile-ready form elements

## Design Principles
1. **Clarity First**: Every element has a clear purpose
2. **Progressive Disclosure**: Show only what's needed at each step
3. **Consistent Feedback**: Visual states for all interactions
4. **Efficiency**: Minimize clicks, maximize information density

---
*Generated for RCCP Man-Hours Phase 2 - Focused Design Sprint*
*Delivery Date: February 15, 2025*
