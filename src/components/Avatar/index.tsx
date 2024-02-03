import React from 'react'

interface AvatarProps {
  src: string;
  height: number | string;
  width: number | string;
  defaultSrc: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, height, width, defaultSrc }) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    setImgSrc(defaultSrc);
  };

  return (
    <div style={{ overflow: 'hidden', height, width  , borderRadius : "50%"}}>
      <img 
        src={imgSrc} 
        height="100%" 
        width="100%" 
        onError={handleError} 
        alt="avatar" 
      />
    </div>
  );
}

export default Avatar;