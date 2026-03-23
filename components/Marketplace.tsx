
import React from 'react';
import { ShoppingBag, Star, MapPin, Filter, Search } from 'lucide-react';

const products = [
  { id: 1, name: 'Hybrid Wheat Seeds (HD-2967)', category: 'Seeds', price: 1250, seller: 'Grover Seeds Ltd.', rating: 4.8, img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=150&h=150' },
  { id: 2, name: 'Organic NPK Fertilizer', category: 'Fertilizer', price: 850, seller: 'GreenLife Agri', rating: 4.5, img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=150&h=150' },
  { id: 3, name: 'Premium Basmati Paddy Seeds', category: 'Seeds', price: 2100, seller: 'Royal Grains', rating: 4.9, img: 'https://images.unsplash.com/photo-1586201327102-330081303844?auto=format&fit=crop&w=150&h=150' },
  { id: 4, name: 'Urea (Technical Grade)', category: 'Fertilizer', price: 450, seller: 'AgroChemicals Corp', rating: 4.2, img: 'https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?auto=format&fit=crop&w=150&h=150' },
];

const Marketplace: React.FC = () => {
  return (
    <div className="space-y-6 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2 dark:text-slate-100">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
          Agri Store & Marketplace
        </h2>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:text-slate-100" />
          </div>
          <button className="p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"><Filter className="w-5 h-5 text-gray-600 dark:text-slate-400" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 p-4 flex gap-4 hover:shadow-md transition-shadow">
              <img src={p.img} alt={p.name} className="w-24 h-24 rounded-lg object-cover bg-gray-100 dark:bg-slate-800" />
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{p.category}</span>
                <h3 className="font-bold text-gray-800 dark:text-slate-100 text-sm leading-tight">{p.name}</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">{p.seller}</p>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3 h-3 fill-current" /> {p.rating}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-black text-gray-900 dark:text-slate-100">₹{p.price}</span>
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 p-5 space-y-4">
          <h4 className="font-bold text-sm text-gray-800 dark:text-slate-100 border-b dark:border-slate-800 pb-2">Nearby Agri Shops</h4>
          <div className="space-y-4">
            {[
              { name: 'Sethi Fertilizers', dist: '1.2 km', rating: 4.9 },
              { name: 'Kisan Seva Kendra', dist: '3.5 km', rating: 4.7 },
              { name: 'Bharat Seeds Corp', dist: '5.1 km', rating: 4.5 }
            ].map((shop, i) => (
              <div key={i} className="flex flex-col gap-1 border-b border-dashed border-gray-100 dark:border-slate-800 pb-3 last:border-0">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-gray-800 dark:text-slate-200">{shop.name}</span>
                  <span className="text-[10px] bg-gray-100 dark:bg-slate-800 px-1.5 rounded dark:text-slate-400">{shop.dist}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-slate-500">
                  <MapPin className="w-3 h-3" /> Mansa Road, Bathinda
                </div>
                <div className="flex items-center gap-1 text-amber-500 text-[10px] font-bold">
                  <Star className="w-2.5 h-2.5 fill-current" /> {shop.rating}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors dark:text-slate-300">View Map Mode</button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
