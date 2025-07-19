import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { meetingId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if (!session) {
    redirect("/sign-in");
  }

  return <div></div>;
};

export default Page;
