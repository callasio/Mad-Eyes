import Fab from '@mui/material/Fab';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { themeColor } from '@/constants/colors';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useRecording } from '@/video/RecordingProvider';

const FloatingButtons: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { isRecording, setIsRecording } = useRecording();

  const handleClick = () => {
    router.push('/dashboard');
  };

  if (pathname === '/' || pathname === '/signup' || pathname === '/dashboard') {
    return (<></>);
  }

  return (
    <>
      <Fab 
        aria-label="to-dashboard" 
        onClick={() => { router.push('/dashboard');} } 
        style={{ position: 'fixed', bottom: 32, right: 32, backgroundColor: themeColor.bright, color: themeColor.white }}
      >
        <HomeIcon />
      </Fab>
      <Fab 
        aria-label="to-dashboard" 
        onClick={() => { setIsRecording(!isRecording); } }
        style={{ position: 'fixed', bottom: 32, right: 100, backgroundColor: themeColor.bright, color: themeColor.white }}
      >
        {
          isRecording ? <PauseIcon /> : <PlayArrowIcon />
        }
      </Fab>
    </>
  );
};

export default FloatingButtons;