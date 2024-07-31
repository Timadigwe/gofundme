import { FC, useState } from 'react';
import { BaseButton } from '../buttons/BaseButton';
import { CampaignCategory } from '../types';
// import Image from 'next/image';

type CategoryCardProps = {
  src: string;
  category: CampaignCategory;
  isSelected: boolean;
  onClick: () => void;
};
const CategoryCard: FC<CategoryCardProps> = ({
  src,
  category,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className="z-10 rounded-[24px] bg-cover bg-center bg-no-repeat cursor-pointer relative w-[9rem] h-[12.6rem] md:w-[13rem] md:h-[18.2rem]"
      onClick={onClick}
      style={{ backgroundImage: `url(${src})` }}
    >
      <p className="z-30 text-sm rounded-xl px-2 p-1 w-fit bg-stone-300 absolute top-2 left-2 md:top-4 md:left-4 justify-center items-center">
        <p>{category}</p>
      </p>
      {isSelected && (
        <>
          <div className="z-30 absolute bottom-2 right-2 md:right-4">
            <p className="text-[32px] md:text-[48px]">✅</p>
          </div>
          <div className="absolute bg-black opacity-30 w-full h-full rounded-[24px]"></div>
        </>
      )}
    </div>
  );
};

type CreateCampaignViewProps = {
  onClick: () => void;
};
export const CreateCampaignView: FC<CreateCampaignViewProps> = ({
  onClick,
}) => {
  const [category, setCategory] = useState<CampaignCategory>();
  return (
    <div className="flex flex-col justify-center items-center gap-2 font-mono">
      <p className="font-mono self-center mb-[1rem]">
        Please select a category
      </p>

      <div className="flex px-5 md:px-0 md:justify-center gap-5 md:gap-10 flex-wrap w-full">
        <CategoryCard
          src={'/education.webp'}
          category={'Education'}
          isSelected={'Education' === category}
          onClick={() => {
            setCategory('Education');
          }}
        />
        <CategoryCard
          src={'/personal.webp'}
          category={'Personal'}
          isSelected={'Personal' === category}
          onClick={() => {
            setCategory('Personal');
          }}
        />
        <CategoryCard
          src={'/community.webp'}
          category={'Community'}
          isSelected={'Community' === category}
          onClick={() => {
            setCategory('Community');
          }}
        />
        <CategoryCard
          src={'/health.webp'}
          category={'Health'}
          isSelected={'Health' === category}
          onClick={() => {
            setCategory('Health');
          }}
        />
        <CategoryCard
          src={'/project.webp'}
          category={'Project'}
          isSelected={'Project' === category}
          onClick={() => {
            setCategory('Project');
          }}
        />
      </div>

      {/* spacer */}
      <div className="h-8 w-4"></div>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter campaign title"
          className="bg-white p-3 w-[22rem] rounded-xl focus-visible::border-0"
        />
        <input
          type="number"
          placeholder="amount in sols"
          className="bg-white p-3 w-[22rem] rounded-xl focus-visible::border-0"
        />
        <input
          type="date"
          // placeholder="Enter campaign target"
          className="bg-white text-black w-[22rem] p-3 rounded-xl focus-visible::border-0"
          min={new Date().toISOString()}
          style={{ color: 'black', colorScheme: 'light' }}
        />
      </div>
      <div className="w-full max-w-[22rem] mt-2">
        <BaseButton text={'Create a campaign'} onClick={onClick} />
      </div>
    </div>
  );
};
