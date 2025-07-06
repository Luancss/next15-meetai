"use client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { MeetingGetMany } from "../../types";
import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import { Badge } from "@/components/ui/badge";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  CornerDownRightIcon,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

function formatDuration(seconds: number): string {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  compledted: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
  processing: "bg-gray-500/20 text-gray-800 border-gray-800/5",
};

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-y-1">
          <span className="font-semibold capitalize">{row.original.name}</span>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1">
              <CornerDownRightIcon className="size-3 text-muted-foreground" />
              <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
                {row.original.agent.name}
              </span>
            </div>
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={row.original.agent.name}
              className="size-4"
            />
            <span>
              {row.original.startedAt
                ? format(row.original.startedAt, "MMM d")
                : ""}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-2 [&>svg]:size-4"
      >
        <VideoIcon className="text-blue-700" />
        {row.original.meetingCount}{" "}
        {row.original.meetingCount === 1 ? "Meeting" : "Meetings"}
      </Badge>
    ),
  },
];
