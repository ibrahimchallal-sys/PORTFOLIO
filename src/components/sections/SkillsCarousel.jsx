import { memo } from "react";
import { 
  faHtml5, 
  faCss3Alt, 
  faJs, 
  faReact, 
  faPhp, 
  faPython, 
  faBootstrap, 
  faLaravel, 
  faNodeJs, 
  faGit, 
  faGithub, 
  faFigma,
  faDocker,
  faJira
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faCloud, faProjectDiagram, faChartLine, faLeaf, faChartBar, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './skills-carousel.css';

const SkillsCarousel = memo(() => {
  const skills = [
    { name: "HTML", icon: faHtml5, style: { color: "#e34f26" } },
    { name: "CSS", icon: faCss3Alt, style: { color: "#1572b6" } },
    { name: "JavaScript", icon: faJs, style: { color: "#f7df1e" } },
    { name: "React", icon: faReact, style: { color: "#61dafb" } },
    { name: "PHP", icon: faPhp, style: { color: "#777bb4" } },
    { name: "Python", icon: faPython, style: { color: "#3776ab" } },
    { name: "MySQL", icon: faDatabase, style: { color: "#4479a1" } },
    { name: "Bootstrap", icon: faBootstrap, style: { color: "#7952b3" } },
    { name: "Laravel", icon: faLaravel, style: { color: "#ff2d20" } },
    { name: "Express.js", icon: faNodeJs, style: { color: "#339933" } },
    { name: "MongoDB", icon: faLeaf, style: { color: "#47a248" } },
    { name: "Node.js", icon: faNodeJs, style: { color: "#339933" } },
    { name: "Git", icon: faGit, style: { color: "#f05032" } },
    { name: "GitHub", icon: faGithub, style: { color: "#181717" } },
    { name: "Jira", icon: faJira, style: { color: "#0052cc" } },
    { name: "UML", icon: faProjectDiagram, style: { color: "#f77e1c" } },
    { name: "Figma", icon: faFigma, style: { color: "#f24e1e" } },
    { name: "Cloud", icon: faCloud, style: { color: "#4285f4" } },
    { name: "Docker", icon: faDocker, style: { color: "#2496ed" } },
    { name: "Chart.js", icon: faChartBar, style: { color: "#ff6384" } }
  ];

  return (
    <div 
      className="py-8 w-full overflow-hidden bg-gradient-to-r from-purple-50 to-indigo-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          My Skills
        </h3>
      </div>
      
      <div className="relative h-24 flex items-center overflow-hidden">
        <div 
          className="absolute flex whitespace-nowrap animate-loop-scroll"
        >
          {/* First set of skills */}
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="mx-4 flex"
            >
              <div className="bg-white rounded-xl shadow-md px-4 py-3 flex flex-col items-center justify-center min-w-[120px]">
                <FontAwesomeIcon 
                  icon={skill.icon} 
                  className="w-8 h-8 text-2xl mb-2"
                  style={skill.style}
                />
                <span className="text-sm font-medium text-gray-700">{skill.name}</span>
              </div>
            </div>
          ))}
          
          {/* Duplicate set for seamless looping */}
          {skills.map((skill, index) => (
            <div 
              key={`dup-${index}`} 
              className="mx-4 flex"
            >
              <div className="bg-white rounded-xl shadow-md px-4 py-3 flex flex-col items-center justify-center min-w-[120px]">
                <FontAwesomeIcon 
                  icon={skill.icon} 
                  className="w-8 h-8 text-2xl mb-2"
                  style={skill.style}
                />
                <span className="text-sm font-medium text-gray-700">{skill.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default SkillsCarousel;