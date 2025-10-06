import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

interface Props {
  onJoin: () => void;
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user?.name || "",
          image:
            data?.user.image ??
            generateAvatarUri({
              seed: data?.user?.name || "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { hasBrowserPermission: hasMicPermissions } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermissions } = useCameraState();

  const hasBrowserMediaPermissions = hasMicPermissions && hasCameraPermissions;

  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="py-4 px-8 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-bkacjground rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to join?</h6>
            <p className="text-sm">Set up your call before joining</p>
          </div>
        </div>
      </div>
    </div>
  );
};
