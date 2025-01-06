import Header2 from '@/components/typography/Header2';
import React, { useRef } from 'react';

const HistoryFrame: React.FC = () => {

  return (
    <div style={{
      flex: 2,
    }}>
      <Header2 text="HISTORY" style={{
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

export default HistoryFrame;