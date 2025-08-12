import React, { useState } from 'react';
import { musicScales, MusicScale, getScalesByType } from '../data/musicScales';

const SpreadOperatorExample: React.FC = () => {
  const [selectedType, setSelectedType] = useState<MusicScale['type']>('major');
  const [customScale, setCustomScale] = useState<MusicScale>({
    name: 'Custom Scale',
    notes: ['C', 'D', 'E'],
    type: 'major',
    description: 'A custom scale'
  });

  // Spread operator examples

  // 1. Spreading arrays
  const majorScales = getScalesByType('major');
  const minorScales = getScalesByType('minor');
  const allScales = [...majorScales, ...minorScales]; // Combining arrays

  // 2. Spreading objects
  const baseScale = {
    name: 'Base Scale',
    notes: ['C', 'D', 'E'],
    type: 'major' as const,
    description: 'Base description'
  };

  const extendedScale = {
    ...baseScale, // Spread existing properties
    name: 'Extended Scale', // Override specific property
    notes: [...baseScale.notes, 'F', 'G'] // Spread and extend array
  };

  // 3. Spreading in function arguments
  const createScaleWithNotes = (scale: MusicScale, ...additionalNotes: string[]) => {
    return {
      ...scale,
      notes: [...scale.notes, ...additionalNotes]
    };
  };

  // 4. Spreading in state updates
  const addNoteToCustomScale = (note: string) => {
    setCustomScale(prevScale => ({
      ...prevScale,
      notes: [...prevScale.notes, note]
    }));
  };

  // 5. Spreading with conditional properties
  const createScaleWithOptionalProps = (scale: MusicScale, includeDescription = true) => {
    return {
      ...scale,
      ...(includeDescription && { description: `${scale.name} - ${scale.type} scale` })
    };
  };

  // 6. Spreading to create new objects with modifications
  const scalesWithId = musicScales.map((scale, index) => ({
    ...scale,
    id: index + 1,
    noteCount: scale.notes.length
  }));

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Spread Operator Examples</h2>
      
      {/* Example 1: Array spreading */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">1. Array Spreading</h3>
        <p className="mb-2">Combining major and minor scales:</p>
        <div className="bg-white p-3 rounded border">
          <code className="text-sm">
            const allScales = [...majorScales, ...minorScales];
          </code>
          <p className="mt-2 text-sm text-gray-600">
            Total scales: {allScales.length} (Major: {majorScales.length}, Minor: {minorScales.length})
          </p>
        </div>
      </div>

      {/* Example 2: Object spreading */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">2. Object Spreading</h3>
        <div className="bg-white p-3 rounded border">
          <p className="mb-2"><strong>Base Scale:</strong></p>
          <pre className="text-sm bg-gray-100 p-2 rounded mb-2">
            {JSON.stringify(baseScale, null, 2)}
          </pre>
          <p className="mb-2"><strong>Extended Scale (using spread):</strong></p>
          <pre className="text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(extendedScale, null, 2)}
          </pre>
        </div>
      </div>

      {/* Example 3: Function arguments spreading */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">3. Rest Parameters & Spreading</h3>
        <div className="bg-white p-3 rounded border">
          <p className="mb-2">Adding notes to C Major scale:</p>
          <pre className="text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(createScaleWithNotes(musicScales[0], 'C#', 'F#'), null, 2)}
          </pre>
        </div>
      </div>

      {/* Example 4: State updates with spread */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">4. State Updates with Spread</h3>
        <div className="bg-white p-3 rounded border">
          <p className="mb-2">Custom Scale: {customScale.notes.join(' - ')}</p>
          <button 
            onClick={() => addNoteToCustomScale('F')}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm mr-2"
          >
            Add F
          </button>
          <button 
            onClick={() => addNoteToCustomScale('G')}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Add G
          </button>
        </div>
      </div>

      {/* Example 5: Conditional spreading */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">5. Conditional Spreading</h3>
        <div className="bg-white p-3 rounded border">
          <p className="mb-2">Scale with conditional description:</p>
          <pre className="text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(createScaleWithOptionalProps(musicScales[0], true), null, 2)}
          </pre>
        </div>
      </div>

      {/* Example 6: Mapping with spread */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">6. Mapping with Spread</h3>
        <div className="bg-white p-3 rounded border">
          <p className="mb-2">Scales with added properties:</p>
          <div className="max-h-40 overflow-y-auto">
            {scalesWithId.slice(0, 3).map(scale => (
              <div key={scale.id} className="text-sm mb-1">
                <span className="font-mono">{scale.name}</span> - {scale.noteCount} notes
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive example */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">7. Interactive Example</h3>
        <div className="bg-white p-3 rounded border">
          <label className="block mb-2">
            Select scale type:
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value as MusicScale['type'])}
              className="ml-2 px-2 py-1 border rounded"
            >
              <option value="major">Major</option>
              <option value="minor">Minor</option>
              <option value="pentatonic">Pentatonic</option>
              <option value="blues">Blues</option>
            </select>
          </label>
          <div className="text-sm">
            {getScalesByType(selectedType).map(scale => (
              <div key={scale.name} className="mb-1">
                <strong>{scale.name}:</strong> {scale.notes.join(' - ')}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpreadOperatorExample;
