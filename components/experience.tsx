"use client";

import { useState, useRef, useEffect } from "react";

interface ImageCard {
  src: string;
  label: string;
  viewer?: ProjectViewer;
}

interface ViewerTab {
  id: string;
  label: string;
  src: string;
  alt: string;
  type?: "image" | "pdf";
}

interface ProjectViewer {
  board: string;
  tool: string;
  org: string;
  tabs: ViewerTab[];
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
      {
        src: "/projects/science_25/science_25_3d.png",
        label: "Spectroscopy Control PCB",
        viewer: {
          board: "Spectroscopy Control PCB",
          tool: "Altium Designer",
          org: "Yonder Dynamics",
          tabs: [
            {
              id: "render",
              label: "Render",
              src: "/projects/science_25/science_25_3d.png",
              alt: "Science board 3D render",
            },
            {
              id: "2d",
              label: "2D",
              src: "/projects/science_25/science_25_2d.png",
              alt: "Science board 2D layout",
            },
            {
              id: "schematic",
              label: "Schematic",
              src: "/projects/science_25/science_25.pdf",
              alt: "Science board schematic",
              type: "pdf",
            },
          ],
        },
      },
      {
        src: "/projects/arm_monitoring/arm_monitoring.png",
        label: "ARM Voltage Monitoring",
        viewer: {
          board: "ARM Voltage Monitoring",
          tool: "Altium Designer",
          org: "Yonder Dynamics",
          tabs: [
            {
              id: "render",
              label: "Render",
              src: "/projects/arm_monitoring/arm_monitoring.png",
              alt: "ARM voltage monitoring board render",
            },
            {
              id: "schematic",
              label: "Schematic",
              src: "/projects/arm_monitoring/arm_monitoring.pdf",
              alt: "ARM voltage monitoring schematic",
              type: "pdf",
            },
          ],
        },
      },
      {
        src: "/projects/pdb/pdb.png",
        label: "Rover PDB",
        viewer: {
          board: "Rover PDB",
          tool: "Altium Designer",
          org: "Yonder Dynamics",
          tabs: [
            {
              id: "render",
              label: "Render",
              src: "/projects/pdb/pdb.png",
              alt: "Rover PDB render",
            },
            {
              id: "2d",
              label: "2D",
              src: "/projects/pdb/pdb_red.png",
              alt: "Rover PDB red render",
            },
            {
              id: "schematic",
              label: "Schematic",
              src: "/projects/pdb/PDB.pdf",
              alt: "Rover PDB schematic",
              type: "pdf",
            },
          ],
        },
      },
      {
        src: "/projects/arm_power/arm_power_render.png",
        label: "ARM Power Board",
        viewer: {
          board: "ARM Power Board",
          tool: "Altium Designer",
          org: "Yonder Dynamics",
          tabs: [
            {
              id: "render",
              label: "Render",
              src: "/projects/arm_power/arm_power_render.png",
              alt: "ARM power board 3D render",
            },
            {
              id: "2d",
              label: "2D",
              src: "/projects/arm_power/arm_power.png",
              alt: "ARM power board 2D layout",
            },
            {
              id: "schematic",
              label: "Schematic",
              src: "/projects/arm_power/arm_power_sch.png",
              alt: "ARM power board schematic",
            },
          ],
        },
      },
      {
        src: "/projects/encoder/encoder_render.png",
        label: "Encoder Board",
        viewer: {
          board: "Encoder Board",
          tool: "Altium Designer",
          org: "Yonder Dynamics",
          tabs: [
            {
              id: "render",
              label: "Render",
              src: "/projects/encoder/encoder_render.png",
              alt: "Encoder board 3D render",
            },
            {
              id: "2d",
              label: "2D",
              src: "/projects/encoder/encoder.png",
              alt: "Encoder board 2D layout",
            },
            {
              id: "schematic",
              label: "Schematic",
              src: "/projects/encoder/encoder.pdf",
              alt: "Encoder board schematic",
              type: "pdf",
            },
          ],
        },
      },
      {
        src: "/projects/monitoring/monitoring_render.png",
        label: "Monitoring Board",
        viewer: {
          board: "Monitoring Board",
          tool: "Altium Designer",
          org: "Yonder Dynamics",
          tabs: [
            {
              id: "render",
              label: "Render",
              src: "/projects/monitoring/monitoring_render.png",
              alt: "Monitoring board 3D render",
            },
            {
              id: "2d",
              label: "2D",
              src: "/projects/monitoring/monitoring.png",
              alt: "Monitoring board 2D layout",
            },
            {
              id: "schematic",
              label: "Schematic",
              src: "/projects/monitoring/monitoring.pdf",
              alt: "Monitoring board schematic",
              type: "pdf",
            },
          ],
        },
      },
      {
        src: "/projects/drill/drill_render.png",
        label: "Drill Controller",
        viewer: {
          board: "Drill Controller",
          tool: "Altium Designer",
          org: "Yonder Dynamics",
          tabs: [
            {
              id: "render",
              label: "Render",
              src: "/projects/drill/drill_render.png",
              alt: "Drill controller 3D render",
            },
            {
              id: "2d",
              label: "2D",
              src: "/projects/drill/drill.png",
              alt: "Drill controller 2D layout",
            },
            {
              id: "schematic",
              label: "Schematic",
              src: "/projects/drill/drill.pdf",
              alt: "Drill controller schematic",
              type: "pdf",
            },
          ],
        },
      },
    ],
  },
];

