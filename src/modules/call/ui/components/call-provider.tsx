"use client";

import { Loader2Icon } from "lucide-react";

import { authClient } from "@/lib/auth-client";

interface Props {
  meetingId: string;
  meetingName: string;
}

export const CallProvider = () => {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="flex h-screen items-center bg-radial from-sidebar-accent-to-sidebar">
        <Loader2Icon className="size-6 animate-spin text-white" />
      </div>
    );
  }

  return <div>call-provider</div>;
};
