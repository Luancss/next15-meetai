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

  const body = await req.text();

  if (!verifySignatureWidhSDK(body, signature)) {
    return NextResponse.json(
      {error: "Invalid signature"},
      {status: 401}
    )
  }

  let payload: unknown;
  try {
    const payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      {error: "Invalid JSON"},
      {status: 400}
    )
  }

  const eventType = (payload as Record<string, unknown>)

  if (eventType.type === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;
  }

  return NextResponse.json({status: "ok"});
}