import React, { useState, useMemo } from 'react';
import { 
  musicScales, 
  getScalesByType, 
  getScaleByName, 
  transposeScale 
} from '../data/musicScales';
import type { MusicScale } from '../data/musicScales';

const MusicScalesExample: React.FC = () => {
  const [selectedScale, setSelectedScale] = useState<string>('C Major');
  const [transposeAmount, setTransposeAmount] = useState<number>(0);
  const [filterType, setFilterType] = useState<MusicScale['type'] | 'all'>('all');

  // Using the data from the .ts file
  const currentScale = useMemo(() => 
    getScaleByName(selectedScale), [selectedScale]
  );

  const transposedScale = useMemo(() => 
    currentScale && transposeAmount !== 0 
      ? transposeScale(currentScale, transposeAmount)
      : currentScale, 
    [currentScale, transposeAmount]
  );

  const filteredScales = useMemo(() => 
    filterType === 'all' 
      ? musicScales 
      : getScalesByType(filterType), 
    [filterType]
  );

  // Statistics derived from the data
  const scaleStats = useMemo(() => {
    const stats = {
      total: musicScales.length,
      byType: {
        major: getScalesByType('major').length,
        minor: getScalesByType('minor').length,
        pentatonic: getScalesByType('pentatonic').length,
        blues: getScalesByType('blues').length,
      },
      averageNotes: Math.round(
        musicScales.reduce((sum, scale) => sum + scale.notes.length, 0) / musicScales.length
      )
    };
    return stats;
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Music Scales Data Example</h2>
      <p className="mb-4 text-gray-600">
        This demonstrates reading data from a separate .ts file and using it in React components.
      </p>

      {/* Statistics Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">📊 Scale Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{scaleStats.total}</div>
            <div className="text-sm text-gray-600">Total Scales</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{scaleStats.byType.major}</div>
            <div className="text-sm text-gray-600">Major Scales</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{scaleStats.byType.minor}</div>
            <div className="text-sm text-gray-600">Minor Scales</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{scaleStats.averageNotes}</div>
            <div className="text-sm text-gray-600">Avg Notes</div>
          </div>
        </div>
      </div>

      {/* Scale Selection and Display */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">🎵 Scale Explorer</h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Scale:</label>
              <select 
                value={selectedScale}
                onChange={(e) => setSelectedScale(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {musicScales.map(scale => (
                  <option key={scale.name} value={scale.name}>
                    {scale.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Transpose (semitones):</label>
              <input 
                type="range" 
                min="-12" 
                max="12" 
                value={transposeAmount}
                onChange={(e) => setTransposeAmount(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600 mt-1">
                {transposeAmount > 0 ? `+${transposeAmount}` : transposeAmount}
              </div>
            </div>
          </div>

          {currentScale && (
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">
                {transposedScale?.name || currentScale.name}
              </h4>
              <div className="flex flex-wrap gap-2 mb-2">
                {(transposedScale?.notes || currentScale.notes).map((note, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-mono"
                  >
                    {note}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {currentScale.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Filtered Scales List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">🔍 Filter Scales</h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Filter by Type:</label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'major', 'minor', 'pentatonic', 'blues'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filterType === type
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredScales.map(scale => (
              <div 
                key={scale.name}
                className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
                onClick={() => setSelectedScale(scale.name)}
              >
                <h5 className="font-semibold text-sm mb-1">{scale.name}</h5>
                <div className="text-xs text-gray-600 mb-2">
                  {scale.notes.join(' - ')}
                </div>
                <span className={`inline-block px-2 py-1 rounded text-xs ${
                  scale.type === 'major' ? 'bg-green-100 text-green-800' :
                  scale.type === 'minor' ? 'bg-purple-100 text-purple-800' :
                  scale.type === 'pentatonic' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {scale.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">💻 Code Example</h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
{`// Import data from .ts file
import { musicScales, getScalesByType } from '../data/musicScales';

// Use the data in your component
const majorScales = getScalesByType('major');
const allScales = musicScales;

// Filter and transform data
const scalesWithMoreThan5Notes = musicScales.filter(
  scale => scale.notes.length > 5
);

// Create derived data
const scaleTypes = [...new Set(musicScales.map(scale => scale.type))];`}
          </pre>
        </div>
      </div>

      {/* Data Structure Info */}
      <div>
        <h3 className="text-lg font-semibold mb-3">📋 Data Structure</h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 mb-2">
            The music scales data is stored in a separate TypeScript file with this structure:
          </p>
          <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
{`interface MusicScale {
  name: string;
  notes: string[];
  type: 'major' | 'minor' | 'pentatonic' | 'blues';
  description: string;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default MusicScalesExample;
