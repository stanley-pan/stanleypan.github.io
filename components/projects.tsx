interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string;
}

const projects: Project[] = [
  {
    title: "Dual-Core ML/AI Accelerator for Transformer Attention",
    description:
      "Full RTL-to-GDSII implementation in Cadence Innovus. Improved WNS from -5 ns to 0 ns at 1 GHz via pipelining, integrated async FIFOs for multi-core communication (2x throughput), and reduced dynamic power by 10% and core area by 32% through post-PnR optimizations.",
    tags: ["Verilog", "Cadence Innovus", "VLSI", "SRAM", "RTL"],
    href: "#",
  },
  {
    title: "Reconfigurable Systolic-Array CNN Accelerator",
    description:
      "2-bit/4-bit precision-reconfigurable MAC tile with output/weight-stationary control logic for low-power CNN inference on FPGA. Reduced convolution latency by 69.2%, memory usage by 82.8%, and MAC operations by 55%. Synthesized onto Cyclone V FPGA using Questa.",
    tags: ["Verilog", "FPGA", "Cyclone V", "Questa", "CNN"],
    href: "#",
  },
  {
    title: "Biomimetic Fish AUV",
    description:
      "Custom PCB with ArduSub-based control software on Raspberry Pi 4 for servo and BLDC motor actuation, replicating fish-like propulsion. Integrated Pixhawk telemetry, pressure sensor, and camera feed for real-time state estimation and depth monitoring.",
    tags: ["PCB Design", "ArduSub", "Raspberry Pi", "Pixhawk", "Embedded"],
    href: "#",
  },
  {
    title: "Arm Monitoring Board",
    description:
      "Custom 2-layer PCB for wearable arm monitoring, featuring signal routing for top/bottom copper, silkscreen legend, and soldermask layers. Designed for embedded sensing applications.",
    tags: ["PCB Design", "Embedded", "Sensors"],
    href: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 border-t border-gray-100">
      <div className="mx-auto max-w-5xl sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Projects</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className="group rounded-xl border border-gray-100 bg-[#f3f1ee] p-6 hover:border-gray-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
