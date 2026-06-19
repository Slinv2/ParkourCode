
import React from 'react';
import { MauziState, PlutoState, mauziImages, plutoImages } from './characterAssets';

interface CharacterStageProps {
  mauziState: MauziState;
  plutoState: PlutoState;
  speech: string;
}

const CharacterStage: React.FC<CharacterStageProps> = ({ mauziState, plutoState, speech }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center p-2 md:p-4">
      {/* Speech bubble */}
      {speech && (
        <div className="relative mb-6 md:mb-8 bg-white px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-lg border-4 border-[#004284] z-10 max-w-xs md:max-w-md text-center">
          <div className="text-base md:text-lg font-bold text-slate-800">{speech}</div>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-[#004284]"></div>
        </div>
      )}

      {/* Characters */}
      <div className="flex items-end justify-center gap-4 md:gap-8 lg:gap-16">
        {/* Pluto */}
        <div className="text-center">
          <img
            src={plutoImages[plutoState]}
            alt="Pluto"
            className="w-24 h-24 md:w-32 lg:w-48 h-auto object-contain animate-bounce"
            style={{ animationDuration: '3s' }}
          />
          <div className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-[#ff9500]">Pluto</div>
        </div>

        {/* Mauzi */}
        <div className="text-center">
          <img
            src={mauziImages[mauziState]}
            alt="Mauzi"
            className="w-24 h-24 md:w-32 lg:w-48 h-auto object-contain animate-pulse"
            style={{ animationDuration: '2s' }}
          />
          <div className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-[#00a4e4]">Mauzi</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterStage;
