import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ModalAddButton from './ModalAddButton'; // Pastikan path benar
import ConfigurationButton from './ConfigurationButton';

export default function DeviceControl() {
  const [switches, setSwitches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigurationOpen, setIsConfigurationOpen] = useState(false);
  const [idButtonConfiguration, setIdButtonConfiguration] = useState(null);

  const loadedDataButton = async () => {
    try {
      const rawData = await axios.get('http://localhost:3000/api/buttons');
      setSwitches(rawData.data.payload.datas);
    } catch (error) {
      console.log(`Error loading buttons: ${error}`);
    }
  };

  useEffect(() => {
    loadedDataButton();
  }, []);

  // Fungsi yang akan dipanggil dari Modal
  const handleSaveNewButton = async (data) => {
    if (switches.length >= 8) {
      return alert("Maksimal 8 tombol!");
    }

    const newButton = {
      name: data.name,
      pin_number: data.pin_number,
      status: 0, // Default mati
    };

    try {
      const response = await axios.post(`http://localhost:3000/api/buttons`, newButton);
      
      // Update UI dengan ID yang didapat dari backend
      const buttonWithId = { ...newButton, id: response.data.payload.insertId || Date.now() };
      setSwitches([...switches, buttonWithId]);
      
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding button:", error);
      alert("Gagal menambah tombol ke database");
    }
  };

  const toggleSwitch = async (id) => {
    const itemSwitch = switches.find((sw) => sw.id == id);
    const newStatus = itemSwitch.status == 1 ? 0 : 1;

    // Optimistic Update UI
    setSwitches(switches.map((sw) => (sw.id == id ? { ...sw, status: newStatus } : sw)));

    try {
      await axios.post(`http://localhost:3000/api/buttons/${id}/control`, {
        status: newStatus,
        name: itemSwitch.name
      });
    } catch (error) {
      console.log(`Error toggling switch: ${error}`);
      // Revert UI if failed
      setSwitches(switches.map((sw) => (sw.id == id ? { ...sw, status: itemSwitch.status } : sw)));
    }
  };

  const removeSwitch = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/buttons/${id}`);
      setSwitches(switches.filter(sw => sw.id !== id));
    } catch (error) {
      console.log(`Error deleting button: ${error}`);
    }
  };

  // OpenConfiguration
  function handleConfigurationOpen(id){
    setIsConfigurationOpen(true);
    setIdButtonConfiguration(id)
    console.log(`Id ${id}`)
  }

  return (
    <div className="bg-slate-900 min-h-full pt-20 px-[5%] flex flex-col gap-8">
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-slate-200 text-5xl font-robotoflex font-semibold">Device Control</h1>
          <p className="text-slate-200/70 font-notosans font-light text-sm mt-2">
            Manage up to 8 IoT actuators. Total active: {switches.length}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={switches.length >= 8}
          className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2
            ${switches.length >= 8 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'}`}
        >
          <span className="text-xl">+</span> Add Switch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
        {switches.map((sw) => (
          <div key={sw.id} className="bg-slate-800 border border-slate-700 p-5 rounded-2xl flex flex-col gap-4 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-slate-200 font-semibold">{sw.name}</h3>
                <p className="text-xs text-slate-500 font-mono uppercase tracking-tighter">Pin: {sw.pin_number}</p>
              </div>
              <button onClick={() => removeSwitch(sw.id)} className="text-slate-600 hover:text-red-400 text-xs transition-colors">
                Remove
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className={`text-sm font-bold uppercase ${sw.status == 1 ? 'text-blue-400' : 'text-slate-500'}`}>
                {sw.status == 1 ? 'Active' : 'Inactive'}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={sw.status == 1} onChange={() => toggleSwitch(sw.id)} />
                <div className="w-14 h-7 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className={`h-1 w-full rounded-full mt-2 transition-all duration-500 ${sw.status == 1 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-700'}`}></div>
            <button onClick={()=>{handleConfigurationOpen(sw.id)}} className='text-slate-100 text-xs font-medium font-notosans bg-emerald-600 rounded-lg w-fit px-2 py-1'>Configuration</button>
          </div>
        ))}
      </div>
      <ConfigurationButton 
      isOpen={isConfigurationOpen}
      onClose={()=> setIsConfigurationOpen(false)}
      idButtonConfiguration={idButtonConfiguration}
      />

      <ModalAddButton 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveNewButton} 
      />
    </div>
  );
}