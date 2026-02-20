import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// =====================
// EXTEND REQUEST TYPE
// =====================

// Add custom property to Request interface
declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
        email: string;
      };
    }
  }
}

// =====================
// JWT PAYLOAD INTERFACE
// =====================

interface JwtPayload {
  id: string;
  email: string;
  iat: number;  // Issued at
  exp: number;  // Expiration
}

// =====================
// PROTECT MIDDLEWARE
// =====================

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // 1. Check if token exists in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];
    }

    // 2. Check if token exists
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      });
      return;
    }

    // 3. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // 4. Attach admin info to request object
    req.admin = {
      id: decoded.id,
      email: decoded.email
    };

    // 5. Continue to next middleware/controller
    next();

  } catch (error: any) {
    console.error('Auth middleware error:', error.message);

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        success: false,
        message: 'Not authorized, invalid token'
      });
      return;
    }

    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'Not authorized, token expired'
      });
      return;
    }

    // Generic error
    res.status(401).json({
      success: false,
      message: 'Not authorized'
    });
  }
};
