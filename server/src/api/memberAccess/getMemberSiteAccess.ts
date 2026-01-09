import { and, eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";

import { db } from "../../db/postgres/postgres.js";
import { member, memberSiteAccess, sites } from "../../db/postgres/schema.js";

interface GetMemberSiteAccessParams {
  organizationId: string;
  memberId: string;
}

export async function getMemberSiteAccess(
  request: FastifyRequest<{ Params: GetMemberSiteAccessParams }>,
  reply: FastifyReply
) {
  const { organizationId, memberId } = request.params;

  try {
    // Get the member record to check hasRestrictedSiteAccess
    const memberRecord = await db
      .select({
        id: member.id,
        userId: member.userId,
        role: member.role,
        hasRestrictedSiteAccess: member.hasRestrictedSiteAccess,
      })
      .from(member)
      .where(and(eq(member.id, memberId), eq(member.organizationId, organizationId)))
      .limit(1);

    if (memberRecord.length === 0) {
      return reply.status(404).send({ error: "Member not found" });
    }

    const memberData = memberRecord[0];

    // Get site access entries for this member
    const siteAccessRecords = await db
      .select({
        siteId: memberSiteAccess.siteId,
        siteName: sites.name,
        siteDomain: sites.domain,
      })
      .from(memberSiteAccess)
      .innerJoin(sites, eq(memberSiteAccess.siteId, sites.siteId))
      .where(eq(memberSiteAccess.memberId, memberId));

    return reply.status(200).send({
      memberId: memberData.id,
      hasRestrictedSiteAccess: memberData.hasRestrictedSiteAccess,
      siteAccess: siteAccessRecords.map(record => ({
        siteId: record.siteId,
        name: record.siteName,
        domain: record.siteDomain,
      })),
    });
  } catch (error) {
    console.error("Error getting member site access:", error);
    return reply.status(500).send({ error: "Failed to get member site access" });
  }
}