export default function Experience() {
  const [expanded, setExpanded] = useState<ImageCard | null>(null);
  const [activeViewerTab, setActiveViewerTab] = useState<Record<string, string>>({
    "Spectroscopy Control PCB": "render",
  });

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
                  <div className="grid grid-cols-3 gap-4">
                    {exp.images.map((img) => (
                      <div
                        key={img.label}
                        className="relative rounded-xl overflow-hidden border border-gray-200 cursor-pointer group hover:-translate-y-1 hover:shadow-md transition-all duration-200"
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
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setExpanded(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-gray-200 bg-[#f6f3ee] shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.24em] text-gray-400">
                  {expanded.viewer?.org ?? ""}
                </span>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {expanded.label}
                </p>
              </div>
              <button
                onClick={() => setExpanded(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition hover:border-gray-300 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {expanded.viewer ? (
              <ViewerModalContent
                viewer={expanded.viewer}
                activeTab={activeViewerTab[expanded.label] ?? expanded.viewer.tabs[0].id}
                onTabChange={(tabId) =>
                  setActiveViewerTab((current) => ({
                    ...current,
                    [expanded.label]: tabId,
                  }))
                }
              />
            ) : (
              <div className="p-4 sm:p-6">
                <img
                  src={expanded.src}
                  alt={expanded.label}
                  className="w-full max-h-[75vh] rounded-2xl border border-gray-200 bg-white object-contain"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function ViewerModalContent({
  viewer,
  activeTab,
  onTabChange,
}: {
  viewer: ProjectViewer;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}) {
  const currentTab =
    viewer.tabs.find((tab) => tab.id === activeTab) ?? viewer.tabs[0];

  return (
    <div>
      <div className="border-b border-gray-200 px-4 sm:px-6">
        <div className="flex gap-2 overflow-x-auto">
          {viewer.tabs.map((tab) => {
            const isActive = tab.id === currentTab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={[
                  "relative px-2 py-4 text-sm font-medium transition sm:px-4",
                  isActive
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-700",
                ].join(" ")}
              >
                {tab.label}
                <span
                  className={[
                    "absolute inset-x-0 bottom-0 h-0.5 transition",
                    isActive ? "bg-gray-900" : "bg-transparent",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
          <div className="p-3 sm:p-4">
            {currentTab.type === "pdf" ? (
              <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "1.414 / 1" }}>
                <embed
                  src={`${currentTab.src}#view=FitH&toolbar=0`}
                  type="application/pdf"
                  className="h-full w-full"
                />
              </div>
            ) : (
              <ZoomableImage src={currentTab.src} alt={currentTab.alt} />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-gray-400">
              Board
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <InfoRow label="Project" value={viewer.board} />
              <InfoRow label="Tool" value={viewer.tool} />
              <InfoRow label="Org" value={viewer.org} />
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-gray-400">
              Notes
            </p>
            <div className="mt-4 min-h-40 rounded-2xl border border-dashed border-gray-200 bg-[#fbfaf7]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ scale: 1, x: 0, y: 0 });
  const [display, setDisplay] = useState({ scale: 1, x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const commit = (scale: number, x: number, y: number) => {
    stateRef.current = { scale, x, y };
    setDisplay({ scale, x, y });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const { scale, x, y } = stateRef.current;
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      const newScale = Math.max(1, Math.min(5, scale * (e.deltaY > 0 ? 0.9 : 1.1)));
      const ratio = newScale / scale;
      const maxX = (rect.width * (newScale - 1)) / 2 + rect.width * 0.2;
      const maxY = (rect.height * (newScale - 1)) / 2 + rect.height * 0.2;
      commit(
        newScale,
        Math.max(-maxX, Math.min(maxX, cx + ratio * (x - cx))),
        Math.max(-maxY, Math.min(maxY, cy + ratio * (y - cy))),
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);


  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    const { scale, x, y } = stateRef.current;
    const maxX = (rect.width * (scale - 1)) / 2 + rect.width * 0.2;
    const maxY = (rect.height * (scale - 1)) / 2 + rect.height * 0.2;
    commit(scale, Math.max(-maxX, Math.min(maxX, x + dx)), Math.max(-maxY, Math.min(maxY, y + dy)));
  };

  const onMouseUp = () => { isDragging.current = false; };

  return (
    <div>
      <div
        ref={containerRef}
        className="overflow-hidden rounded-2xl bg-[#f2efe9] cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onDoubleClick={() => commit(1, 0, 0)}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="max-h-[72vh] w-full object-contain pointer-events-none block"
          style={{
            transform: `translate(${display.x}px, ${display.y}px) scale(${display.scale})`,
            transformOrigin: "center",
          }}
        />
      </div>
      <p className="mt-2 text-center text-[11px] text-gray-400">
        Scroll to zoom · Drag to pan · Double-click to reset
      </p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-3 first:border-t-0 first:pt-0">
      <span className="text-gray-400">{label}</span>
      <span className="text-right text-gray-700">{value}</span>
    </div>
  );
}
