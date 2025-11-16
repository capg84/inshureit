"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = __importDefault(require("./config/env"));
const errorHandler_1 = require("./middleware/errorHandler");
// Import routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const quote_routes_1 = __importDefault(require("./routes/quote.routes"));
const download_routes_1 = __importDefault(require("./routes/download.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// CORS configuration
app.use((0, cors_1.default)({
    origin: env_1.default.cors.allowedOrigins,
    credentials: true,
}));
// Request parsing middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Logging middleware
if (env_1.default.nodeEnv === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
else {
    app.use((0, morgan_1.default)('combined'));
}
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        data: {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            environment: env_1.default.nodeEnv,
        },
    });
});
// API Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/quotes', quote_routes_1.default);
app.use('/api/downloads', download_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/contact', contact_routes_1.default);
// 404 handler
app.use(errorHandler_1.notFoundHandler);
// Error handler
app.use(errorHandler_1.errorHandler);
// Start server
const port = env_1.default.port;
app.listen(port, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   InshureIt API Server                                    ║
║                                                           ║
║   Environment: ${env_1.default.nodeEnv.padEnd(45)}║
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
exports.default = app;
//# sourceMappingURL=index.js.map