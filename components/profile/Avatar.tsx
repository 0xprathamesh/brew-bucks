import React from "react";

type Props = {
  src?: string;
};
const Avatar = ({ src }: Props) => {
  return (
    <div className="relative">
      <div className="h-[5rem] w-[5rem] ring-1 ring-white rounded-full overflow-hidden flex items-center">
        {src && (
          <picture>
            <img src={src} alt="avatar" className="h-full w-full" />
          </picture>
        )}
      </div>
    </div>
  );
};

export default Avatar;
