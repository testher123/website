import type { Request, Response, NextFunction } from "express";

/**
 * Middleware to check if the request is from an authenticated owner.
 * It checks for a secret key in the 'X-Admin-Auth' header.
 */
export const isOwnerAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminKey = process.env.ADMIN_SECRET_KEY;
  const providedKey = req.headers["x-admin-auth"];

  // It's crucial that the admin key is set on the server.
  if (!adminKey) {
    console.error("ADMIN_SECRET_KEY is not set in environment variables.");
    return res.status(500).json({ message: "Server configuration error." });
  }

  if (providedKey && providedKey === adminKey) {
    return next(); // Keys match, proceed to the protected route.
  }

  // If keys don't match or no key is provided, deny access.
  res.status(403).json({ message: "Forbidden: You do not have permission." });
};