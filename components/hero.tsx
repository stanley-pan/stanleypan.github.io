export default function Hero() {
  return (
    <section id="about" className="pt-28 pb-20 px-4">
      <div className="mx-auto max-w-5xl sm:px-6">
        <div className="flex items-start gap-16">

          {/* Left: all text content */}
          <div className="flex-1 min-w-0">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-2">
              Stanley Pan
            </h1>
            <div className="flex gap-4 text-sm text-gray-400 mb-5">
              <a href="mailto:s5pan@ucsd.edu" className="hover:text-gray-600 transition">s5pan@ucsd.edu</a>
              <span>+1 (626)-727-4989</span>
            </div>
            <p className="text-lg text-gray-500 mb-10">
              PCB Design · Hardware & VLSI · Machine Learning
            </p>

            {/* Two-column: bio + education */}
            <div className="grid sm:grid-cols-2 gap-12 mb-10">
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  M.S. Computer Engineering student at <strong className="text-gray-900">UC San Diego</strong>, graduating June 2026.
                  I work across the hardware-software stack — from RTL design and VLSI implementation
                  to embedded systems and ML accelerators.
                </p>
                <p>
                  Previously at pSemi doing RF hardware characterization and layout.
                  Currently leading electrical systems for an autonomous rover team at Yonder Dynamics.
                </p>
              </div>

              <div className="space-y-0">
                <div className="border-t border-gray-200 py-5">
                  <p className="text-sm font-semibold text-gray-900 mb-1">M.S. Computer Engineering</p>
                  <p className="text-sm text-gray-500">University of California, San Diego</p>
                  <p className="text-xs text-gray-400 mt-1">Expected June 2026</p>
                </div>
                <div className="border-t border-gray-200 py-5">
                  <p className="text-sm font-semibold text-gray-900 mb-1">B.S. Computer Engineering</p>
                  <p className="text-sm text-gray-500">University of California, San Diego</p>
                  <p className="text-xs text-gray-400 mt-1">2021 – 2025</p>
                </div>
                <div className="border-t border-gray-200" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition"
              >
                Resume
              </a>
              <a
                href="mailto:s5pan@ucsd.edu"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Email
              </a>
              <a
                href="https://linkedin.com/in/stanleypan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/stanley-pan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Right: headshot */}
          <div className="hidden sm:block flex-shrink-0 mt-24">
            <img
              src="/head2.jpg"
              alt="Stanley Pan"
              className="w-80 h-96 rounded-2xl object-cover"
              style={{ objectPosition: "center 30%" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
