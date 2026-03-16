export default function Button() {
  return (
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
  );
}