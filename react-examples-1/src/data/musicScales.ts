// Music scales data structure
export interface MusicScale {
  name: string;
  notes: string[];
  type: 'major' | 'minor' | 'pentatonic' | 'blues';
  description: string;
}

// Music scales data
export const musicScales: MusicScale[] = [
  {
    name: 'C Major',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    type: 'major',
    description: 'The most common major scale, starting on C'
  },
  {
    name: 'A Minor',
    notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    type: 'minor',
    description: 'Natural minor scale, relative minor of C Major'
  },
  {
    name: 'C Pentatonic Major',
    notes: ['C', 'D', 'E', 'G', 'A'],
    type: 'pentatonic',
    description: 'Five-note scale commonly used in folk and rock music'
  },
  {
    name: 'A Blues',
    notes: ['A', 'C', 'D', 'D#', 'E', 'G'],
    type: 'blues',
    description: 'Six-note scale with characteristic blues sound'
  },
  {
    name: 'G Major',
    notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    type: 'major',
    description: 'Major scale with one sharp (F#)'
  },
  {
    name: 'E Minor',
    notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
    type: 'minor',
    description: 'Natural minor scale, relative minor of G Major'
  }
];

// Helper function to get scales by type
export const getScalesByType = (type: MusicScale['type']): MusicScale[] => {
  return musicScales.filter(scale => scale.type === type);
};

// Helper function to get scale by name
export const getScaleByName = (name: string): MusicScale | undefined => {
  return musicScales.find(scale => scale.name === name);
};

// Helper function to transpose a scale
export const transposeScale = (scale: MusicScale, semitones: number): MusicScale => {
  const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  const transposedNotes = scale.notes.map(note => {
    const currentIndex = allNotes.indexOf(note);
    const newIndex = (currentIndex + semitones) % 12;
    return allNotes[newIndex];
  });

  return {
    ...scale,
    name: `${transposedNotes[0]} ${scale.type.charAt(0).toUpperCase() + scale.type.slice(1)}`,
    notes: transposedNotes
  };
};
