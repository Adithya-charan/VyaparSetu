import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";
import "@livekit/components-styles";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";
// Diagnostic logging – will appear in browser console
console.log("[API] Base URL:", BACKEND_URL);

export function VideoCallView() {
  const [token, setToken] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const connectToLiveKit = async () => {
      try {
        setError("");

        const identity = `user-${Date.now()}`;

        const requestUrl = `${BACKEND_URL}/api/livekit/token?room=vyapara-setu-room&identity=${identity}`;
        console.log("[API] Request:", requestUrl);
        const response = await fetch(requestUrl);

        if (!response.ok) {
          throw new Error("Failed to get LiveKit token");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setToken(data.token);
        setServerUrl(data.url);
      } catch (err) {
        console.error("LiveKit connection error:", err);

        if (err instanceof Error) {
          if (err.message.includes('Failed to fetch')) {
            // Likely CORS or network unreachable
            setError(`Network error: cannot reach backend at ${BACKEND_URL}`);
          } else if (err.message.includes('404')) {
            setError('LiveKit token endpoint not found (404)');
          } else if (err.message.includes('500')) {
            setError('Backend error while fetching LiveKit token (500)');
          } else {
            setError(err.message);
          }
        } else {
          setError('Unexpected error while connecting to LiveKit');
        }
      }
    };

    connectToLiveKit();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">
            Live Connection Error
          </h2>

          <p className="mt-2 text-red-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!token || !serverUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Connecting to LiveKit...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect={true}
        video={true}
        audio={true}
        onConnected={() => setConnected(true)}
        onDisconnected={() => setConnected(false)}
        data-lk-theme="default"
      >
        <VideoConference />

        <RoomAudioRenderer />

        {!connected && (
          <div className="absolute inset-0 flex items-center justify-center">
            Connecting...
          </div>
        )}
      </LiveKitRoom>
    </div>
  );
}