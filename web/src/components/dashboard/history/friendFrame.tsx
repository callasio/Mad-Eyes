import Header2 from '@/components/typography/Header2';
import React, { useEffect, useRef, useState } from 'react';

const FriendFrame: React.FC = () => {

  const [friendsData, setFriendsData] = useState<any[]>([]);

  useEffect

  return (
    <div style={{
      flex: 1,
    }}>
      <Header2 text="FRIENDS" style={{
        marginTop: "0px" 
      }}/>

      <div style={{
        backgroundColor: "#262335",
        height: "1000px",
        borderRadius: "25px",
        objectFit: "cover",
      }}/>
    </div>
  );
};

export default FriendFrame;