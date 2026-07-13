import React from 'react';
import { Code2, Database, Layout, Server, Brain, Layers } from 'lucide-react';

const skillsData = [
  { icon: <Layout />, name: "React / JS / TS", category: "Frontend" },
  { icon: <Layers />, name: "Tailwind / MUI / Bootstrap", category: "UI" },
  { icon: <Server />, name: ".NET / Node.js / Express", category: "Backend" },
  { icon: <Database />, name: "SQL / MongoDB", category: "Database" },
  { icon: <Brain />, name: "GSAP / Animations", category: "Motion" },
  { icon: <Code2 />, name: "IoT Integration", category: "Tech" },
];

const Skills = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Tech Stack & Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skillsData.map((skill, idx) => (
            <div key={idx} className="group bg-black/40 p-6 rounded-2xl border border-white/5 hover:border-accent/50 hover:-translate-y-2 transition-all duration-300 cursor-default">
              <div className="text-accent mb-3 group-hover:scale-110 transition-transform">{skill.icon}</div>
              <h3 className="text-white font-bold text-lg">{skill.name}</h3>
              <p className="text-gray-500 text-sm uppercase tracking-wider">{skill.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;