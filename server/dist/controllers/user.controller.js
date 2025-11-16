"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deactivateUser = deactivateUser;
exports.resetPassword = resetPassword;
exports.searchUsers = searchUsers;
const database_1 = __importDefault(require("../config/database"));
const password_1 = require("../utils/password");
const client_1 = require("@prisma/client");
/**
 * Create a new user (Admin only)
 */
async function createUser(req, res) {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'UNAUTHORIZED' },
            });
            return;
        }
        const { email, firstName, lastName, userType } = req.body;
        // Check if user already exists
        const existingUser = await database_1.default.user.findUnique({
            where: { email: email.toLowerCase() },
        });
        if (existingUser) {
            res.status(409).json({
                success: false,
                error: {
                    message: 'A user with this email already exists',
                    code: 'DUPLICATE_EMAIL',
                },
            });
            return;
        }
        // Generate temporary password
        const temporaryPassword = (0, password_1.generateTemporaryPassword)();
        const hashedPassword = await (0, password_1.hashPassword)(temporaryPassword);
        // Create user
        const user = await database_1.default.user.create({
            data: {
                email: email.toLowerCase(),
                firstName,
                lastName,
                password: hashedPassword,
                userType: userType || client_1.UserType.BACKOFFICE,
                createdBy: req.user.userId,
            },
        });
        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userType: user.userType,
                    status: user.status,
                    createdAt: user.createdAt.toISOString(),
                },
                temporaryPassword,
                message: 'User created successfully. Please provide the temporary password to the user.',
            },
        });
    }
    catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'An error occurred while creating user', code: 'INTERNAL_ERROR' },
        });
    }
}
/**
 * Get all users (Admin only)
 */
async function getUsers(req, res) {
    try {
        const users = await database_1.default.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                userType: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        res.json({
            success: true,
            data: users.map((user) => ({
                ...user,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            })),
        });
    }
    catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'An error occurred while fetching users', code: 'INTERNAL_ERROR' },
        });
    }
}
/**
 * Get a specific user (Admin only)
 */
async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = await database_1.default.user.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                userType: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                error: { message: 'User not found', code: 'USER_NOT_FOUND' },
            });
            return;
        }
        res.json({
            success: true,
            data: {
                ...user,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            },
        });
    }
    catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'An error occurred while fetching user', code: 'INTERNAL_ERROR' },
        });
    }
}
/**
 * Update user (Admin only)
 */
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { firstName, lastName, userType } = req.body;
        const user = await database_1.default.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                error: { message: 'User not found', code: 'USER_NOT_FOUND' },
            });
            return;
        }
        // Check if userType is changing from ADMIN to BACKOFFICE
        const userTypeDowngrade = user.userType === client_1.UserType.ADMIN && userType === client_1.UserType.BACKOFFICE;
        // Update user
        const updatedUser = await database_1.default.user.update({
            where: { id: parseInt(id) },
            data: {
                firstName,
                lastName,
                userType,
            },
        });
        // If user type changed from ADMIN to BACKOFFICE, force logout
        if (userTypeDowngrade) {
            await database_1.default.session.deleteMany({
                where: { userId: parseInt(id) },
            });
        }
        res.json({
            success: true,
            data: {
                user: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    userType: updatedUser.userType,
                    status: updatedUser.status,
                    createdAt: updatedUser.createdAt.toISOString(),
                },
                forcedLogout: userTypeDowngrade,
            },
        });
    }
    catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'An error occurred while updating user', code: 'INTERNAL_ERROR' },
        });
    }
}
/**
 * Deactivate user (Admin only)
 */
async function deactivateUser(req, res) {
    try {
        const { id } = req.params;
        const user = await database_1.default.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                error: { message: 'User not found', code: 'USER_NOT_FOUND' },
            });
            return;
        }
        // Deactivate user
        await database_1.default.user.update({
            where: { id: parseInt(id) },
            data: { status: 'DEACTIVATED' },
        });
        // Force logout by deleting all sessions
        await database_1.default.session.deleteMany({
            where: { userId: parseInt(id) },
        });
        res.json({
            success: true,
            data: { message: 'User deactivated successfully' },
        });
    }
    catch (error) {
        console.error('Deactivate user error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'An error occurred while deactivating user', code: 'INTERNAL_ERROR' },
        });
    }
}
/**
 * Reset user password (Admin only)
 */
async function resetPassword(req, res) {
    try {
        const { id } = req.params;
        const user = await database_1.default.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                error: { message: 'User not found', code: 'USER_NOT_FOUND' },
            });
            return;
        }
        // Generate new temporary password
        const temporaryPassword = (0, password_1.generateTemporaryPassword)();
        const hashedPassword = await (0, password_1.hashPassword)(temporaryPassword);
        // Update password and set mustChangePassword flag
        await database_1.default.user.update({
            where: { id: parseInt(id) },
            data: {
                password: hashedPassword,
                mustChangePassword: true,
            },
        });
        // Force logout by deleting all sessions
        await database_1.default.session.deleteMany({
            where: { userId: parseInt(id) },
        });
        res.json({
            success: true,
            data: {
                temporaryPassword,
                message: 'Password reset successfully. Please provide the temporary password to the user.',
            },
        });
    }
    catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'An error occurred while resetting password', code: 'INTERNAL_ERROR' },
        });
    }
}
/**
 * Search users (Admin only)
 */
async function searchUsers(req, res) {
    try {
        const { firstName, lastName, email } = req.query;
        const users = await database_1.default.user.findMany({
            where: {
                ...(firstName && { firstName: { contains: firstName } }),
                ...(lastName && { lastName: { contains: lastName } }),
                ...(email && { email: { contains: email } }),
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                userType: true,
                status: true,
                createdAt: true,
            },
        });
        res.json({
            success: true,
            data: users.map((user) => ({
                ...user,
                createdAt: user.createdAt.toISOString(),
            })),
        });
    }
    catch (error) {
        console.error('Search users error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'An error occurred while searching users', code: 'INTERNAL_ERROR' },
        });
    }
}
//# sourceMappingURL=user.controller.js.map