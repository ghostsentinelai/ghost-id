import { authedFetch } from "../../utils";

export type GetOrganizationMembersResponse = {
  data: {
    id: string;
    role: string;
    userId: string;
    organizationId: string;
    createdAt: string;
    user: {
      id: string;
      name: string | null;
      email: string;
    };
    siteAccess: {
      hasRestrictedSiteAccess: boolean;
      siteCount: number;
    };
  }[];
};

export function getOrganizationMembers(organizationId: string) {
  return authedFetch<GetOrganizationMembersResponse>(`/organizations/${organizationId}/members`);
}

// Member site access types and endpoints
export type MemberSiteAccessResponse = {
  memberId: string;
  hasRestrictedSiteAccess: boolean;
  siteAccess: {
    siteId: number;
    name: string;
    domain: string;
  }[];
};

export function getMemberSiteAccess(organizationId: string, memberId: string) {
  return authedFetch<MemberSiteAccessResponse>(
    `/organizations/${organizationId}/members/${memberId}/sites`
  );
}

export function updateMemberSiteAccess(
  organizationId: string,
  memberId: string,
  data: { hasRestrictedSiteAccess: boolean; siteIds: number[] }
) {
  return authedFetch<MemberSiteAccessResponse>(
    `/organizations/${organizationId}/members/${memberId}/sites`,
    undefined,
    {
      method: "PUT",
      data,
    }
  );
}
