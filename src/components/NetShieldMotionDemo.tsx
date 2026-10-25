import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Flame,
  Globe,
  Radio,
  CheckCircle2,
  Terminal,
  Cpu,
} from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

export default function NetShieldMotionDemo() {
  const [isActive, setIsActive] = useState(true);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'benchmarks' | 'rules'>('visualizer');

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#070A14] shadow-2xl overflow-hidden relative">
      {/* Background ambient lighting */}
      <div
        className={`absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[100px] transition-colors duration-700 pointer-events-none ${
          isActive ? 'bg-emerald-500/10' : 'bg-red-500/10'
        }`}
      />
      <div
        className={`absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-[100px] transition-colors duration-700 pointer-events-none ${
          isActive ? 'bg-blue-500/10' : 'bg-amber-500/10'
        }`}
      />

      {/* Header bar */}
      <div className="px-6 py-5 border-b border-slate-800/80 bg-slate-950/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isActive ? [0, 5, -5, 0] : 0 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className={`p-2.5 rounded-xl border transition-colors ${
              isActive
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                : 'bg-red-950/60 border-red-500/40 text-red-400'
            }`}
          >
            {isActive ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-outfit text-white">
                NetShield Interactive Network Engine
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-blue-300 font-medium">
                v4.0.0
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive simulator of Windows DNS leak elimination and firewall enforcement
            </p>
          </div>
        </div>

        {/* Master Active / Inactive Switch */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="text-xs font-mono text-slate-400">
            {isActive ? 'Shield Active' : 'Shield Inactive'}
          </span>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors cursor-pointer border ${
              isActive
                ? 'bg-emerald-600 border-emerald-400/50 shadow-sm shadow-emerald-500/30'
                : 'bg-slate-800 border-slate-700'
            }`}
            role="switch"
            aria-checked={isActive}
            title="Toggle NetShield Protection"
          >
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md ${
                isActive ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Subnav Tabs */}
      <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-900/40 border-b border-slate-800/60 text-xs font-mono">
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'visualizer'
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Packet Visualizer
        </button>
        <button
          onClick={() => setActiveTab('benchmarks')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'benchmarks'
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Audit Benchmark Results
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'rules'
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Firewall & SMHNR Core
        </button>

        <a
          href="https://github.com/ali25cit235-boop/NetShield-DNS-Guard"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Tab 1: Interactive Packet Visualizer */}
      {activeTab === 'visualizer' && (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Top Status Banner */}
          <div
            className={`p-4 rounded-2xl border transition-all duration-300 ${
              isActive
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                : 'bg-red-950/25 border-red-500/30 text-red-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {isActive ? (
                  <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <Unlock className="w-5 h-5 text-red-400 shrink-0" />
                )}
                <div>
                  <p className="text-sm font-bold font-outfit">
                    {isActive
                      ? 'PROTECTED: Kernel Port-53 Killswitch & Dynamic Geo-DNS Active'
                      : 'VULNERABLE: Transparent ISP DNS Hijacking & SMHNR Leak Active'}
                  </p>
                  <p className="text-xs text-slate-300">
                    {isActive
                      ? 'All outbound UDP 53 blocked via netsh advfirewall. Queries routed via 127.0.0.1:53 local DoH.'
                      : 'Windows is leaking DNS requests through the default physical gateway to the local ISP.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400">Score:</span>
                <span className={isActive ? 'text-emerald-400' : 'text-red-400'}>
                  {isActive ? '100% Zero-Leak' : '70% High Risk'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Network Diagram with Animated Packets */}
          <div className="relative p-6 sm:p-8 rounded-2xl bg-[#05070F] border border-slate-800/80 overflow-hidden">
            {/* Animated Grid lines background */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Node 1: Client Host (Windows 11) */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-400">CLIENT HOST</span>
                  <Cpu className="w-4 h-4 text-slate-400" />
                </div>
                <h4 className="text-sm font-bold text-white">Windows 10/11 OS</h4>
                <p className="text-xs text-slate-400">DNS Client Daemon</p>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-300">
                  <span>Resolver: </span>
                  <span className={isActive ? 'text-emerald-400' : 'text-amber-400'}>
                    {isActive ? '127.0.0.1:53 (DoH)' : '192.168.1.1 (Gateway)'}
                  </span>
                </div>
              </div>

              {/* Node 2: NetShield Enforcement Barrier / Engine */}
              <div
                className={`p-5 rounded-2xl border transition-all text-center space-y-3 relative ${
                  isActive
                    ? 'bg-gradient-to-b from-blue-950/30 to-emerald-950/30 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                    : 'bg-gradient-to-b from-slate-900/40 to-red-950/20 border-red-500/30'
                }`}
              >
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-slate-950 border border-slate-800 mx-auto">
                  {isActive ? (
                    <Flame className="w-6 h-6 text-emerald-400 animate-pulse" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold font-outfit text-white">
                    {isActive ? 'NetShield Kernel Shield' : 'Bypass / Inactive'}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {isActive ? 'Port 53 Kill-Switch: ENGAGED' : 'Port 53: UNRESTRICTED'}
                  </p>
                </div>

                {/* Animated Packet Stream Graphic */}
                <div className="w-full h-8 bg-slate-950/80 rounded-lg border border-slate-800/80 relative overflow-hidden flex items-center justify-center">
                  <AnimatePresence>
                    {isActive ? (
                      <motion.div
                        key="active-packets"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 100, opacity: [0, 1, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
                        className="absolute h-2 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-sm shadow-emerald-400"
                      />
                    ) : (
                      <motion.div
                        key="leaking-packets"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 100, opacity: [0, 1, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                        className="absolute h-2 w-8 rounded-full bg-gradient-to-r from-red-500 to-amber-500 shadow-sm shadow-red-400"
                      />
                    )}
                  </AnimatePresence>
                  <span className="text-[10px] font-mono text-slate-500 z-10">
                    {isActive ? 'ENCRYPTED DOH TUNNEL' : 'LEAKING UNPROTECTED UDP'}
                  </span>
                </div>
              </div>

              {/* Node 3: Outbound Resolution Target */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-400">OUTBOUND DESTINATION</span>
                  <Globe className="w-4 h-4 text-slate-400" />
                </div>
                <h4 className="text-sm font-bold text-white">
                  {isActive ? 'UK / Target Residential DNS' : 'Local ISP DNS Gateway'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isActive ? 'Virgin Media / TalkTalk (Aligned)' : 'Pakistani ISP (Exposed Mismatch)'}
                </p>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                  <span>Geo-Match: </span>
                  <span className={isActive ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                    {isActive ? '100% MATCHED' : 'COUNTRY MISMATCH (-30%)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Audit Benchmark Results */}
      {activeTab === 'benchmarks' && (
        <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <div>
            <h4 className="text-lg font-bold font-outfit text-white mb-1">
              Network Fingerprinting & Anti-Fraud Suite Verification
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tested against industry-standard anti-fraud intelligence databases (<code className="text-blue-300">Whoer</code>, <code className="text-blue-300">IPInfo</code>, <code className="text-blue-300">Scamalytics</code>) before and after running NetShield.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Metric / Check</th>
                  <th className="p-3.5 text-red-400">Default Windows + Proxy</th>
                  <th className="p-3.5 text-emerald-400">After NetShield Activation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/30 text-slate-300">
                <tr>
                  <td className="p-3.5 font-medium text-white">Outbound IP / ASN</td>
                  <td className="p-3.5">Residential (TalkTalk UK)</td>
                  <td className="p-3.5 text-emerald-300 font-semibold">Residential (TalkTalk UK)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-white">OS DNS Resolution</td>
                  <td className="p-3.5 text-red-400">❌ Leaking Local ISP Gateway (-30%)</td>
                  <td className="p-3.5 text-emerald-400">✅ 100% Geo-Matched UK DNS</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-white">Port 53 UDP Queries</td>
                  <td className="p-3.5 text-red-400">❌ Intercepted by ISP</td>
                  <td className="p-3.5 text-emerald-400">✅ Blocked by Kernel Firewall Kill-Switch</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-white">SMHNR Multi-Interface Leak</td>
                  <td className="p-3.5 text-red-400">❌ Active (Windows queries all NICs)</td>
                  <td className="p-3.5 text-emerald-400">✅ Neutralized via Registry Policy</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-white">Overall Disguise Score</td>
                  <td className="p-3.5 font-bold text-red-400">70% (High Risk Flag)</td>
                  <td className="p-3.5 font-bold text-emerald-400">100% (Zero Leaks Detected)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Firewall & SMHNR Core Code */}
      {activeTab === 'rules' && (
        <div className="p-6 sm:p-8 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold font-outfit text-white">
                Core Windows Kernel & Registry Commands
              </h4>
              <p className="text-xs text-slate-400">
                The actual system-level commands executed automatically by NetShield
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400">Admin Privileges</span>
          </div>

          <div className="p-4 rounded-xl bg-[#060810] border border-slate-800 text-xs font-mono leading-relaxed text-slate-300 overflow-x-auto">
            <pre>
              <code>{`# 1. Block outbound Port 53 UDP leaks to physical router / ISP gateway
netsh advfirewall firewall add rule name="NetShield_Block_Port53_UDP" dir=out action=block protocol=UDP remoteport=53

# 2. Block outbound Port 53 TCP fallback
netsh advfirewall firewall add rule name="NetShield_Block_Port53_TCP" dir=out action=block protocol=TCP remoteport=53

# 3. Disable Windows Smart Multi-Homed Name Resolution (SMHNR) via Winreg
reg add "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\DNSClient" /v DisableSmartNameResolution /t REG_DWORD /d 1 /f

# 4. Bind Loopback Local DNS-over-HTTPS daemon
netsh interface ip set dns name="Ethernet" static 127.0.0.1 primary
ipconfig /flushdns`}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Footer bar with GitHub repository launch button */}
      <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="font-mono text-slate-400">
          Open Source Utility on GitHub · MIT License · Windows 10/11
        </span>
        <a
          href="https://github.com/ali25cit235-boop/NetShield-DNS-Guard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all cursor-pointer shadow-sm shadow-blue-500/20"
        >
          <span>Explore GitHub Repository</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
