import { memo, useState, useEffect } from "react";
import Projects from "./Projects";
import card1 from "../../assets/images/portfolio-images/card-1.png";
import card2 from "../../assets/images/portfolio-images/card-2.png";
import card3 from "../../assets/images/portfolio-images/card-3.png";
import cssImage from "./CSS.png";
import chessImage from "./chess.png";
import edutechImage from "./edutech.png";
import { useTranslation } from 'react-i18next';
import { getProjects } from "../../services/projectsService";

// Image mapping for imported images
const imageMap = {
  "CSS.png": cssImage,
  "card-1.png": card1,
  "card-2.png": card2,
  "card-3.png": card3,
  "chess.png": chessImage,
  "edutech.png": edutechImage,
};

const Portfolio = memo(() => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    // Load projects from static data
    const projects = getProjects();
    // Map image paths to imported images (only if it's a simple filename, not base64 or URL)
    const mappedProjects = projects.map(project => {
      // If image is base64 or URL, use it directly; otherwise try to map from imageMap
      const isBase64 = project.image && project.image.startsWith('data:image');
      const isUrl = project.image && (project.image.startsWith('http://') || project.image.startsWith('https://'));
      
      return {
        ...project,
        image: isBase64 || isUrl ? project.image : (imageMap[project.image] || project.image)
      };
    });
    setProjectData(mappedProjects);
  }, []);

  // Show only first 3 projects initially, or all if showAll is true
  const projectsToShow = showAll ? projectData : projectData.slice(0, 3);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section
      className="py-20 w-full px-4 sm:px-6 portfolio-section"
      id="portfolio"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            {t('portfolio.title')}
          </h2>
          <p className="font-normal text-base sm:text-lg max-w-3xl mx-auto text-gray-600 leading-relaxed">
            {t('portfolio.description')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="portfolio-grid">
          {projectsToShow.map((data) => {
            // Ensure tags is always an array
            const translatedTags = t(data.tagsKey, { returnObjects: true });
            const tagsArray = Array.isArray(translatedTags) ? translatedTags : [];
            
            return (
              <div key={data.id}>
                <Projects data={{
                  ...data,
                  category: t(data.categoryKey),
                  title: t(data.titleKey),
                  description: t(data.descriptionKey),
                  tags: tagsArray
                }} />
              </div>
            );
          })}
        </div>

        {/* Show More/Less Button */}
        {projectData.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={toggleShowAll}
              className="px-8 py-3 bg-picto-primary text-white rounded-lg font-semibold hover:bg-picto-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              {showAll ? (
                <>
                  {t('portfolio.viewLess')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                <>
                  {t('portfolio.viewMore')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

export default Portfolio;
