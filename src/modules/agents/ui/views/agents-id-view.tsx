"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <div className="flex-1 p-4 md:px-8 flex flex-col gap-y-4">
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export const AgentsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="This may take a few seconds"
    />
  );
};

export const AgentsIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="Something went wrong"
    />
  );
};
