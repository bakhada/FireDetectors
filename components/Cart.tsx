
import React from 'react';
import { X, Trash2, ShoppingBag, ExternalLink } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, q: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((acc, item) => acc + (item.priceNumeric * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag size={20} className="text-red-600" />
              Your Safety Kit
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                  <ShoppingBag size={32} className="text-slate-200" />
                </div>
                <p className="text-slate-500 font-medium">Your basket is empty.<br/>Protect your home today!</p>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-800 truncate mb-1">{item.name}</h3>
                      <p className="text-sm font-bold text-slate-900 mb-2">€{(item.priceNumeric * item.quantity).toFixed(2)}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-slate-200 rounded-md">
                          <button 
                            className="px-2 py-1 text-slate-500 hover:bg-slate-50"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </button>
                          <span className="px-2 py-1 text-xs font-bold w-8 text-center">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 text-slate-500 hover:bg-slate-50"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="px-6 py-6 border-t border-slate-100 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-slate-500 text-sm font-medium">Subtotal</span>
                <span className="text-2xl font-bold text-slate-900">€{total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-400">Shipping calculated at checkout on our partner stores.</p>
              <button className="w-full bg-red-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                Checkout Now <ExternalLink size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
