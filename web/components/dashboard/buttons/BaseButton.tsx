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
      className=" ease-out duration-800 w-full p-[13px] rounded-xl text-sm text-white hover:text-black hover:font-semibold bg-black font-mono"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {text}
    </button>
  );
};
