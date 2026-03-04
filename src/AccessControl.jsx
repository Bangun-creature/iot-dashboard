import React, { useState } from 'react';
import ModalRegisterCard from './ModalRegisterCard';
import axios from 'axios';

export default function AccessControl() {
  // Data user terakhir yang melakukan TAP (Real-time Simulation)
  const [lastTap, setLastTap] = useState({
    id: "88:AA:BB:CC",
    user: "Bangun W.J.",
    status: "Granted",
    time: "10:45:12 AM"
  });

  // Daftar Log Akses
  const [logs, setLogs] = useState([
    { id: 1, uid: "88:AA:BB:CC", user: "Bangun W.J.", time: "10:45:12 AM", status: "Granted" },
    { id: 2, uid: "12:34:56:78", user: "Unknown", time: "10:30:05 AM", status: "Denied" },
    { id: 3, uid: "99:FF:EE:DD", user: "Romi Indrajaya", time: "09:15:20 AM", status: "Granted" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi yang dipanggil saat user klik Save di dalam Modal
  const handleSaveNewUser = async(data) => {
    // console.log("Data diterima di Parent:", data);
    // // Di sini kamu bisa melakukan integrasi database (POST ke Node.js)
    // alert(`Berhasil mendaftarkan ${data.name} dengan UID ${data.uid}`);

    const rfid = "2900940E95";
    const dataRfid = {
      rfid_code: rfid,
      status: false,
    }

    try {
      const rawData = await axios.post(`http://localhost:3000/api/rfid/save`, dataRfid
      )

      console.log(`Respon rfid : ${JSON.stringify(rawData.data)}`);
    } catch (error) {
      console.log(`There is an error in rfid save new user: ${error}`);
    }
  };

  return (
    <div className="bg-slate-900 min-h-full pt-20 px-[5%] flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-slate-200 text-5xl font-robotoflex font-semibold">Access Control</h1>
        <p className="text-slate-200/70 font-notosans font-light text-sm mt-2">
          Manage RFID permissions and monitor entry logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Current Status Card */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className={`p-8 rounded-3xl border-2 flex flex-col items-center justify-center transition-all duration-500
            ${lastTap.status === "Granted" ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
            
            <div className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center text-3xl
              ${lastTap.status === "Granted" ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {lastTap.status === "Granted" ? "✓" : "✕"}
            </div>
            
            <h2 className="text-slate-200 text-xl font-bold uppercase tracking-widest">Access {lastTap.status}</h2>
            <p className="text-slate-400 font-mono mt-2">{lastTap.id}</p>
            
            <div className="mt-6 text-center">
              <p className="text-slate-200 text-2xl font-semibold">{lastTap.user}</p>
              <p className="text-slate-500 text-sm mt-1">{lastTap.time}</p>
            </div>
          </div>

          {/* <button className="bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 py-4 rounded-2xl font-bold transition-all" onClick={() => setIsModalOpen(true)}>
            + Register New Card
          </button> */}
          <button className="bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 py-4 rounded-2xl font-bold transition-all" onClick={handleSaveNewUser}>
            + Register New Card
          </button>
          {/* <ModalRegisterCard 
           isOpen={isModalOpen} 
           onClose={() => setIsModalOpen(false)} 
           onSave={handleSaveNewUser}
        /> */}
        </div>

        {/* Access Logs Table */}
        <div className="lg:col-span-2 bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
            <h3 className="text-slate-200 font-semibold tracking-wide uppercase text-xs">Recent Activity Logs</h3>
            <button className="text-xs text-blue-400 hover:underline">Clear Logs</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/50 text-slate-500 uppercase text-[10px] tracking-tighter">
                <tr>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">User / UID</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{log.time}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-200">{log.user}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{log.uid}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase
                        ${log.status === 'Granted' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}