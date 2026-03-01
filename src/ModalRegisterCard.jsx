import React, { useState } from 'react';

export default function ModalRegisterCard({ isOpen, onClose, onSave }) {
  const [newCardName, setNewCardName] = useState("");
  const [detectedUid, setDetectedUid] = useState("Scanning..."); // Nanti diupdate via Socket.io

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCardName) return alert("Nama tidak boleh kosong!");
    
    // Kirim data ke parent (AccessControl)
    onSave({ uid: detectedUid, name: newCardName });
    
    // Reset form
    setNewCardName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="bg-slate-800 border border-slate-700 w-full max-w-md p-8 rounded-3xl z-10 shadow-2xl transform transition-all scale-100 animate-in zoom-in duration-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 font-robotoflex">Register New Card</h2>
          <p className="text-slate-400 text-sm">Tap the RFID card to the reader device</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Status Scanning Visual */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-dashed border-blue-500/40 flex flex-col items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full bg-blue-500 animate-ping mb-2 ${detectedUid !== "Scanning..." && 'animate-none bg-green-500'}`}></div>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">UID Hardware Detected</p>
            <p className={`text-xl font-mono tracking-widest ${detectedUid === "Scanning..." ? 'text-slate-600' : 'text-blue-400'}`}>
              {detectedUid}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-xs font-semibold ml-1 uppercase">Owner Name</label>
            <input 
              autoFocus
              type="text" 
              value={newCardName}
              onChange={(e) => setNewCardName(e.target.value)}
              placeholder="e.g. Bangun W.J." 
              className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 py-4 rounded-2xl font-bold transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/30"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}