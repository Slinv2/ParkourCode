
import React from 'react';
import { MauziState, PlutoState, mauziImages, plutoImages } from './characterAssets';

interface CharacterStageProps {
  mauziState: MauziState;
  plutoState: PlutoState;
  speech: string;
}

const CharacterStage: React.FC<CharacterStageProps> = ({ mauziState, plutoState, speech }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      {/* Speech bubble */}
      {speech && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-2xl shadow-lg border-4 border-cyan-300 z-10 max-w-md text-center">
          <div className="text-lg font-bold text-slate-800">{speech}</div>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-cyan-300"></div>
        </div>
      )}

      {/* Characters */}
      <div className="flex items-end justify-center gap-8 md:gap-16 mt-20">
        {/* Pluto */}
        <div className="text-center">
          <img
            src={plutoImages[plutoState]}
            alt="Pluto"
            className="w-32 h-32 md:w-48 md:h-48 object-contain animate-bounce"
            style={{ animationDuration: '3s' }}
          />
          <div className="mt-2 text-xl font-bold text-orange-400">Pluto</div>
        </div>

        {/* Mauzi */}
        <div className="text-center">
          <img
            src={mauziImages[mauziState]}
            alt="Mauzi"
            className="w-32 h-32 md:w-48 md:h-48 object-contain animate-pulse"
            style={{ animationDuration: '2s' }}
          />
          <div className="mt-2 text-xl font-bold text-cyan-400">Mauzi</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterStage;
