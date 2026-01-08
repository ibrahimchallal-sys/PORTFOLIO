import { useState, memo } from "react";
import { faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';

const Projects = memo(({ data }) => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Check if project is marked as "working on it"
  const isWorkingOn = data?.isWorkingOn === true;

  const openModal = () => {
    // Don't open modal if project is marked as "working on it"
    if (isWorkingOn) {
      return;
    }
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
        className="project-card-flip cursor-pointer"
        onClick={openModal}
      >
        <div className="project-card-inner">
          {/* Front of Card - Image and Tags */}
          <div className="project-card-front">
            <div className="project-image-container-flip">
              <img 
                src={data?.image} 
                alt={`${data?.title} project`} 
                className="project-image-flip"
                loading="lazy"
              />
              
              {/* Working on it overlay */}
              {isWorkingOn && (
                <div className="absolute inset-0 bg-purple-600 bg-opacity-80 flex items-center justify-center">
                  <span className="text-white text-xl font-bold text-center px-4">
                    {i18n.language === 'fr' ? 'EN COURS' : 'WORKING ON IT'}
                  </span>
                </div>
              )}
              
              {/* Tags at Bottom */}
              <div className="project-tags-flip">
                {Array.isArray(data?.tags) && data.tags.length > 0 ? (
                  data.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="project-tag-flip"
                    >
                      {tag}
                    </span>
                  ))
                ) : null}
              </div>
            </div>
          </div>

          {/* Back of Card - Title, Description, and Buttons */}
          <div className="project-card-back">
            <div className="project-content-back">
              <h3 className="project-title-back">
                {data?.title}
              </h3>
              
              {/* Working on it overlay for card back */}
              {isWorkingOn && (
                <div className="absolute inset-0 bg-purple-600 bg-opacity-80 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold text-center px-4">
                    {i18n.language === 'fr' ? 'EN COURS' : 'WORKING ON IT'}
                  </span>
                </div>
              )}
              
              <div className="relative z-10">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-slide-in-up">
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
                className="w-full h-48 object-cover rounded-t-2xl"
                loading="lazy"
              />
              
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="project-tag">
                    {data?.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {data?.title}
                  </h2>
                </div>
                
                <p className="text-gray-700 text-base mb-4">
                  {data?.description}
                </p>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('portfolio.projectModal.technologies')}</h3>
                  <div className="project-tags">
                    {Array.isArray(data?.tags) && data.tags.length > 0 ? (
                      data.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="project-tag"
                        >
                          {tag}
                        </span>
                      ))
                    ) : null}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <a 
                    href={data?.link} 
                    className="project-btn btn-view px-6 py-2 justify-center"
                  >
                    <FontAwesomeIcon icon={faEye} />
                    {t('portfolio.projectModal.viewProject')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Projects;