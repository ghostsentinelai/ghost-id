"use client";

import { SessionsList } from "@/components/Sessions/SessionsList";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useUserInfo } from "../../../../api/analytics/userGetInfo";
import { useGetSessions, useGetUserSessionCount } from "../../../../api/analytics/useGetUserSessions";
import { Button } from "../../../../components/ui/button";
import { useSetPageTitle } from "../../../../hooks/useSetPageTitle";
import { useGetRegionName } from "../../../../lib/geo";
import { MobileSidebar } from "../../components/Sidebar/MobileSidebar";
import { UserSidebar } from "./components/UserSidebar";
import { Skeleton } from "../../../../components/ui/skeleton";
import { Avatar, generateName } from "../../../../components/Avatar";
import { Badge } from "../../../../components/ui/badge";
import { IdentifiedBadge } from "../../../../components/IdentifiedBadge";

const LIMIT = 25;

export default function UserPage() {
  useSetPageTitle("Rybbit · User");

  const router = useRouter();
  const { userId } = useParams();
  const { site } = useParams();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useUserInfo(Number(site), userId as string);
  const { data: sessionCount } = useGetUserSessionCount(userId as string);
  const { data: sessionsData, isLoading: isLoadingSessions } = useGetSessions(userId as string, page, LIMIT + 1);

  const allSessions = sessionsData?.data || [];
  const hasNextPage = allSessions.length > LIMIT;
  const sessions = allSessions.slice(0, LIMIT);
  const hasPrevPage = page > 1;

  const { getRegionName } = useGetRegionName();

  const handleBackClick = () => {
    router.push(`/${site}/users`);
  };

  const traitsUsername = data?.traits?.username as string | undefined;
  const traitsName = data?.traits?.name as string | undefined;
  const traitsEmail = data?.traits?.email as string | undefined;
  const isIdentified = data?.is_identified ?? false;
  const displayName =
    traitsUsername || traitsName || (isIdentified ? (userId as string) : generateName(userId as string));

  return (
    <div className="p-2 md:p-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <MobileSidebar />
        <Button onClick={handleBackClick} className="w-max" variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Avatar size={64} id={userId as string} />
        <div className="mt-3 w-full flex gap-2">
          <div>
            <div className="font-semibold text-lg flex items-center gap-2">
              {isLoading ? <Skeleton className="h-6 w-32" /> : displayName}
              {!isLoading && isIdentified && <IdentifiedBadge traits={data?.traits} />}
            </div>
            {isLoading ? (
              <div className="flex flex-col items-center gap-1 mt-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                {traitsEmail && <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-0.5">{traitsEmail}</p>}
                <p className="text-neutral-400 dark:text-neutral-500 text-xs font-mono mt-1 truncate">{userId}</p>
              </>
            )}
          </div>
          {data?.ip && (
            <Badge variant="outline" className="mt-3 text-xs">
              IP: {data.ip}
            </Badge>
          )}
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Sidebar */}
        <UserSidebar
          data={data}
          isLoading={isLoading}
          sessionCount={sessionCount?.data ?? []}
          getRegionName={getRegionName}
        />

        {/* Right Content - Sessions */}
        <div className="flex-1 min-w-0">
          <SessionsList
            sessions={sessions}
            isLoading={isLoadingSessions}
            page={page}
            onPageChange={setPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            userId={userId as string}
          />
        </div>
      </div>
    </div>
  );
}
