import { useState, useEffect, useRef } from "react";
import { faEye, faCode, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

const Projects = ({ data }) => {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);

  // Add entrance animation when component mounts
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  // Add hover animations
  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -10,
        duration: 0.3,
        ease: "power2.out"
      });
    }
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
    setIsFlipped(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div 
        ref={cardRef}
        className={`project-card-flip cursor-pointer ${isFlipped ? 'flipped' : ''}`}
        onClick={openModal}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="project-card-inner">
          {/* Front of Card - Image and Tags */}
          <div className="project-card-front">
            <div className="project-image-container-flip">
              <img 
                src={data?.image} 
                alt={`${data?.title} project`} 
                className="project-image-flip"
              />
              
              {/* Tags at Bottom */}
              <div className="project-tags-flip">
                {data?.tags?.map((tag, index) => (
                  <span 
                    key={index} 
                    className="project-tag-flip"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Back of Card - Title, Description, and Buttons */}
          <div className="project-card-back">
            <div className="project-content-back">
              <h3 className="project-title-back">
                {data?.title}
              </h3>
              
              <p className="project-description-back">
                {data?.description}
              </p>
              
              <div className="project-actions-back">
                <a 
                  href={data?.link} 
                  className="project-btn-back project-btn-view-back"
                  aria-label="View project"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FontAwesomeIcon icon={faEye} />
                  {t('portfolio.viewMore')}
                </a>
                <a 
                  href={data?.link} 
                  className="project-btn-back project-btn-code-back"
                  aria-label="View code"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FontAwesomeIcon icon={faCode} />
                  {t('portfolio.projectModal.viewCode')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-in-up">
            <div className="relative">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              
              <img 
                src={data?.image} 
                alt={`${data?.title} project`} 
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="project-tag">
                    {data?.category}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {data?.title}
                  </h2>
                </div>
                
                <p className="text-gray-700 text-lg mb-6">
                  {data?.description}
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('portfolio.projectModal.technologies')}</h3>
                  <div className="project-tags">
                    {data?.tags?.map((tag, index) => (
                      <span 
                        key={index} 
                        className="project-tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={data?.link} 
                    className="project-btn btn-view flex-1 min-w-[150px] justify-center"
                  >
                    <FontAwesomeIcon icon={faEye} />
                    {t('portfolio.projectModal.viewProject')}
                  </a>
                  <a 
                    href={data?.link} 
                    className="project-btn btn-code flex-1 min-w-[150px] justify-center"
                  >
                    <FontAwesomeIcon icon={faCode} />
                    {t('portfolio.projectModal.viewCode')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;