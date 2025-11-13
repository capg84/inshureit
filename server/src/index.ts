import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config/env';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Import routes
import authRoutes from './routes/auth.routes';
import quoteRoutes from './routes/quote.routes';
import downloadRoutes from './routes/download.routes';
import userRoutes from './routes/user.routes';
import contactRoutes from './routes/contact.routes';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: config.cors.allowedOrigins,
    credentials: true,
  })
);

// Request parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Start server
const port = config.port;

app.listen(port, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   InshureIt API Server                                    ║
║                                                           ║
║   Environment: ${config.nodeEnv.padEnd(45)}║
║   Port:        ${port.toString().padEnd(45)}║
║   URL:         http://localhost:${port.toString().padEnd(31)}║
║                                                           ║
║   Status:      Ready to accept requests                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

export default app;
