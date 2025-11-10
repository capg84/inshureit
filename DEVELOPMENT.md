# InshureIt - Development Guide

Complete guide for developers working on the InshureIt application.

## 🎉 Project Status: COMPLETE

All features from the BRS (Business Requirements Specification) have been fully implemented and tested.

## Architecture Overview

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- React Router v6 for routing
- Zustand for state management
- Axios for HTTP requests
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tooling

**Backend:**
- Node.js with Express
- TypeScript
- Prisma ORM
- MySQL database
- JWT authentication
- bcrypt for password hashing
- ExcelJS for exports

**Shared:**
- TypeScript types and utilities
- Validation functions
- Constants and enums

## Project Structure

```
inshureit/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   ├── customer/  # Customer-facing pages
│   │   │   ├── backoffice/# Backoffice pages
│   │   │   └── admin/     # Admin pages
│   │   ├── services/      # API service layer
│   │   ├── store/         # Zustand state management
│   │   ├── App.tsx        # Main app component with routes
│   │   └── main.tsx       # Entry point
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/        # Configuration
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # Route definitions
│   │   ├── utils/         # Utility functions
│   │   └── index.ts       # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── seed.ts        # Database seeding
│   └── package.json
└── shared/                 # Shared code
    └── src/
        ├── types.ts       # TypeScript interfaces
        ├── constants.ts   # Application constants
        └── validation.ts  # Validation utilities
```

## User Stories Implementation

### ✅ Customer User Stories

1. **Homepage Access**
   - File: `client/src/pages/customer/HomePage.tsx`
   - User sees insurance types (Solo/Joint)
   - Trust badges and benefits displayed
   - Clean, responsive design

2. **Quote Submission**
   - File: `client/src/pages/customer/QuoteFormPage.tsx`
   - Dynamic form based on insurance type
   - Comprehensive validation
   - Partner details for joint insurance
   - Success confirmation message

### ✅ Backoffice User Stories

1. **Authentication**
   - File: `client/src/pages/backoffice/LoginPage.tsx`
   - Secure login with JWT
   - Password validation
   - Session management

2. **Dashboard**
   - File: `client/src/pages/backoffice/DashboardPage.tsx`
   - New quotes overview
   - Quick stats display
   - Recent quotes table

3. **Download Management**
   - File: `client/src/pages/backoffice/DownloadsPage.tsx`
   - Download new quotes as Excel
   - View download history
   - Re-download previous files
   - Quote status tracking

4. **Password Management**
   - File: `client/src/pages/backoffice/ChangePasswordPage.tsx`
   - Force change on first login
   - Password policy enforcement
   - Validation and error handling

### ✅ Admin User Stories

1. **User Management**
   - File: `client/src/pages/admin/UsersPage.tsx`
   - View all users
   - Search functionality
   - Deactivate users
   - Reset passwords

2. **Create Users**
   - File: `client/src/pages/admin/CreateUserPage.tsx`
   - Auto-generated passwords
   - Email validation
   - User type selection
   - Display temporary password

3. **Edit Users**
   - File: `client/src/pages/admin/EditUserPage.tsx`
   - Update user details
   - Change user type
   - Forced logout on downgrade

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/change-password` - Change password
- `GET /api/auth/verify` - Verify token

### Quotes
- `POST /api/quotes` - Submit quote (public)
- `GET /api/quotes` - Get all quotes (backoffice)
- `GET /api/quotes/new` - Get new quotes (backoffice)

### Downloads
- `POST /api/downloads/new` - Download new quotes
- `GET /api/downloads` - Get download history
- `GET /api/downloads/:id/file` - Download file

### Users (Admin only)
- `POST /api/users` - Create user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id` - Update user
- `POST /api/users/:id/deactivate` - Deactivate user
- `POST /api/users/:id/reset-password` - Reset password
- `GET /api/users/search` - Search users

## Development Workflow

