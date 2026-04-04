import { useEffect, useRef } from "react";

/* ================================
   300x250 (BEST - MAIN EARNING)
================================ */
export const Banner300x250 = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const config = document.createElement("script");
    config.innerHTML = `
      atOptions = {
        'key' : '4eadba2009d2d228ea8ba3127cec9856',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;
    ref.current.appendChild(config);

    const script = document.createElement("script");
    script.src = "//www.highperformanceformat.com/4eadba2009d2d228ea8ba3127cec9856/invoke.js";
    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className="flex justify-center my-4" />;
};

/* ================================
   728x90 (HEADER - DESKTOP)
================================ */
export const Banner728x90 = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const config = document.createElement("script");
    config.innerHTML = `
      atOptions = {
        'key' : '3b5471962b1eb33a73a391619ab5bcf3',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    ref.current.appendChild(config);

    const script = document.createElement("script");
    script.src = "//www.highperformanceformat.com/3b5471962b1eb33a73a391619ab5bcf3/invoke.js";
    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className="flex justify-center my-4" />;
};

/* ================================
   320x50 (MOBILE)
================================ */
export const Banner320x50 = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const config = document.createElement("script");
    config.innerHTML = `
      atOptions = {
        'key' : '5e3bf94cee83fd3ba8a9d49299f981da',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;
    ref.current.appendChild(config);

    const script = document.createElement("script");
    script.src = "//www.highperformanceformat.com/5e3bf94cee83fd3ba8a9d49299f981da/invoke.js";
    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className="flex justify-center my-2" />;
};

/* ================================
   160x600 (SIDEBAR)
================================ */
export const Banner160x600 = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const config = document.createElement("script");
    config.innerHTML = `
      atOptions = {
        'key' : '838739900de4a1eb752a143fd6fb9de7',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    `;
    ref.current.appendChild(config);

    const script = document.createElement("script");
    script.src = "//www.highperformanceformat.com/838739900de4a1eb752a143fd6fb9de7/invoke.js";
    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className="flex justify-center my-4" />;
};

/* ================================
   SMARTLINK (SAFE VERSION)
================================ */
export const SmartlinkBanner = () => {
  return (
    <div className="w-full py-3 bg-gradient-to-r from-orange-200 to-yellow-200 text-center">
      <a
        href="https://www.profitablecpmratenetwork.com/qh37ecwr?key=a8f363a8a34ccbc5f882b43b6a80559f"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-sm"
      >
        🔥 Click Here for Exclusive Offers 🔥
      </a>
    </div>
  );
};