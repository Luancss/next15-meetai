import { EmptyState } from "@/components/empty-state";

export const UpcomingState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="No started yet"
        description="Onde you start this meeting, a summary will appear here"
      />
    </div>
  );
};
