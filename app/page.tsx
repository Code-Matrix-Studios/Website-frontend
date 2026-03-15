export default function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Base gradient background - deep purple to dark navy */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#0f0a1e] to-[#0a0a12]" />
      
      {/* Purple glow on top left */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#6b21a8] opacity-30 blur-[150px] rounded-full" />
      
      {/* Peachy/coral warm glow at bottom left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-gradient-to-tr from-[#d97706] via-[#c084fc] to-transparent opacity-40 blur-[100px]" />
      
      {/* Subtle purple accent on the right */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#7c3aed] opacity-10 blur-[120px] rounded-full" />

      {/* Content on top */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="block italic font-light text-[#f5f5f5]">Welcome to</span>
          <span className="block mt-2 text-white">CodeMatrix Studios</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-[#a3a3a3] max-w-md">
          Building modern digital experiences
        </p>
        <button className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-8 py-3.5 rounded-full font-medium flex items-center gap-2 transition-all duration-300 border border-white/10">
          Get Started
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
