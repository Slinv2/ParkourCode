
// Import all Mauzi images
import MauziSleeping from './Mauzi/Mauzi_sleeping.png';
import MauziEyesHalfOpen from './Mauzi/Mauzi_eyes-half-open.png';
import MauziEyesOpen from './Mauzi/Mauzi_eyes-open.png';
import MauziStanding from './Mauzi/Mauzi_standing.png';
import MauziWaving from './Mauzi/Mauzi_waving.png';
import MauziMusic from './Mauzi/Mauzi_music.png';
import MauziSchutz from './Mauzi/Mauzi_schutz.png';
import MauziConfused from './Mauzi/Mauzi_confused.png';
import MauziIdle from './Mauzi/Mauzi_idle.png';

// Import all Pluto images
import PlutoNormal from './Pluto/Pluto_normal.png';
import PlutoSneaking from './Pluto/Pluto_sneaking.png';
import PlutoSurprised from './Pluto/Pluto_surprised.png';
import PlutoGenervt from './Pluto/Pluto_genervt.png';
import PlutoLight from './Pluto/Pluto_light.png';
import PlutoMusic from './Pluto/Pluto_music.png';
import PlutoSchutz from './Pluto/Pluto_schutz.png';
import PlutoRetreating from './Pluto/Pluto_retreating.png';

// Define types
export type MauziState =
  | 'sleeping'
  | 'eyes-half-open'
  | 'eyes-open'
  | 'standing'
  | 'waving'
  | 'music'
  | 'schutz'
  | 'confused'
  | 'idle';

export type PlutoState =
  | 'normal'
  | 'sneaking'
  | 'surprised'
  | 'genervt'
  | 'light'
  | 'music'
  | 'schutz'
  | 'retreating';

// Export image maps
export const mauziImages: Record<MauziState, string> = {
  'sleeping': MauziSleeping,
  'eyes-half-open': MauziEyesHalfOpen,
  'eyes-open': MauziEyesOpen,
  'standing': MauziStanding,
  'waving': MauziWaving,
  'music': MauziMusic,
  'schutz': MauziSchutz,
  'confused': MauziConfused,
  'idle': MauziIdle,
};

export const plutoImages: Record<PlutoState, string> = {
  'normal': PlutoNormal,
  'sneaking': PlutoSneaking,
  'surprised': PlutoSurprised,
  'genervt': PlutoGenervt,
  'light': PlutoLight,
  'music': PlutoMusic,
  'schutz': PlutoSchutz,
  'retreating': PlutoRetreating,
};
