import React from "react";

const Footer = React.forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer ref={ref} className="border-t border-border py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">© 2026 ExclusiveClips4</p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
