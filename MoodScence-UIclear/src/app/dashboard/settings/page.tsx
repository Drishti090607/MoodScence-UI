export default function SettingsPage() {
  return (
    <div className="animate-fade-in relative z-10 w-full max-w-4xl mx-auto mt-12">
      <div className="glass-panel p-12 rounded-[32px] text-center border-white/10 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500" />
        <div className="text-6xl mb-6">⚙️</div>
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">System Settings</h1>
        <p className="text-slate-400 font-medium text-lg max-w-lg mx-auto">
          User configuration parameters are strictly locked during initial deployment mode. Authentication features coming soon.
        </p>
      </div>
    </div>
  );
}
