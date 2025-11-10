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

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8+
- npm or yarn

### Installation

(Instructions will be added as development progresses)

## License

Proprietary - Limit Unlimited Technologies Ltd
