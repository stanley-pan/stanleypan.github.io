"use client";

import { useState } from "react";

interface ImageCard {
  src: string;
  label: string;
}

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  images?: ImageCard[];
}

const experiences: Experience[] = [
  {
    role: "Hardware Engineering Intern → Co-Op",
    company: "pSemi",
    location: "San Diego, CA",
    period: "Aug 2024 – Aug 2025",
    bullets: [
      "Optimized device placement in SOI-CMOS transistor layouts, achieving a 10% area reduction.",
      "Performed HCI stress testing on DC characteristics across PA, LNA, and switch families, improving process reliability margins for PDK updates and tape-out.",
      "Developed SKILL scripts to automate corner parameter analysis for transistors, reducing extraction time by 10x.",
      "Conducted S-parameter and RF performance characterization across PA, LNA, and switch families using VNAs and spectrum analyzers, validating silicon against design specifications.",
      "Developed Python and MATLAB scripts in IC-CAP to automate data collection and parameter extraction, reducing characterization turnaround time by 25% for DV sign-off.",
    ],
  },
  {
    role: "Electrical Lead",
    company: "Yonder Dynamics",
    location: "San Diego, CA",
    period: "Sep 2023 – Present",
    bullets: [
      "Designed, tested, and integrated custom PCBs for power distribution, motor control, and power monitoring subsystems in Altium Designer, debugging hardware faults at mV-level precision.",
      "Reduced hardware build time from 4 weeks to 1 week by standardizing test procedures for motor controllers and I2C subsystems, achieving 99% system reliability in field trials.",
      "Mentored 10+ junior engineers in schematic capture, PCB layout, and hardware debugging workflows, enabling independent contributions to rover electrical systems.",
    ],
    images: [
      { src: "/pcb.jpg", label: "Spectroscopy Control Board" },
      { src: "/pcb.jpg", label: "Voltage Monitoring Board" },
      { src: "/rover.jpg", label: "Rover PDB" },
    ],
  },
];

export default function Experience() {
  const [expanded, setExpanded] = useState<ImageCard | null>(null);

  return (
    <section id="experience" className="py-20 px-4 border-t border-gray-100">
      <div className="mx-auto max-w-5xl sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Experience</h2>

        <div className="relative">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-200" />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.role + exp.company} className="relative pl-8">
                <div className="absolute left-0 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-gray-400 bg-[#f3f1ee]" />

                <p className="text-xs text-gray-400 mb-2">
                  {exp.period} &nbsp;|&nbsp; {exp.location}
                </p>
                <h3 className="text-base font-bold text-gray-900 mb-0.5">{exp.role}</h3>
                <p className="text-sm font-medium text-gray-500 mb-4">{exp.company}</p>

                <ul className="space-y-2 mb-6">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-gray-600">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                {exp.images && (
                  <div className="flex gap-4 flex-wrap">
                    {exp.images.map((img) => (
                      <div
                        key={img.label}
                        className="relative w-64 rounded-xl overflow-hidden border border-gray-200 cursor-pointer group hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                        onClick={() => setExpanded(img)}
                      >
                        <img
                          src={img.src}
                          alt={img.label}
                          className="w-full h-40 object-cover"
                        />
                        <div className="flex items-center justify-between px-3 py-2 bg-white">
                          <span className="text-xs text-gray-400">{img.label}</span>
                          <span className="text-xs text-gray-400 group-hover:text-gray-700 transition flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                            </svg>
                            Expand
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setExpanded(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-[#111] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <span className="text-xs tracking-widest uppercase text-white/50">{expanded.label}</span>
              <button
                onClick={() => setExpanded(null)}
                className="text-white/40 hover:text-white transition text-lg leading-none"
              >
                ✕
              </button>
            </div>
            <img
              src={expanded.src}
              alt={expanded.label}
              className="w-full max-h-[75vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
