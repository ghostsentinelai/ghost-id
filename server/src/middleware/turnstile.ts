import type { IncomingMessage, ServerResponse } from "http";
import { verifyTurnstileToken } from "../lib/turnstile.js";

/**
 * Wraps the better-auth handler with Turnstile verification
 * Only runs in cloud mode and only for email signup
 */
export function createTurnstileAuthWrapper(
  authHandler: (req: IncomingMessage, res: ServerResponse) => Promise<void>,
  isCloud: boolean,
  logger: any
) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    // Only verify Turnstile for email signup in cloud mode
    if (isCloud && req.url === "/api/auth/sign-up/email" && req.method === "POST") {
      try {
        // Read the Turnstile token from the custom header
        const turnstileToken = req.headers["x-turnstile-token"] as string;

        logger.info("Turnstile verification - token received:", !!turnstileToken);

        if (!turnstileToken) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: "Captcha verification required",
              message: "Please complete the captcha verification",
            })
          );
          return;
        }

        // Verify the Turnstile token
        // Get the real IP from Fastify's X-Forwarded-For or the socket
        const remoteIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress;
        const isValid = await verifyTurnstileToken(turnstileToken, remoteIp);

        if (!isValid) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: "Captcha verification failed",
              message: "Invalid captcha. Please try again.",
            })
          );
          return;
        }

        logger.info("Turnstile verification successful");
      } catch (error) {
        logger.error("Error in Turnstile verification:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Verification error",
            message: "An error occurred during captcha verification",
          })
        );
        return;
      }
    }

    // Continue to the auth handler
    await authHandler(req, res);
  };
}
