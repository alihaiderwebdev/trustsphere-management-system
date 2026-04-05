# TrustSphere

TrustSphere is a professional React dashboard for managing trust organization operations. The system is designed for clean UI/UX, responsive behavior across devices, and practical day-to-day management workflows.

## Project Purpose

TrustSphere helps organizations manage:
- Donations records
- Beneficiary information
- Events tracking
- Search operations
- Basic organization settings

The dashboard is built with reusable components and a layout system that supports mobile, tablet, laptop, and desktop screens.

## Tech Stack

- React (Vite)
- React Router DOM
- Bootstrap 5
- Local state: `useState`, `useEffect`
- Data persistence: `localStorage`

## Core UI/UX Goals

- Professional admin dashboard look
- Reusable layout (Sidebar + Navbar + Main Content)
- Responsive Bootstrap grid system
- Clean cards, forms, and tables
- Consistent spacing, alignment, and hierarchy

## Pages

- `/` -> Landing
- `/dashboard` -> Dashboard overview
- `/donations` -> Donation form and records
- `/beneficiaries` -> Beneficiaries list
- `/events` -> Events list
- `/search` -> Search data
- `/settings` -> Organization settings

## Project Structure

```text
src/
	components/
		Card.jsx
		Layout.jsx
		Navbar.jsx
		Sidebar.jsx
		Table.jsx
	pages/
		Landing.jsx
		Dashboard.jsx
		Donations.jsx
		Beneficiaries.jsx
		Events.jsx
		Search.jsx
		Settings.jsx
	utils/
		localStorage.js
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Data Handling

- App uses `localStorage` for lightweight client-side persistence.
- Utility helpers are centralized in `src/utils/localStorage.js`.

## Development Notes

- Keep components modular and reusable.
- Prefer Bootstrap classes over heavy custom CSS.
- Use reusable `Card` and `Table` components for consistency.



## License

Proprietary - TrustSphere Organization Management System.