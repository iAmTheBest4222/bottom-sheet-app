import React from 'react';
import BottomSheet from './BottomSheet';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=256&q=80',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&q=80',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&q=80',
  },
  {
    id: 4,
    name: 'VR Headset',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=facearea&w=256&q=80',
  },
  {
    id: 5,
    name: 'Portable Charger',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=facearea&w=256&q=80',
  },
];

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-end">
      <div className="w-full max-w-md mx-auto">
        <BottomSheet title="Product List" products={products} />
      </div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-neutral-400 tracking-widest">
        BOTTOM SHEET DEMO
      </div>
    </div>
  );
}

export default App;
