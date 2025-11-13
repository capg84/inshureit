# InshureIt - Insurance Product Lead Generation Application

A web application for comparing and generating leads for life insurance products.

## Overview

InshureIt is a Phase 1 lead generation application focusing on life insurance products. The application allows customers to obtain quotes for Solo (individual) and Joint (couples) life insurance policies.

## Features

### Customer Features
- View and select life insurance types (Solo or Joint)
- Complete guided quote forms
- Submit information for insurance advisor contact

### Backoffice Features
- Secure login with encrypted passwords
- Download new quote data as .xlsx files
- View historical downloads
- Password management

### Admin Features
- All backoffice features
- Add new users with auto-generated passwords
- Modify existing users
- Deactivate users
- Reset user passwords

## Tech Stack

- **Frontend**: React with TypeScript
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Authentication**: JWT with bcrypt
- **File Generation**: ExcelJS
- **Styling**: Tailwind CSS

## Project Structure

```
inshureit/
├── client/           # React frontend
├── server/           # Express backend
├── shared/           # Shared types/interfaces
├── database/         # MySQL schema and migrations
└── requirement/      # Business requirements documentation
```

## Security

- HTTPS protocol enforced
- Encrypted password storage (bcrypt)
- Encrypted client-server communication
- JWT-based authentication
- Session management with forced logout capabilities

## Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/capg84/inshureit.git
   cd inshureit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL database**
   ```sql
   CREATE DATABASE inshureit;
   ```

4. **Configure environment**
   ```bash
   # Server
   cd server
   cp .env.example .env
   # Edit .env with your database credentials and JWT secret

   # Client
   cd ../client
   cp .env.example .env
   ```

5. **Initialize database**
   ```bash
   cd ../server
   npm run db:push
   npx prisma db seed
   ```

6. **Start development servers**
   ```bash
   cd ..
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000
   - Default admin: admin@inshureit.com / Admin@123

## Documentation

📖 **Development**
- [SETUP.md](SETUP.md) - Detailed development setup
- [DEVELOPMENT.md](DEVELOPMENT.md) - Development guide and architecture

🚀 **Deployment**
- [QUICK-DEPLOY.md](QUICK-DEPLOY.md) - Fast deployment guide (Docker)
- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete production deployment guide

## Production Deployment

Ready to deploy to production? We support multiple hosting options:

- **Docker** (Recommended): One-command deployment with `./scripts/deploy.sh`
- **VPS/Cloud**: DigitalOcean, AWS, Google Cloud, Linode
- **PaaS**: Railway, Heroku, Render
- **Managed**: AWS ECS, Google Cloud Run

See [QUICK-DEPLOY.md](QUICK-DEPLOY.md) to get started in 5 minutes!

## License

Proprietary - Limit Unlimited Technologies Ltd
