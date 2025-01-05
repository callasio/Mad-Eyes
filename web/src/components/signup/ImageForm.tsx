import React, { useState } from 'react';
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { themeColor } from '@/constants/colors';

const ImageForm: React.FC<{
  profileImage: string;
  setProfileImage?: (image: string) => void;
}> = ({
  profileImage,
  setProfileImage,
}) => {
  const onProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage!(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '2px solid #ddd',
            overflow: 'hidden',
            backgroundColor: '#302C42',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '3px',
          }}
          onClick={setProfileImage &&
            (() => document.getElementById('profile-upload')?.click())}
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <AddIcon style={{ color: themeColor.white, fontSize: '40px' }} />
          )}
        </div>

        {profileImage && setProfileImage && (
          <div
            style={{
              position: 'absolute',
              zIndex: 1,
              bottom: '5px',
              right: '5px',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: themeColor.white,
              padding: '5px',
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onClick={() => setProfileImage('')}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#ddd')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = themeColor.white)
            }
          >
            <ClearIcon
              style={{
                color: themeColor.primary,
                borderRadius: '50%',
                fontSize: '20px',
              }}
              onClick={() => setProfileImage('')}
            />
          </div>
        )}
      </div>
      <input
        type="file"
        id="profile-upload"
        accept="image/*"
        onChange={onProfileImageChange}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default ImageForm;