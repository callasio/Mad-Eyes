"use client";

import { useRecording } from "@/video/process";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Test() {
  const { data: session } = useSession();

  const [response, setResponse] = useState<any>("Nothing yet");
  let cnt = 0;
  const [blinkCount, setBlinkCount] = useState<number>(0);

  const { isRecording, setIsRecording, setOnBlink } = useRecording();

  const incrementBlinkCount = () => {
    cnt += 1;
    setBlinkCount(cnt);
    console.log('Blinked ' + cnt + ' times');
  }

  useEffect(() => {
    setOnBlink(() => incrementBlinkCount)}, [setOnBlink]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>Test Page</h1>
      <div>{session?.user?.email}</div>
      <div>{session?.user?.name}</div>
      {session?.user?.image &&
        <img src={session?.user?.image} alt="profile" style={{ width: 100, height: 100, borderRadius: '50%' }} />
      }
      <button
        onClick={async () => {
          console.log(session?.idToken?.split('.'));
          const res = await fetch('http://localhost:8080/user', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session?.idToken}`,
            }
          })
          console.log(res);
          const data = await res.json();
          setResponse(JSON.stringify(data));
        }}
      >GET /user</button>
      <button
        onClick={async () => {
          console.log(session?.idToken?.split('.'));
          const res = await fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${session?.idToken}`,
            }
          })
          console.log(res);
          const data = await res.json();
          setResponse(JSON.stringify(data));
        }}
      >POST /register</button>
      <button
        onClick={async () => {
          console.log(session?.idToken?.split('.'));
          const res = await fetch('http://localhost:8080/user/unregister', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${session?.idToken}`,
            }
          })
          console.log(res);
          const data = await res.json();
          setResponse(JSON.stringify(data));
        }}
      >POST /unregister</button>
      <button
        onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <div>{response}</div>
      <div>Blinked {blinkCount} times</div>
    </div>
  );
}