import { FastifyReply, FastifyRequest } from "fastify";
import { SessionReplayQueryService } from "../../services/replay/sessionReplayQueryService.js";

export async function deleteSessionReplay(
  request: FastifyRequest<{
    Params: {
      sessionId: string;
      site: string;
    };
  }>,
  reply: FastifyReply
) {
  const { sessionId, site } = request.params;

  try {
    const siteId = parseInt(site);
    if (isNaN(siteId)) {
      return reply.status(400).send({ error: "Invalid site ID" });
    }

    const sessionReplayQueryService = new SessionReplayQueryService();
    const metadata = await sessionReplayQueryService.getSessionReplayMetadata(siteId, sessionId);

    if (!metadata) {
      return reply.status(404).send({ error: "Session replay not found" });
    }

    // Delete the session replay
    await sessionReplayQueryService.deleteSessionReplay(siteId, sessionId);

    return reply.status(200).send({ success: true });
  } catch (error) {
    console.error("Error deleting session replay:", error);
    return reply.status(500).send({ error: "Failed to delete session replay" });
  }
}
