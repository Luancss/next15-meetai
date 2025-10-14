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
import { and, eq, not } from "drizzle-orm";

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

    if (!meetingId) {
      return NextResponse.json(
        {error: "Missing meetingId"},
        {status: 400}
      )
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "active")),
          not(eq(meetings.status, "cancelled"))
        )
      )

    if (!existingMeeting) {
      return NextResponse.json(
        {error: "Meeting not found"},
        {status: 404}
      )
    }

    await db.
      update(meetings)
      .set({
        status: "active",
        startedAt: new Date(),
      })
      .where(eq(meetings.id, existingMeeting.id))
  }

  return NextResponse.json({status: "ok"});
}