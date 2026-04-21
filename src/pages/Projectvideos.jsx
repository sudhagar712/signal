import { useState, useRef } from 'react';
import { Play, X, Volume2, VolumeX, Sparkles } from 'lucide-react';

// Dynamically import all videos from assets/projectvideo
const videoModules = import.meta.glob('../assets/projectvideo/*.mp4', { eager: true });
const allVideos = Object.values(videoModules).map(m => m.default);

export default function Projectvideos() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="relative pb-20">
      <div className="flex flex-col items-center mb-16 space-y-4">
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em]">
           <Sparkles className="w-3 h-3" /> Motion Portfolio
        </div>
        <h2 className="text-4xl md:text-7xl font-display font-medium text-center text-white tracking-tighter">
          Visual <span className="text-blue-500 italic">Kinematics</span>
        </h2>
      </div>

      <div className="container mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {allVideos.slice(0, 15).map((video, index) => (
            <VideoCard 
              key={index} 
              src={video} 
              index={index} 
              onExpand={() => setActiveVideo(video)}
            />
          ))}
        </div>
      </div>

      {/* Ultra-Premium Blue Lightbox */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-blue-950/20 backdrop-blur-[40px] p-4 md:p-12 animate-in fade-in duration-500"
          onClick={() => setActiveVideo(null)}
        >
          {/* Subtle Blue Glow background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-blue-500/5"></div>
          
          <button 
            className="fixed top-8 right-8 text-white/40 hover:text-blue-400 transition-all z-[110] hover:scale-110 active:scale-95 duration-300"
            onClick={() => setActiveVideo(null)}
          >
            <X className="w-10 h-10 md:w-12 md:h-12" />
          </button>

          <div 
            className="relative w-full max-w-6xl aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,119,255,0.2)] border border-blue-500/20 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video 
              src={activeVideo} 
              className="w-full h-full object-contain"
              autoPlay 
              controls 
              playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
}

function VideoCard({ src, index, onExpand }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <div 
      className="group relative rounded-[2.5rem] overflow-hidden bg-[#080808] border border-white/5 cursor-pointer transition-all duration-700 hover:border-blue-500/40 hover:shadow-[0_0_60px_rgba(59,130,246,0.15)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onExpand}
    >
      <div className="relative aspect-[9/16] md:aspect-[4/5] lg:aspect-square overflow-hidden">
        {/* The video with a permanent blue tint that clears on hover */}
        <video 
          ref={videoRef}
          src={src} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 scale-[1.05] group-hover:scale-100"
          loop 
          muted={isMuted}
          playsInline
        />
        
        {/* Premium Blue Overlay Filter */}
        <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/0 transition-all duration-700 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-all duration-700"></div>

        {/* Floating Glass UI */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
             <div className="px-4 py-2 rounded-xl bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">
               V-{(index + 1).toString().padStart(2, '0')}
             </div>
             <button 
               onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
               className="p-3 rounded-xl bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95"
             >
               {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
             </button>
          </div>

          <div className="flex items-end justify-between">
             <div className="translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-out">
                <p className="text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-1">Signal Visibility</p>
               
             </div>
             <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.4)] transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 delay-200">
                <Play className="w-7 h-7 fill-current" />
             </div>
          </div>
        </div>

        {/* Card Shine Effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-blue-400/0 via-blue-400/5 to-blue-400/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out"></div>
      </div>
      
      {/* Decorative Border Light */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
    </div>
  );
}
