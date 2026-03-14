import ThreeScene from "./components/ThreeScene";
export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      <div className="relative w-full h-screen overflow-hidden">
        <ThreeScene />
      </div>
      
      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Content on top of video */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to CodeMatrix
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Building modern digital experiences
        </p>
        <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-md font-semibold">
          Get Started
        </button>
      </div>
    </div>
  );
}