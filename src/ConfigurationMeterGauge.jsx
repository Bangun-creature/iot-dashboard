export default function ConfigurationMeterGauge({isOpen, onClose, idMeterConfiguration}){
    if (!isOpen) return null;

    return(
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="bg-slate-800 border border-slate-700 w-full max-w-md p-8 rounded-3xl z-10 shadow-2xl transform transition-all scale-100 animate-in zoom-in duration-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 font-robotoflex">Meter Gauge Id: {idMeterConfiguration}</h2>
          <p className="text-slate-400 text-sm">Ini konfigurasi path komunikasi MQTT:</p>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-slate-400 text-xs font-semibold ml-1 capital">Website ke ESP32</p>
            <div className="flex flex-col gap-3">
                <p className="text-slate-100 text-sm">Publisher:</p>
                <p className="text-slate-100 font-medium text-sm bg-slate-900 py-2 px-4 rounded-lg">/unnes/iot/meter/{idMeterConfiguration}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-slate-100 text-sm">Subscriber:</p>
                <p className="text-slate-100 font-medium text-sm bg-slate-900 py-2 px-4 rounded-lg">/unnes/iot/meter/{idMeterConfiguration}</p>
            </div>
            
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-slate-400 text-xs font-semibold ml-1 capital">ESP32 ke Website</p>
            <div className="flex flex-col gap-3">
                <p className="text-slate-100 text-sm">Publisher:</p>
                <p className="text-slate-100 font-medium text-sm bg-slate-900 py-2 px-4 rounded-lg">/unnes/iot-e/meter/{idMeterConfiguration}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-slate-100 text-sm">Subscriber:</p>
                <p className="text-slate-100 font-medium text-sm bg-slate-900 py-2 px-4 rounded-lg">/unnes/iot-e/meter/{idMeterConfiguration}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}