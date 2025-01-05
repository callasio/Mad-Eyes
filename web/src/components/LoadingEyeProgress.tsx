import React from 'react';

const LoadingEyeProgress: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#302C42'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div style={{
          color: 'white',
          fontSize: '1.875rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          MADEYES
        </div>
        
        {/* Eye container */}
        <div style={{
          position: 'relative',
          width: '16rem',
          height: '8rem'
        }}>
          {/* Eye shape */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#C0B7E8',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            {/* Pupil */}
            <div style={{
              position: 'absolute',
              top: '50%',
              width: '5rem',
              height: '5rem',
              backgroundColor: '#302C42',
              borderRadius: '9999px',
              transform: 'translateY(-50%)',
              animation: 'pupilMove 2s ease-in-out infinite'
            }}>
              {/* Light reflection */}
              <div style={{
                position: 'absolute',
                width: '1.75rem',
                height: '1.75rem',
                backgroundColor: 'rgba(192, 183, 232, 0.3)',
                borderRadius: '9999px',
                top: '0.75rem',
                right: '0.75rem'
              }} />
            </div>
          </div>
        </div>
        
        {/* Loading text */}
        <div style={{
          color: '#C0B7E8',
          fontSize: '1.25rem',
          marginTop: '2rem'
        }}>
          Loading...
        </div>
      </div>

      <style>
        {`
          @keyframes pupilMove {
            0%, 100% {
              left: 7%;
            }
            50% {
              left: 63%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingEyeProgress;