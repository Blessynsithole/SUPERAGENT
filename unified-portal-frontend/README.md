# Liquid Home Zimbabwe - Super Agent Portal

A full-stack web application for customer support agents at Liquid Home Zimbabwe.

## Project Structure

```
unified-portal-frontend/
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + Express backend
└── README.md         # This file
```

## Features

### Frontend
- **Dashboard**: Real-time stats, AI assistant, product troubleshooting
- **Task Board**: Kanban-style ticket management
- **Records**: Data tables with filtering and search
- **Admin Panel**: User management with role-based access
- **Authentication**: JWT-based login system

### Backend
- **REST API**: Full CRUD operations for tickets, users, DNS
- **Authentication**: JWT tokens with role-based permissions
- **AI Integration**: Scenario-based guidance system
- **Security**: Helmet, CORS, input validation

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Redux Toolkit (state management)
- Tailwind CSS (styling)
- React Router (navigation)
- React Hook Form + Zod (forms & validation)

### Backend
- Node.js + Express.js
- TypeScript- PostgreSQL + Prisma ORM- JWT Authentication
- bcrypt (password hashing)
- Jest (testing)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Blessynsithole/SUPERAGENT.git
   cd unified-portal-frontend
   ```

2. **Database Setup** (choose one option):

   **Option A: Local PostgreSQL**
   ```bash
   # Install PostgreSQL locally
   # Create database: liquidhome_db
   ```

   **Option B: Cloud Database (Recommended)**
   ```bash
   # Use services like:
   # - Railway.app
   # - PlanetScale
   # - Supabase
   # - ElephantSQL
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your DATABASE_URL
   npm run db:generate
   npm run db:push
   npm run dev
   ```

4. **Frontend Setup** (in a new terminal)
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Default Credentials

- **Agent**: agent@liquidhome.co.zw / password
- **Supervisor**: supervisor@liquidhome.co.zw / password
- **Admin**: admin@liquidhome.co.zw / password

## Development

### Running Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
npm start
```

## Deployment

The project includes GitHub Actions workflows for:
- Automated testing on push/PR
- Frontend deployment to GitHub Pages
- Backend testing

## API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Tickets
- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create ticket
- `PATCH /api/tickets/:id` - Update ticket

### AI Assistant
- `POST /api/ai/ask` - Get guidance

### DNS Management
- `GET /api/dns` - Get DNS records
- `POST /api/dns` - Create DNS record

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.