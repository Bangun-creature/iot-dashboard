import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function History() {
  const [activeTab, setActiveTab] = useState('sensor'); // 'sensor', 'rfid', atau 'button'

  // Data Dummy Tren Sensor (Meter Gauge History)
  const sensorDataVoltage = [
    { time: '08:00', val: 210 }, { time: '10:00', val: 220 },
    { time: '12:00', val: 215 }, { time: '14:00', val: 225 },
    { time: '16:00', val: 218 }, { time: '18:00', val: 222 }, { time: '20:00', val: 2 }
  ];

  const sensorDataCurrent = [
    { time: '08:00', val: 210 }, { time: '10:00', val: 220 },
    { time: '12:00', val: 215 }, { time: '14:00', val: 225 },
    { time: '16:00', val: 218 }, { time: '18:00', val: 222 }, { time: '20:00', val: 2 }
  ];

  const sensorDataTemperature = [
    { time: '08:00', val: 210 }, { time: '10:00', val: 220 },
    { time: '12:00', val: 215 }, { time: '14:00', val: 225 },
    { time: '16:00', val: 218 }, { time: '18:00', val: 222 }, { time: '20:00', val: 2 }
  ];



  return (
    <div className="bg-slate-900 min-h-full pt-20 px-[5%] flex flex-col gap-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800 pb-6 gap-4">
        <div>
          <h1 className="text-slate-200 text-5xl font-robotoflex font-semibold tracking-tight">System <span className="text-blue-500">History</span></h1>
          <p className="text-slate-400 font-notosans font-light text-sm mt-2">Log audit untuk sensor, akses RFID, dan kontrol saklar.</p>
        </div>

        {/* Menu Tab History */}
        <div className="flex bg-slate-800 p-1.5 rounded-2xl border border-slate-700 shadow-inner">
          <button onClick={() => setActiveTab('sensor')} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'sensor' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>GAUGE TRENDS</button>
          <button onClick={() => setActiveTab('rfid')} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'rfid' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>RFID ACCESS</button>
          <button onClick={() => setActiveTab('button')} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'button' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>BUTTON LOGS</button>
        </div>
      </div>

      {/* Konten Berdasarkan Tab yang Dipilih */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* 1. HISTORY METER GAUGE (Grafik) */}
        {activeTab === 'sensor' && (
          <div className='flex flex-col gap-5'>

          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
            <h3 className="text-slate-200 font-semibold mb-8 uppercase text-xs tracking-[0.2em]">Voltage Stability Analysis (24h)</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sensorDataVoltage}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
            <h3 className="text-slate-200 font-semibold mb-8 uppercase text-xs tracking-[0.2em]">Voltage Stability Analysis (24h)</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sensorDataVoltage}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          </div>
        )}

        {/* 2. HISTORY RFID (Table) */}
        {activeTab === 'rfid' && (
          <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="px-8 py-5">Timestamp</th>
                  <th className="px-8 py-5">User / UID</th>
                  <th className="px-8 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-slate-300">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="hover:bg-slate-700/30 transition-all">
                    <td className="px-8 py-5 font-mono text-xs text-slate-500">2026-03-01 09:45:0{i}</td>
                    <td className="px-8 py-5 font-semibold text-slate-200">Bangun W.J. <span className="block text-[10px] font-mono text-slate-500">UID: 88:AA:BB:CC</span></td>
                    <td className="px-8 py-5"><span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold">GRANTED</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. HISTORY BUTTON (Activity Log) */}
        {activeTab === 'button' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i % 2 === 0 ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-700 text-slate-500'}`}>
                    ⏻
                  </div>
                  <div>
                    <p className="text-slate-200 font-bold text-sm">Relay Lampu Utama</p>
                    <p className="text-slate-500 text-[10px] uppercase">Action: {i % 2 === 0 ? 'Turned ON' : 'Turned OFF'}</p>
                  </div>
                </div>
                <p className="text-slate-600 font-mono text-[10px]">10:20 AM</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}