### Starting Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Server
   cd server
   cp .env.example .env
   # Edit .env with your settings

   # Client
   cd ../client
   cp .env.example .env
   ```

3. **Initialize database:**
   ```bash
   cd server
   npm run db:push
   npx prisma db seed
   ```

4. **Start development servers:**
   ```bash
   # From root directory
   npm run dev
   ```

   This starts:
   - Backend: http://localhost:5000
   - Frontend: http://localhost:5173

### Making Changes

**Backend Changes:**
1. Modify files in `server/src/`
2. Server auto-restarts with tsx watch
3. Test with Postman or frontend

**Frontend Changes:**
1. Modify files in `client/src/`
2. Vite hot-reloads changes automatically
3. Check browser console for errors

**Database Changes:**
1. Edit `server/prisma/schema.prisma`
2. Run `npm run db:push` in server directory
3. Regenerate Prisma client

### Code Style

**TypeScript:**
- Strict mode enabled
- No explicit `any` (only when necessary)
- Proper typing for all functions
- Interface over type when possible

**React:**
- Functional components only
- TypeScript for all components
- Props interfaces defined
- Descriptive component names

**CSS:**
- Tailwind utility classes
- Custom components in `index.css`
- Responsive design mobile-first

## Testing

### Manual Testing Checklist

**Customer Flow:**
- [ ] Homepage loads correctly
- [ ] Solo insurance form works
- [ ] Joint insurance form works
- [ ] Form validation works
- [ ] Quote submission succeeds
- [ ] Success message displays

**Backoffice Flow:**
- [ ] Login with correct credentials
- [ ] Login fails with wrong credentials
- [ ] Dashboard shows new quotes
- [ ] Download new quotes works
- [ ] Excel file downloads correctly
- [ ] Download history displays
- [ ] Re-download works
- [ ] Password change works
- [ ] Logout works

**Admin Flow:**
- [ ] Create new user works
- [ ] Temporary password displays
- [ ] User list displays
- [ ] Search users works
- [ ] Edit user works
- [ ] Deactivate user works
- [ ] Reset password works
- [ ] User type change triggers logout

## Common Issues and Solutions

### Database Connection Errors

**Problem:** Cannot connect to MySQL
**Solution:**
1. Check MySQL is running: `mysql -u root -p`
2. Verify DATABASE_URL in `.env`
3. Ensure database exists
4. Check user permissions

### Port Already in Use

**Problem:** Port 5000 or 5173 in use
**Solution:**
1. Change PORT in `server/.env`
2. Update VITE_API_URL in `client/.env`
3. Or kill process using port

### Prisma Client Errors

**Problem:** Prisma client not generated
**Solution:**
```bash
cd server
npm run db:generate
```

### CORS Errors

**Problem:** Frontend can't reach backend
**Solution:**
1. Check ALLOWED_ORIGINS in `server/.env`
2. Ensure frontend URL is listed
3. Restart backend server

## Security Considerations

### Password Security
- bcrypt with 12 salt rounds
- Strong password policy enforced
- No password in logs
- Encrypted in database

### Authentication
- JWT with expiration
- Token stored in localStorage
- Automatic logout on expiration
- Session tracking in database

### Authorization
- Role-based access control
- Protected routes in frontend
- Middleware validation in backend
- Admin-only endpoints

### Data Protection
- Input validation on all endpoints
- SQL injection prevention (Prisma)
- XSS protection (React escaping)
- CORS configuration
- Helmet.js security headers

## Deployment

### Production Build

**Backend:**
```bash
cd server
npm run build
npm start
```

**Frontend:**
```bash
cd client
npm run build
# Serve dist/ folder with nginx or similar
```

### Environment Variables

Ensure all production variables are set:
- `NODE_ENV=production`
- Strong `JWT_SECRET`
- Production database URL
- HTTPS origins in CORS
- Secure cookie settings

### Database Migration

```bash
# Production database setup
cd server
npm run db:push
npx prisma db seed
```

## Contributing

1. Create feature branch from `main`
2. Make changes with clear commits
3. Test thoroughly
4. Push and create pull request
5. Wait for review

## Support

For issues:
1. Check this documentation
2. Review BRS document
3. Check GitHub issues
4. Create new issue with details

## License

Proprietary - Limit Unlimited Technologies Ltd
