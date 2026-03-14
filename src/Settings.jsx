import React, { useState } from 'react';
import SecurityLogs from './SecurityLogs';
import ThresholdAlert from './ThresholdAlert';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="bg-slate-900 min-h-full pt-20 px-[5%] flex flex-col gap-8 pb-20">
      <div className="py-6 border-b border-slate-800">
        <h1 className="text-slate-200 text-5xl font-robotoflex font-semibold tracking-tight">
          System <span className="text-blue-500">Settings</span>
        </h1>
        <p className="text-slate-400 font-notosans font-light text-sm mt-2">Manage your hardware, security protocols, and alerts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 p-2 rounded-2xl border border-slate-700 sticky top-24">
            {['general', 'threshold', 'security'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-6 py-4 rounded-xl font-semibold transition-all mb-1 uppercase text-xs tracking-widest
                  ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-700'}`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'general' && (
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-slate-200 font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> MQTT Broker Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-slate-500 text-[10px] font-bold uppercase ml-1 tracking-widest">Broker URL</label>
                  <input type="text" defaultValue="broker.emqx.io" className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all font-mono text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-slate-500 text-[10px] font-bold uppercase ml-1 tracking-widest">Port</label>
                  <input type="number" defaultValue="1883" className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all font-mono text-sm" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'threshold' && <ThresholdAlert />}
          {activeTab === 'security' && <SecurityLogs />}

          {/* Action Footer */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95">
              Apply Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
