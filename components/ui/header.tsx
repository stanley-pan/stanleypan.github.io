import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

export default function Header() {
  return (
    <>
      <div className="fixed top-0 z-40 w-full border-b border-white/15 bg-[#111]/95 px-4 py-2 text-center text-[11px] font-medium tracking-[0.18em] text-white/80 backdrop-blur-sm sm:px-6">
        this website is still under development! thank you :D
      </div>
      <header className="fixed top-[33px] z-30 w-full border-b border-white/10 bg-black/85 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3">
          <Link href="/" className="text-sm font-semibold text-white transition hover:text-white/70">
            Stanley Pan
          </Link>
          <nav>
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      </header>
    </>
  );
}
