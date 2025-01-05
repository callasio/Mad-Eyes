import Fab from '@mui/material/Fab';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { colors } from '@mui/material';
import { themeColor } from '@/constants/colors';

const ToDashboard: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push('/dashboard');
  };

  if (pathname === '/' || pathname === '/signup' || pathname === '/dashboard') {
    return (<></>);
  }

  return (
    <Fab 
      aria-label="to-dashboard" 
      onClick={handleClick} 
      style={{ position: 'fixed', bottom: 32, right: 32, backgroundColor: themeColor.bright, color: themeColor.white }}
    >
      <HomeIcon />
    </Fab>
  );
};

export default ToDashboard;