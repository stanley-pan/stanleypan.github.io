const skillGroups = [
  {
    category: "Languages",
    skills: ["Verilog/SystemVerilog", "Python", "C/C++", "Java", "CUDA", "Cadence SKILL", "ARM", "PyTorch"],
  },
  {
    category: "Hardware",
    skills: ["Arduino", "FPGA", "PCB Design", "Pixhawk", "Raspberry Pi", "Motor Controllers", "VNA/SA", "Oscilloscopes", "SMUs"],
  },
  {
    category: "Tools",
    skills: ["Git", "ModelSim", "Questa", "Altium Designer", "MATLAB", "LTSpice", "Cadence Virtuoso", "Innovus", "OpenROAD", "Yosys"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 border-t border-gray-100">
      <div className="mx-auto max-w-5xl sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Skills</h2>
        <div className="space-y-6 max-w-2xl">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-gray-200 px-4 py-1 text-sm text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
