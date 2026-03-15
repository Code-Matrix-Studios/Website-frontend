import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">

        <p>© 2026 Code Matrix Studios</p>
        <p className="mt-2">We Know Engineering.</p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-6">
          <a href="#" className="hover:text-white transition">
            <Github size={20} />
          </a>

          <a href="#" className="hover:text-white transition">
            <Linkedin size={20} />
          </a>

          <a href="#" className="hover:text-white transition">
            <Twitter size={20} />
          </a>

          <a href="#" className="hover:text-white transition">
            <Mail size={20} />
          </a>
        </div>

      </div>
    </footer>
  );
}