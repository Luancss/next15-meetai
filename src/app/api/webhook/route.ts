import {
  CallEndedEvent,
  CallTranscriptionReadyEvent,
  CallSessionParticipantLeftEvent,
  CallRecordingReadyEvent,
  CallSessionStartedEvent,
} from "@stream-io/node-sdk"

import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { streamVideo } from "@/lib/stream-video";
import { NextRequest, NextResponse } from "next/server";

function verifySignatureWidhSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
};

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature")
  const apiKey  = req.headers.get("x-api-key")

  if (!signature || !apiKey) {
    return NextResponse.json(
      {error: "Missing signature or API key"},
      {status: 400}
    )
  }
}