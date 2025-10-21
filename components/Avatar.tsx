import React from 'react';
import { PREDEFINED_AVATARS } from '../utils/avatars';

interface AvatarProps {
  avatar: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ avatar, className }) => {
  const isPredefined = !!PREDEFINED_AVATARS[avatar];
  const isDataUri = avatar?.startsWith('data:image/svg+xml');

  if (isPredefined) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: PREDEFINED_AVATARS[avatar] }}
      />
    );
  }

  if (isDataUri) {
    return <img src={avatar} alt="Avatar Gerado" className={className} />;
  }
  
  // Fallback for missing avatar
  return (
     <div className={`${className} bg-gray-300`}></div>
  );
};