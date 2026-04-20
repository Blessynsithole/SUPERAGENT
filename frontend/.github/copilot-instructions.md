## Liquid Home Zimbabwe - Super Agent Portal

This is a React + TypeScript + Tailwind CSS frontend application for a customer support agent portal.

### Project Structure
- **src/app**: Core application setup (App.tsx, router, auth guard)
- **src/pages**: Main pages (Dashboard, Records, TaskBoard, Admin)
- **src/components**: Reusable components (Troubleshooter, Forms, Widgets, Modals)
- **src/services**: API clients and business logic services
- **src/state**: Redux state management
- **src/utils**: Helper functions, validators, formatters, constants
- **src/styles**: Global styles

### Tech Stack
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Redux Toolkit for state management
- React Router for navigation
- React Hook Form for form handling
- Axios for API calls

### Getting Started
1. Install dependencies: `npm install`
2. Create `.env` file from `.env.example`
3. Start dev server: `npm run dev`
4. Build for production: `npm run build`

### Code Style Guidelines
- Use TypeScript strict mode
- Prefer functional components with hooks
- Keep components focused and single-responsibility
- Use path aliases (@/*) for clean imports
- Handle errors gracefully with user feedback
