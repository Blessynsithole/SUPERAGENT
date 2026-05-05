# Liquid Home Backend API

Backend API for the Liquid Home Zimbabwe Super Agent Portal.

## Features

- **Authentication**: JWT-based authentication with role-based access
- **Ticket Management**: CRUD operations for support tickets
- **AI Assistant**: Scenario-based guidance system
- **DNS Management**: DNS record management
- **Database**: PostgreSQL with Prisma ORM
- **Security**: Helmet, CORS, input validation

## Tech Stack

- Node.js + Express.js
- TypeScript
- PostgreSQL + Prisma ORM
- JWT Authentication
- bcrypt for password hashing

## Database Setup

### Prerequisites
- PostgreSQL database (local or cloud)
- Node.js 18+

### Setup Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL
   ```

3. **Set up database**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push
   ```

4. **Optional: Create migration**
   ```bash
   npm run db:migrate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Database Schema

### Users
- **id**: Unique identifier
- **email**: Unique email address
- **password**: Hashed password
- **name**: Full name
- **role**: AGENT | SUPERVISOR | ADMIN
- **status**: ACTIVE | INACTIVE

### Tickets
- **id**: Unique identifier
- **title**: Ticket title
- **description**: Ticket description
- **status**: OPEN | IN_PROGRESS | RESOLVED | ESCALATED
- **priority**: LOW | MEDIUM | HIGH | CRITICAL
- **assignedToId**: Foreign key to User
- **createdById**: Foreign key to User

### DNS Records
- **id**: Unique identifier
- **domain**: Domain name
- **type**: A | CNAME | MX | TXT
- **value**: Record value
- **ttl**: Time to live
- **status**: ACTIVE | INACTIVE

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token

### Tickets
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get ticket by ID
- `POST /api/tickets` - Create new ticket
- `PATCH /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket

### AI Assistant
- `POST /api/ai/ask` - Get guidance

### DNS Management
- `GET /api/dns` - Get DNS records
- `POST /api/dns` - Create DNS record
- `PATCH /api/dns/:id` - Update DNS record
- `DELETE /api/dns/:id` - Delete DNS record

## Default Users

The application automatically creates these default users on first run:

- **Agent**: agent@liquidhome.co.zw / password
- **Supervisor**: supervisor@liquidhome.co.zw / password
- **Admin**: admin@liquidhome.co.zw / password

## Development

### Database Management
```bash
# View database in browser
npm run db:studio

# Reset database
npm run db:push -- --force-reset

# Generate client after schema changes
npm run db:generate
```

### Testing
```bash
npm test
```

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Use a production PostgreSQL database
3. Set strong `JWT_SECRET`
4. Configure proper CORS origins
5. Enable database connection pooling if needed

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode
- `FRONTEND_URL`: Frontend URL for CORS