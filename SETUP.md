# InshureIt - Setup Guide

Complete setup guide for the InshureIt Insurance Lead Generation Application.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **MySQL** 8.0+ database server
- **Git** for version control

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/capg84/inshureit.git
cd inshureit
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for all workspaces (client, server, shared).

### 3. Database Setup

#### Create MySQL Database

```sql
CREATE DATABASE inshureit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'inshureit_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON inshureit.* TO 'inshureit_user'@'localhost';
FLUSH PRIVILEGES;
```

#### Configure Environment Variables

**Server (.env)**

Create `server/.env` based on `server/.env.example`:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and update:

```env
DATABASE_URL="mysql://inshureit_user:your_secure_password@localhost:3306/inshureit"
JWT_SECRET="your-very-secret-jwt-key-change-this"
PORT=5000
NODE_ENV=development

# Password Policy
MIN_PASSWORD_LENGTH=8
REQUIRE_UPPERCASE=true
REQUIRE_LOWERCASE=true
REQUIRE_NUMBER=true
REQUIRE_SPECIAL_CHAR=true

# CORS
ALLOWED_ORIGINS=http://localhost:5173,https://localhost:5173

# File Storage
EXPORT_DIRECTORY=./exports
MAX_FILE_SIZE_MB=10
```

**Client (.env)**

Create `client/.env` based on `client/.env.example`:

```bash
cd client
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=InshureIt
VITE_APP_VERSION=1.0.0
```

### 4. Initialize Database

Run Prisma migrations to create database tables:

```bash
cd server
npm run db:push
```

### 5. Seed Database

Create the initial admin user:

```bash
npx prisma db seed
```

**Default Admin Credentials:**
- **Email:** admin@inshureit.com
- **Password:** Admin@123

⚠️ **IMPORTANT:** Change this password immediately after first login!

## Running the Application

### Development Mode

From the root directory:

```bash
# Run both client and server
npm run dev

# Or run separately:
npm run dev:server  # Backend only (port 5000)
npm run dev:client  # Frontend only (port 5173)
```

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/health

## Database Management

### Prisma Studio (Database GUI)

```bash
cd server
npm run db:studio
```

This opens a web interface at http://localhost:5555 to view and edit database records.

### Reset Database

```bash
cd server
npx prisma migrate reset
npm run db:push
npx prisma db seed
```

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/logout` | Logout user | Authenticated |
| POST | `/api/auth/change-password` | Change password | Authenticated |
| GET | `/api/auth/verify` | Verify token | Authenticated |

### Quote Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/quotes` | Submit quote | Public |
| GET | `/api/quotes` | Get all quotes | Backoffice |
| GET | `/api/quotes/new` | Get new quotes | Backoffice |

### Download Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/downloads/new` | Download new quotes as Excel | Backoffice |
| GET | `/api/downloads` | Get download history | Backoffice |
| GET | `/api/downloads/:id/file` | Re-download a file | Backoffice |

### User Management Endpoints (Admin Only)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users` | Create user | Admin |
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get specific user | Admin |
| PUT | `/api/users/:id` | Update user | Admin |
| POST | `/api/users/:id/deactivate` | Deactivate user | Admin |
| POST | `/api/users/:id/reset-password` | Reset password | Admin |
| GET | `/api/users/search` | Search users | Admin |

## Testing the API

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@inshureit.com","password":"Admin@123"}'
```

**Submit Quote:**
```bash
curl -X POST http://localhost:5000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "insuranceType":"SOLO",
    "title":"Mr",
    "firstName":"John",
    "lastName":"Doe",
    "dateOfBirth":"1990-01-01",
    "email":"john@example.com",
    "mobile":"07123456789",
    "postcode":"SW1A 1AA",
    "smokingStatus":false,
    "coverageAmount":100000,
    "coveragePeriod":20
  }'
```

## Project Structure

```
inshureit/
├── client/               # React frontend
│   ├── src/
│   └── package.json
├── server/               # Express backend
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Express middleware
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Utility functions
│   │   └── index.ts     # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma # Database schema
│   │   └── seed.ts       # Database seeding
│   └── package.json
├── shared/               # Shared types and utilities
│   ├── src/
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   └── validation.ts
│   └── package.json
└── requirement/          # Business requirements
```

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

1. Verify MySQL is running:
   ```bash
   mysql -u root -p
   ```

2. Check `DATABASE_URL` in `server/.env` is correct

3. Ensure the database exists and user has permissions

### Port Already in Use

If port 5000 or 5173 is already in use:

1. Change `PORT` in `server/.env`
2. Update `VITE_API_URL` in `client/.env` accordingly

### Prisma Generate Errors

If you encounter Prisma client errors:

```bash
cd server
npm run db:generate
```

## Production Deployment

### Environment Variables

Ensure all production environment variables are set:

- `NODE_ENV=production`
- `JWT_SECRET` - Use a strong, randomly generated secret
- `DATABASE_URL` - Production database connection
- `ALLOWED_ORIGINS` - Your production frontend URL

### Build

```bash
# Build server
cd server
npm run build

# Build client
cd client
npm run build
```

### SSL/HTTPS

For production, ensure:
- HTTPS is configured via reverse proxy (nginx, Apache)
- SSL certificates are properly installed
- `ALLOWED_ORIGINS` uses https://

## Support

For issues or questions:
- Check the BRS document in `requirement/` folder
- Review API documentation above
- Check application logs

## Security Notes

1. **Change default admin password immediately**
2. **Use strong JWT_SECRET in production**
3. **Enable HTTPS in production**
4. **Regularly backup the database**
5. **Keep dependencies updated**
6. **Review and customize password policy as needed**
