import { useState } from "react";

interface AgeVerificationProps {
  onVerified: () => void;
}

const AgeVerification = ({ onVerified }: AgeVerificationProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center gradient-bg">
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400" />

      <div className="flex flex-col items-center gap-6 px-6 text-center max-w-md">
        <h1 className="text-3xl font-bold text-foreground font-display">Age Verification</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          You must be 21 or older to visit this website. Your age will be verified at checkout.
        </p>

        <button
          onClick={onVerified}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            px-10 py-3 rounded-lg border-2 border-green-500 text-foreground font-semibold text-lg
            transition-all duration-300 flex items-center gap-2
            ${isHovered ? "bg-green-500/20 glow-shadow" : "bg-transparent"}
          `}
          style={isHovered ? { boxShadow: "0 0 20px rgba(34,197,94,0.3)" } : {}}
        >
          I'm 21 or older
          <span className="text-sm">›</span>
        </button>

        <a
          href="https://agechecker.net/age-verification-explained"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground text-sm hover:text-foreground transition-colors underline"
        >
          Age Verification FAQ
        </a>

        <a
          href="https://agechecker.net/?from=age-gate"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 mt-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span className="font-bold">
            Age<span className="text-primary">Checker</span>.Net
          </span>
        </a>
      </div>
    </div>
  );
};

export default AgeVerification;
