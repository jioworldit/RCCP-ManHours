# ActivitiesGrid Component

A React component for managing RCCP (Resource-Constrained Capacity Planning) activities with inline editing, real-time calculations, and API integration.

## Features

✅ **Data Table with 10 Columns**
- Activity Code
- Description
- Component (Scope Type)
- Quantity
- Unit
- Base Hours
- Difficulty Factor
- Efficiency Factor
- Total Hours (calculated)
- Crew Size
- Duration (days)
- Welding Process
- Actions

✅ **Inline Editing**
- Double-click any cell to edit
- Dropdown selects for enumerated values
- Number inputs for numeric fields
- Text inputs for descriptions

✅ **Real-Time Calculation**
- Total Hours = (Base Hours × Quantity × Difficulty) / Efficiency
- Duration = Total Hours / (Crew Size × 8)
- Updates instantly as you type

✅ **Add/Delete Rows**
- Add new manual activities
- Delete activities with confirmation
- Auto-generated activity codes

✅ **API Integration**
- Connects to RCCP calculation API
- Generate activities from project scope
- CRUD operations for activities
- Bulk save functionality

## File Structure

```
src/
├── components/
│   ├── ActivitiesGrid.jsx      # Main component with API
│   ├── ActivitiesGrid.css      # Component styles
│   ├── ActivitiesGridMock.jsx  # Mock data version for testing
│   └── index.js                # Component exports
├── services/
│   └── api.js                  # API service layer
├── App.js                      # App entry point
└── App.css                     # App styles
```

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Usage

### With API Backend

```jsx
import ActivitiesGrid from './components/ActivitiesGrid';

function App() {
  const projectId = 'your-project-id';
  
  return (
    <div className="App">
      <ActivitiesGrid projectId={projectId} />
    </div>
  );
}
```

### With Mock Data (Demo Mode)

```jsx
import { ActivitiesGridMock } from './components';

function App() {
  return (
    <div className="App">
      <ActivitiesGridMock />
    </div>
  );
}
```

## API Endpoints

The component expects the following API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/:id/activities` | Get all activities |
| POST | `/api/projects/:id/activities/generate` | Generate from scope |
| POST | `/api/projects/:id/activities` | Add manual activity |
| PATCH | `/api/activities/:id` | Update activity |
| PATCH | `/api/projects/:id/activities` | Bulk update |
| DELETE | `/api/activities/:id` | Delete activity |

## Component Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| projectId | string | Yes | The project ID to load activities for |

## User Interactions

### Editing
1. **Double-click** any cell to enter edit mode
2. Make changes - calculations update in real-time
3. Click ✓ to save or ✕ to cancel
4. Click edit (✎) or delete (🗑) buttons for actions

### Adding Rows
1. Click "+ Add Row" button
2. New row appears in edit mode
3. Fill in values (calculations auto-update)
4. Click ✓ to save

### Generating Activities
1. Click "🔄 Generate" button
2. Activities are created from project scope via API
3. Existing auto-generated activities are replaced

### Saving
1. Individual rows save on ✓ click
2. "💾 Save All" saves all activities in bulk
3. Changes persist to backend API

## Calculation Logic

```
Total Hours = (Base Hours × Quantity × Difficulty Factor) / Efficiency Factor
Duration (days) = Total Hours / (Crew Size × 8 hours/day)
```

## Styling

The component uses CSS with:
- Responsive design
- Sticky headers
- Smooth hover effects
- Color-coded states (editing = yellow highlight)
- Professional color scheme (blues/grays)
- Custom scrollbar styling

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Development

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## License

MIT
