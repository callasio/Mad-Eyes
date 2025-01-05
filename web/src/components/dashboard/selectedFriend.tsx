import React from 'react';
import { Friend } from './dialog';
import CloseIcon from '@mui/icons-material/Close';

interface SelectedFriendFrameProps {
  selectedFriend: Friend | null;
  setSelectedFriend: (friend: Friend | null) => void;
}

const getElapsedTime = (start: Date) => {
  const now = new Date();
  const elapsed = now.getTime() - start.getTime();
  const minutes = Math.floor(elapsed / 6000);
  return `${minutes} minutes`;
};

const getSessionDuration = (session: { start: Date; end?: Date }) => {
  if (!session.end) return 'Ongoing';
  const duration = session.end.getTime() - session.start.getTime();
  const minutes = Math.floor(duration / 6000);
  return `${minutes} minutes`;
};

const SelectedFriendFrame: React.FC<SelectedFriendFrameProps> = ({ selectedFriend, setSelectedFriend }) => {
  if (!selectedFriend) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: '320px',
        top: '0',
        backgroundColor: '#2D2D2D',
        borderRadius: '12px',
        padding: '20px',
        width: '300px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <button
        onClick={() => setSelectedFriend(null)}
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '18px',
          cursor: 'pointer',
        }}
      >
        <CloseIcon />
      </button>
      <h3 style={{ marginBottom: '15px', color: 'white' }}>
        {selectedFriend.nickname}'s Session
      </h3>
      <div
        style={{
          backgroundColor: '#383838',
          borderRadius: '8px',
          padding: '20px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: selectedFriend.isOnline ? '#4CAF50' : '#666',
              marginRight: '10px',
            }}
          />
          <span>{selectedFriend.isOnline ? 'Online' : 'Offline'}</span>
        </div>

        {selectedFriend.lastSession && (
          <div>
            {selectedFriend.isOnline ? (
              <>
                <div>Started:</div>
                <div style={{ fontSize: '18px', marginBottom: '10px' }}>
                  {selectedFriend.lastSession.start.toLocaleTimeString()}
                </div>
                <div>Duration:</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {getElapsedTime(selectedFriend.lastSession.start)}
                </div>
              </>
            ) : (
              <>
                <div>Last Session:</div>
                <div style={{ fontSize: '16px', marginBottom: '10px' }}>
                  {selectedFriend.lastSession.start.toLocaleTimeString()} -{' '}
                  {selectedFriend.lastSession.end?.toLocaleTimeString()}
                </div>
                <div>Duration:</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {getSessionDuration(selectedFriend.lastSession)}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedFriendFrame;