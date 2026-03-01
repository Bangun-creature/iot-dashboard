import React from 'react';

export default function ThresholdAlert() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
        <h3 className="text-slate-200 font-semibold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
          Electrical Safety Threshold
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Voltage Threshold */}
          <div className="space-y-4">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Voltage Protection (VAC)</p>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-slate-500 text-[10px] ml-1">MIN (Under-voltage)</label>
                <input type="number" defaultValue="180" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-yellow-500 outline-none transition-all" />
              </div>
              <div className="flex-1">
                <label className="text-slate-500 text-[10px] ml-1">MAX (Over-voltage)</label>
                <input type="number" defaultValue="240" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-yellow-500 outline-none transition-all" />
              </div>
            </div>
          </div>

          {/* Current Threshold */}
          <div className="space-y-4">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Current Limit (Ampere)</p>
            <div>
              <label className="text-slate-500 text-[10px] ml-1">MAX LOAD (Trip Point)</label>
              <input type="number" defaultValue="10" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-red-500 outline-none transition-all" />
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-start gap-3">
          <span className="text-yellow-500 text-lg font-bold">!</span>
          <p className="text-slate-400 text-xs leading-relaxed">
            Sistem akan secara otomatis mengirim sinyal <strong>Emergency Off</strong> ke Relay jika nilai sensor melewati batas Max/Min yang ditentukan.
          </p>
        </div>
      </section>
    </div>
  );
}