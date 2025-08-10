import React, { useMemo } from 'react';

// Example interface for props
interface Item {
  id: number;
  name: string;
}

// Example component to be mapped
const ItemComponent: React.FC<{ item: Item }> = ({ item }) => (
  <div className="p-2 m-2 bg-blue-100 rounded shadow">
    {item.name}
  </div>
);

function App() {
  // Example data array

  // Memoize items array
  const items: Item[] = useMemo(() => [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
  ], []);

  // useMemo example: compute a derived value
  const itemCount = useMemo(() => items.length, [items]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Vite + React + TypeScript + Tailwind</h1>
      <p className="mb-2">Total items: <span className="font-mono">{itemCount}</span></p>
      <div className="flex flex-wrap gap-2">
        {/* .map() of components */}
        {items.map(item => (
          <ItemComponent key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
