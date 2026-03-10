import React, { useState } from 'react';

export default function ModalAddButton({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    pin_number: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.pin_number) return alert("Semua field harus diisi!");
    
    onSave(formData);
    setFormData({ name: "", pin_number: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="bg-slate-800 border border-slate-700 w-full max-w-md p-8 rounded-3xl z-10 shadow-2xl transform transition-all scale-100 animate-in zoom-in duration-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 font-robotoflex">Add New Switch</h2>
          <p className="text-slate-400 text-sm">Assign a name and GPIO pin for the actuator</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-xs font-semibold ml-1 uppercase">Device Name</label>
            <input 
              autoFocus
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Lampu Teras" 
              className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-xs font-semibold ml-1 uppercase">GPIO / Pin Number</label>
            <input 
              type="text" 
              value={formData.pin_number}
              onChange={(e) => setFormData({...formData, pin_number: e.target.value})}
              placeholder="e.g. GPIO 2 / Pin 12" 
              className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 py-4 rounded-2xl font-bold transition-all">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/30">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}