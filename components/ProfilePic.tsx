
import React from 'react';
import Image from 'next/image';
import profilePic from '@/assets/images/profile.jpg';

interface ProfilePictureProps {
}

const ProfilePicture: React.FC<ProfilePictureProps> = () => {
  const imageSize = 100; 

  const containerStyle: React.CSSProperties = {
    width: `${imageSize}px`,
    height: `${imageSize}px`,
    overflow: 'hidden',
    borderRadius: '50%', 
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', 
  };

  return (
    <div style={containerStyle}>
      <Image src={profilePic} width={imageSize} height={imageSize} alt="Profile" style={imageStyle} />
    </div>
  );
};

export default ProfilePicture;
