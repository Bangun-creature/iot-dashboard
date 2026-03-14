import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function History() {
  const [activeTab, setActiveTab] = useState('sensor'); // 'sensor', 'rfid', atau 'button'

  // Data Dummy Tren Sensor (Meter Gauge History)
  const [listDataMeterGauge, setListDataMeterGauge] = useState([])
  const [listRfid, setListRfid] = useState([]);
  const [listButton, setListButton] = useState([]);

  // GRAPH
  const loadedDataGraph = async()=>{
    try {
      const rawData = await axios.get(`http://localhost:3000/api/history/graph`);

      console.log(`Ini data history graph: ${JSON.stringify(rawData.data.payload.datas)}`);
      setListDataMeterGauge(rawData.data.payload.datas);
    } catch (error) {
      console.log(`There is an error get history graph: ${error}`);
    }
  }

  useEffect(()=>{
    loadedDataGraph();
  },[])

  // RFID
   const handleLoadListRfid = async()=>{
    try {
      const rawData = await axios.get(`http://localhost:3000/api/history/rfid`);
      console.log(`Ini data dari tabel rfid: ${JSON.stringify(rawData.data)}`);
      setListRfid(rawData.data.payload.datas);
    } catch (error) {
      console.log(`There is an error : ${error}`);
    }
  }

  useEffect(()=>{
    handleLoadListRfid();
  },[])

  // BUTTON
  const loadedDataButton = async()=>{
    try {
      const rawData = await axios.get(`http://localhost:3000/api/history/buttons`)
      console.log(`Ini data history button: ${JSON.stringify(rawData.data)}`);
      setListButton(rawData.data.payload.datas)
    } catch (error) {
      console.log(`There is an error history buttons: ${error}`);
    }
  } 

  useEffect(()=>{
    loadedDataButton();
  },[])



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
            {listDataMeterGauge.map((item, index)=>(
          <div key={index} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
            <h3 className="text-slate-200 font-semibold mb-8 uppercase text-xs tracking-[0.2em]">{item.title}</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={item.data}>
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
            ))}
          
          </div>
        )}

        {/* 2. HISTORY RFID (Table) */}
        {activeTab === 'rfid' && listRfid.length > 0 && (
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
                {listRfid.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-700/30 transition-all">
                    <td className="px-8 py-5 font-mono text-xs text-slate-500">{item.updated_at}</td>
                    <td className="px-8 py-5 font-semibold text-slate-200">{item.username}<span className="block text-[10px] font-mono text-slate-500">{item.rfid_code}</span></td>
                    <td className="px-8 py-5"><span className={`${item.status == "true" ? "bg-slate-100 text-green-500" : "bg-slate-100 text-red-500"} px-3 py-1 rounded-full text-[10px] font-bold`}>{item.status == "true" ? "GRANTED" : "FALSE"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. HISTORY BUTTON (Activity Log) */}
        {activeTab === 'button' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listButton.map((item, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === 1 ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-700 text-slate-500'}`}>
                    ⏻
                  </div>
                  <div>
                    <p className="text-slate-200 font-bold text-sm">{item.name}</p>
                    <p className="text-slate-500 text-[10px] uppercase">Action: {item.status === 1 ? 'Turned ON' : 'Turned OFF'}</p>
                  </div>
                </div>
                <p className="text-slate-600 font-mono text-[10px]">{item.updated_at}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}