import { useCallStateHooks } from "@stream-io/video-react-sdk";

interface Props {
  onJoin: () => void;
}

export const CallLobby = ({ onJoin }: Props) => {
    const {useCameraState, useMicrophoneState} = useCallStateHooks();

    const {hasBrowserPermission: hasMicPermissions} = useMicrophoneState();
    const {hasBrowserPermission: hasCameraPermissions} = useCameraState();

    const hasBrowserMediaPermissions = hasMicPermissions && hasCameraPermissions;

  return (
      <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
        <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-bkacjground rounded-lg p-10 shadow-sm">
    <div className="flex flex-col gap-y-2 text-center">
    <h6>Ready to join?</h6>
    </div>
      </div>
        </div>
      </div>

  )
}