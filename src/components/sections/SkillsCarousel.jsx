import { useEffect, useRef } from "react";
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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SkillsCarousel = () => {
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

  const carouselRef = useRef(null);
  const animationRef = useRef();
  const positionRef = useRef(0);
  const skillsRef = useRef(null);
  const skillItemsRef = useRef([]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const speed = 2;

    // Set initial position
    carousel.style.transform = `translateX(0px)`;

    const animate = () => {
      positionRef.current += speed;
      
      // Calculate the width of one set of skills
      const setWidth = carousel.scrollWidth / 2;
      
      // Apply modulo to create seamless looping
      const newPosition = positionRef.current % setWidth;
      
      carousel.style.transform = `translateX(${-newPosition}px)`;
      carousel.style.transition = 'none';
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Add scroll-triggered animation for the skills section with staggered effect
  useEffect(() => {
    if (skillsRef.current) {
      gsap.set(skillsRef.current, { opacity: 0, y: 30 });
      
      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(skillsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          });
          
          // Staggered animation for skill items
          if (skillItemsRef.current.length > 0) {
            gsap.fromTo(skillItemsRef.current,
              { opacity: 0, y: 20, scale: 0.8 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)",
                delay: 0.3
              }
            );
          }
        }
      });
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={skillsRef}
      className="py-8 w-full overflow-hidden bg-gradient-to-r from-purple-50 to-indigo-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          My Skills
        </h3>
      </div>
      
      <div className="relative h-24 flex items-center">
        <div 
          ref={carouselRef}
          className="absolute flex whitespace-nowrap"
        >
          {/* First set of skills */}
          {skills.map((skill, index) => (
            <div 
              key={index} 
              ref={el => skillItemsRef.current[index] = el}
              className="mx-4 flex"
            >
              <div className="bg-white rounded-xl shadow-md px-4 py-3 flex flex-col items-center justify-center min-w-[120px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
              ref={el => skillItemsRef.current[index + skills.length] = el}
              className="mx-4 flex"
            >
              <div className="bg-white rounded-xl shadow-md px-4 py-3 flex flex-col items-center justify-center min-w-[120px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
};

export default SkillsCarousel;