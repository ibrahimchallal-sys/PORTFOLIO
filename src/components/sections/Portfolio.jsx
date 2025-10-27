import { useState, useEffect, useRef } from "react";
import Projects from "./Projects";
import card1 from "../../assets/images/portfolio-images/card-1.png";
import card2 from "../../assets/images/portfolio-images/card-2.png";
import card3 from "../../assets/images/portfolio-images/card-3.png";
import cssImage from "./CSS.png";
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const projectData = [
  {
    id: 1,
    image: cssImage,
    categoryKey: "portfolio.categories.webDevelopment",
    titleKey: "projects.cssbattle.title",
    descriptionKey: "projects.cssbattle.description",
    link: "https://cssbattle-isfo.vercel.app/",
    tagsKey: "projects.cssbattle.tags",
  },
  {
    id: 2,
    image: card2,
    categoryKey: "portfolio.categories.uiUxDesign",
    titleKey: "projects.adminDashboard.title",
    descriptionKey: "projects.adminDashboard.description",
    link: "#!",
    tagsKey: "projects.adminDashboard.tags",
  },
  {
    id: 3,
    image: card3,
    categoryKey: "portfolio.categories.uiUxDesign",
    titleKey: "projects.adminPanel.title",
    descriptionKey: "projects.adminPanel.description",
    link: "#!",
    tagsKey: "projects.adminPanel.tags",
  },
  {
    id: 4,
    image: card1,
    categoryKey: "portfolio.categories.webDevelopment",
    titleKey: "projects.ecommerce.title",
    descriptionKey: "projects.ecommerce.description",
    link: "#!",
    tagsKey: "projects.ecommerce.tags",
  },
  {
    id: 5,
    image: card2,
    categoryKey: "portfolio.categories.mobileApp",
    titleKey: "projects.fitnessTracker.title",
    descriptionKey: "projects.fitnessTracker.description",
    link: "#!",
    tagsKey: "projects.fitnessTracker.tags",
  },
  {
    id: 6,
    image: card3,
    categoryKey: "portfolio.categories.webDevelopment",
    titleKey: "projects.portfolioWebsite.title",
    descriptionKey: "projects.portfolioWebsite.description",
    link: "#!",
    tagsKey: "projects.portfolioWebsite.tags",
  },
];

const Portfolio = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projectData);
  const [animationKey, setAnimationKey] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [initialProjects, setInitialProjects] = useState([]);
  const portfolioRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const filterButtonRefs = useRef([]);

  // Map category keys to display names
  const getCategoryName = (categoryKey) => {
    if (categoryKey === "All") return t('portfolio.categories.all');
    return t(categoryKey);
  };

  // Get translated categories
  const categories = [
    "All",
    "portfolio.categories.webDevelopment",
    "portfolio.categories.uiUxDesign",
    "portfolio.categories.mobileApp"
  ];

  useEffect(() => {
    const filtered = activeCategory === "All" 
      ? projectData 
      : projectData.filter(project => project.categoryKey === activeCategory);
    
    setFilteredProjects(filtered);
    setInitialProjects(filtered.slice(0, 3));
    setAnimationKey(prev => prev + 1);
  }, [activeCategory, t]);

  useEffect(() => {
    if (portfolioRef.current && titleRef.current && descriptionRef.current && filterRef.current) {
      // Set initial states
      gsap.set([titleRef.current, descriptionRef.current], { opacity: 0, y: 20 });
      gsap.set(filterRef.current, { opacity: 0, y: 20 });
      
      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Animate elements in sequence
      tl.to(titleRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      })
      .to(descriptionRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.4")
      .to(filterRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.4");
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animate project cards when they enter the viewport
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.animate-slide-in-up');
      
      cards.forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 30 });
        
        ScrollTrigger.create({
          trigger: card,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.1
            });
          }
        });
      });
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredProjects]);

  // Add hover animations to filter buttons
  const handleFilterButtonHover = (index, isEnter) => {
    const button = filterButtonRefs.current[index];
    if (button) {
      if (isEnter) {
        gsap.to(button, {
          y: -3,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(button, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  // Add animation when changing active category
  const handleCategoryChange = (category) => {
    // Add animation to the filter buttons
    filterButtonRefs.current.forEach((button, index) => {
      if (button) {
        gsap.to(button, {
          backgroundColor: category === categories[index] ? "#9929fb" : "transparent",
          color: category === categories[index] ? "#ffffff" : "#4b5563",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
    
    setActiveCategory(category);
  };

  const toggleShowAll = () => {
    // Store the current scroll position
    const scrollPosition = window.scrollY;
    
    // Toggle the showAll state
    setShowAll(!showAll);
    
    // Restore the scroll position after state update
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  };

  const projectsToShow = showAll ? filteredProjects : initialProjects;

  return (
    <section
      ref={portfolioRef}
      className="py-20 w-full px-4 sm:px-6 portfolio-section"
      id="portfolio"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="section-title mb-6 text-gray-900 gradient-text">{t('portfolio.title')}</h2>
          <p ref={descriptionRef} className="font-normal text-lg max-w-2xl mx-auto text-gray-600">
            {t('portfolio.description')}
          </p>
          
          {/* Category Filter */}
          <div ref={filterRef} className="category-filter">
            {categories.map((category, index) => (
              <button
                key={category}
                ref={el => filterButtonRefs.current[index] = el}
                onClick={() => handleCategoryChange(category)}
                onMouseEnter={() => handleFilterButtonHover(index, true)}
                onMouseLeave={() => handleFilterButtonHover(index, false)}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              >
                {getCategoryName(category)}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="portfolio-grid" key={animationKey}>
          {projectsToShow.map((data) => (
            <div key={data.id} className="animate-slide-in-up">
              <Projects data={{
                ...data,
                category: getCategoryName(data.categoryKey),
                title: t(data.titleKey),
                description: t(data.descriptionKey),
                tags: t(data.tagsKey, { returnObjects: true })
              }} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          {filteredProjects.length > 3 && (
            <button 
              onClick={toggleShowAll}
              className="view-all-btn animate-pulse-slow"
            >
              {showAll ? (
                <div className="flex items-center justify-center gap-2">
                  {t('portfolio.viewLess')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {t('portfolio.viewMore')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;