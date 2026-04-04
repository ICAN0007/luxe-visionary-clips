import { useState } from "react";

interface AgeVerificationProps {
  onVerified: () => void;
}

const AgeVerification = ({ onVerified }: AgeVerificationProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a2e]">
      {/* Rainbow gradient bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500" />

      <div className="flex flex-col items-center gap-5 px-8 text-center max-w-sm">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Age Verification
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          You must be 21 or older to visit this website. Your age will be
          verified at checkout.
        </p>

        <button
          onClick={onVerified}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            mt-2 px-10 py-3.5 rounded-full font-semibold text-white text-base
            transition-all duration-300 flex items-center gap-2
            bg-gradient-to-r from-teal-500 to-green-400
            border border-teal-400/50
            ${isHovered ? "shadow-[0_0_25px_rgba(45,212,191,0.4)] scale-105" : "shadow-[0_0_15px_rgba(45,212,191,0.2)]"}
          `}
        >
          I'm 21 or older
          <span className="text-sm">›</span>
        </button>

        <a
          href="https://agechecker.net/age-verification-explained"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-400/80 text-sm hover:text-teal-300 transition-colors"
        >
          Age Verification FAQ
        </a>

        <div className="mt-6 pt-6 border-t border-gray-700/50 w-full flex justify-center">
          <a
            href="https://agechecker.net/?from=age-gate"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="text-teal-400"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                fill="currentColor"
              />
            </svg>
            <span className="font-bold text-lg">
              Age<span className="text-teal-400">Checker</span>.Net
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
