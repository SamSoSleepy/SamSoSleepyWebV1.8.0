import React, { useState, useEffect } from 'react';

export function OtherPage() {
  const [errorLogs, setErrorLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate error logs being added
    const logs = [
      '[INFO] System initialized successfully',
      '[DEBUG] Loading configuration files...',
      '[INFO] Music player module loaded',
      '[WARNING] Auto-play may be blocked by browser',
      '[INFO] Navigation system active',
      '[DEBUG] Card components rendered',
      '[INFO] All systems operational',
      '[ERROR] Sample error for demonstration',
      '[INFO] Error log system active'
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < logs.length) {
        setErrorLogs(prev => [...prev, logs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-24 px-6 pb-12 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl pixel-font text-center text-white mb-12">
          System Status & Controls
        </h1>
        
        {/* Music Control Info */}
        <div className="deltarune-card p-6">
          <h2 className="text-xl pixel-font text-blue-300 mb-4">Audio System</h2>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Background music system is active
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Music player controls located at bottom-right corner
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              Auto-play enabled after user interaction
            </p>
          </div>
          <p className="text-gray-400 text-sm mt-4 italic">
            🎵 Deltarune soundtrack playing across all pages
          </p>
        </div>

        {/* Error Log Section */}
        <div className="deltarune-card p-6">
          <h2 className="text-xl pixel-font text-blue-300 mb-4">System Log</h2>
          <div className="terminal-style max-h-80 overflow-y-auto">
            {errorLogs.filter(log => log && typeof log === 'string').map((log, index) => (
              <div key={index} className="mb-1">
                <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>{' '}
                <span className={
                  log.includes('[ERROR]') ? 'text-red-400' :
                  log.includes('[WARNING]') ? 'text-yellow-400' :
                  log.includes('[INFO]') ? 'text-cyan-400' :
                  'text-green-400'
                }>
                  {log}
                </span>
              </div>
            ))}
            <div className="text-green-400 animate-pulse">▋</div>
          </div>
        </div>

        {/* System Information */}
        <div className="deltarune-card p-6">
          <h2 className="text-xl pixel-font text-blue-300 mb-4">System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <span className="text-blue-300">Status:</span> Online
            </div>
            <div>
              <span className="text-blue-300">Version:</span> 1.8.0
            </div>
            <div>
              <span className="text-blue-300">Dev:</span> SamSoSleepy
            </div>
            <div>
              <span className="text-blue-300">Last Update:</span> {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}