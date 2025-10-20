import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { verifyTurnstileToken } from "../lib/turnstile.js";

/**
 * Registers Turnstile verification middleware for the auth routes
 * Only runs in cloud mode and only for email signup
 */
export async function registerTurnstileMiddleware(
  fastify: FastifyInstance,
  isCloud: boolean,
  logger: any
) {
  // Custom body parser that preserves the raw body for both our middleware and better-auth
  fastify.addContentTypeParser(
    "application/json",
    { parseAs: "buffer" },
    async (_request, payload: Buffer, done) => {
      try {
        const bodyString = payload.toString("utf-8");
        const body = JSON.parse(bodyString);
        // Store both parsed and raw for later use
        done(null, { parsed: body, raw: bodyString, buffer: payload });
      } catch (error) {
        done(error as Error, undefined);
      }
    }
  );

  // Turnstile verification middleware for email signup (cloud only)
  fastify.addHook("preHandler", async (request: FastifyRequest, reply: FastifyReply) => {
    // Only verify Turnstile for email signup in cloud mode
    if (isCloud && request.url === "/api/auth/sign-up/email" && request.method === "POST") {
      try {
        const body = (request.body as any)?.parsed;
        const rawBuffer = (request.body as any)?.buffer;
        const turnstileToken = body?.turnstileToken;

        logger.info("Turnstile verification - token received:", !!turnstileToken);

        if (!turnstileToken) {
          return reply.status(400).send({
            error: "Captcha verification required",
            message: "Please complete the captcha verification",
          });
        }

        // Verify the Turnstile token
        const remoteIp = request.ip;
        const isValid = await verifyTurnstileToken(turnstileToken, remoteIp);

        if (!isValid) {
          return reply.status(400).send({
            error: "Captcha verification failed",
            message: "Invalid captcha. Please try again.",
          });
        }

        logger.info("Turnstile verification successful");

        // Make the raw buffer available to better-auth by recreating a readable stream
        if (rawBuffer) {
          const { Readable } = await import("stream");
          const stream = Readable.from(rawBuffer);
          // Replace the request stream with a fresh one that better-auth can read
          Object.assign(request.raw, stream);
        }
      } catch (error) {
        logger.error("Error in Turnstile verification:", error);
        return reply.status(500).send({
          error: "Verification error",
          message: "An error occurred during captcha verification",
        });
      }
    }
  });
}
