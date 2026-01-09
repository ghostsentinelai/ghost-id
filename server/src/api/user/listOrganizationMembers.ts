import { eq, inArray, sql } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../db/postgres/postgres.js";
import { member, memberSiteAccess, user } from "../../db/postgres/schema.js";

interface ListOrganizationMembersRequest {
  Params: {
    organizationId: string;
  };
}

export async function listOrganizationMembers(
  request: FastifyRequest<ListOrganizationMembersRequest>,
  reply: FastifyReply
) {
  try {
    const { organizationId } = request.params;

    const organizationMembers = await db
      .select({
        id: member.id,
        role: member.role,
        userId: member.userId,
        organizationId: member.organizationId,
        createdAt: member.createdAt,
        hasRestrictedSiteAccess: member.hasRestrictedSiteAccess,
        // User fields
        userName: user.name,
        userEmail: user.email,
        userImage: user.image,
        userActualId: user.id,
      })
      .from(member)
      .leftJoin(user, eq(member.userId, user.id))
      .where(eq(member.organizationId, organizationId));

    // Get site access counts for all members
    const memberIds = organizationMembers.map(m => m.id);
    const siteAccessCounts =
      memberIds.length > 0
        ? await db
            .select({
              memberId: memberSiteAccess.memberId,
              siteCount: sql<number>`count(*)::int`,
            })
            .from(memberSiteAccess)
            .where(inArray(memberSiteAccess.memberId, memberIds))
            .groupBy(memberSiteAccess.memberId)
        : [];

    // Create a map for quick lookup
    const siteCountMap = new Map(siteAccessCounts.map(s => [s.memberId, s.siteCount]));

    // Transform the results to the expected format
    return reply.send({
      success: true,
      data: organizationMembers.map(m => ({
        id: m.id,
        role: m.role,
        userId: m.userId,
        organizationId: m.organizationId,
        createdAt: m.createdAt,
        user: {
          id: m.userActualId,
          name: m.userName,
          email: m.userEmail,
        },
        siteAccess: {
          hasRestrictedSiteAccess: m.hasRestrictedSiteAccess,
          siteCount: siteCountMap.get(m.id) || 0,
        },
      })),
    });
  } catch (error) {
    console.error("Error listing organization members:", error);
    return reply.status(500).send({
      error: "InternalServerError",
      message: "An error occurred while listing organization members",
    });
  }
}
