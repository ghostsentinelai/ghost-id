"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth";
import { SiteAccessMultiSelect } from "./SiteAccessMultiSelect";
import {
  getMemberSiteAccess,
  updateMemberSiteAccess,
  GetOrganizationMembersResponse,
} from "@/api/admin/endpoints/auth";

type Member = GetOrganizationMembersResponse["data"][0];

interface MemberSiteAccessDialogProps {
  member: Member | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function MemberSiteAccessDialog({
  member,
  open,
  onClose,
  onSuccess,
}: MemberSiteAccessDialogProps) {
  const { data: activeOrganization } = authClient.useActiveOrganization();

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [restrictSiteAccess, setRestrictSiteAccess] = useState(false);
  const [selectedSiteIds, setSelectedSiteIds] = useState<number[]>([]);

  // Fetch member's current site access when dialog opens
  useEffect(() => {
    if (open && member && activeOrganization?.id) {
      setIsFetching(true);
      getMemberSiteAccess(activeOrganization.id, member.id)
        .then(data => {
          setRestrictSiteAccess(data.hasRestrictedSiteAccess);
          setSelectedSiteIds(data.siteAccess.map(s => s.siteId));
        })
        .catch(error => {
          console.error("Failed to fetch member site access:", error);
          // Use fallback from member data
          setRestrictSiteAccess(member.siteAccess.hasRestrictedSiteAccess);
          setSelectedSiteIds([]);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [open, member, activeOrganization?.id]);

  const handleSave = async () => {
    if (!member || !activeOrganization?.id) return;

    // Validate that at least one site is selected when restricting
    if (restrictSiteAccess && selectedSiteIds.length === 0) {
      toast.error("Please select at least one site or disable site restrictions");
      return;
    }

    setIsLoading(true);
    try {
      await updateMemberSiteAccess(activeOrganization.id, member.id, {
        hasRestrictedSiteAccess: restrictSiteAccess,
        siteIds: selectedSiteIds,
      });

      toast.success("Site access updated successfully");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to update site access");
    } finally {
      setIsLoading(false);
    }
  };

  if (!member) return null;

  // Don't allow editing site access for admin/owner roles
  const isRestrictable = member.role === "member";

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Site Access for {member.user.name || member.user.email}</DialogTitle>
          <DialogDescription>
            {isRestrictable
              ? "Configure which sites this member can access."
              : "Admin and owner roles have access to all sites and cannot be restricted."}
          </DialogDescription>
        </DialogHeader>

        {isFetching ? (
          <div className="py-8 text-center text-muted-foreground">Loading...</div>
        ) : isRestrictable ? (
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="restrict-access"
                checked={restrictSiteAccess}
                onCheckedChange={checked => {
                  setRestrictSiteAccess(!!checked);
                  if (!checked) {
                    setSelectedSiteIds([]);
                  }
                }}
              />
              <Label htmlFor="restrict-access" className="cursor-pointer">
                Restrict access to specific sites
              </Label>
            </div>

            {restrictSiteAccess ? (
              <div className="pl-6">
                <SiteAccessMultiSelect
                  selectedSiteIds={selectedSiteIds}
                  onChange={setSelectedSiteIds}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  This member will only have access to the selected sites.
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground pl-6">
                This member has access to all sites in the organization.
              </p>
            )}
          </div>
        ) : (
          <div className="py-4 text-center">
            <p className="text-muted-foreground">
              {member.role === "owner" ? "Organization owners" : "Admins"} automatically have access
              to all sites.
            </p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {isRestrictable && (
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
