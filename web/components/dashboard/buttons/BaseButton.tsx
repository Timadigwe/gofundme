import { FC } from 'react';

type BaseButtonProps = {
  text: string;
  onClick: () => void;
};
export const BaseButton: FC<BaseButtonProps> = ({
    text,
  onClick,
}) => {
  return (
    <button
      className="hover:p-[14px] ease-out duration-800 w-full p-[13px] rounded-xl text-sm text-white bg-black font-mono"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {text}
    </button>
  );
};
