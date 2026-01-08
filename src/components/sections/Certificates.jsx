import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getCertificates, getCertificatesOnly, getBadgesOnly } from '../../services/certificatesService';
import { faTimes, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Certificates = memo(() => {
  const { t } = useTranslation();
  const [certificatesData, setCertificatesData] = useState([]);
  const [filterType, setFilterType] = useState('all'); // 'all', 'certificates', 'badges'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    // Load certificates from static data
    const data = getCertificates();
    setCertificatesData(data);
  }, []);

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
    document.body.style.overflow = 'auto';
  };

  // Filter data based on selected type
  const filteredData = filterType === 'all' 
    ? certificatesData 
    : filterType === 'certificates' 
    ? getCertificatesOnly() 
    : getBadgesOnly();

  return (
    <section className="py-20 w-full px-4 sm:px-6" id="certificates">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            {t('certificates.title', 'Certificates & Badges')}
          </h2>
          <p className="font-normal text-base sm:text-lg max-w-3xl mx-auto text-gray-600 leading-relaxed">
            {t('certificates.description', 'My professional certifications and achievements.')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setFilterType('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              filterType === 'all'
                ? 'bg-picto-primary text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-picto-primary'
            }`}
          >
            {t('certificates.showAll', 'Show All')}
          </button>
          <button
            onClick={() => setFilterType('certificates')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              filterType === 'certificates'
                ? 'bg-picto-primary text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-picto-primary'
            }`}
          >
            {t('certificates.showCertificates', 'Show Certificates')}
          </button>
          <button
            onClick={() => setFilterType('badges')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              filterType === 'badges'
                ? 'bg-picto-primary text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-picto-primary'
            }`}
          >
            {t('certificates.showBadges', 'Show Badges')}
          </button>
        </div>

        {/* Certificates and Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => {
            if (item.type === 'badge') {
              // Badges displayed as smaller circular items
              return (
                <div
                  key={item.id}
                  onClick={() => openModal(item)}
                  className="cursor-pointer group"
                >
                  <div className="bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex flex-col items-center justify-center aspect-square">
                    <img
                      src={item.miniature}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-full mb-3"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=Badge';
                      }}
                    />
                    <h3 className="text-sm font-semibold text-gray-800 text-center line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            } else {
              // Certificates displayed as cards
              return (
                <div
                  key={item.id}
                  onClick={() => openModal(item)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.miniature}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Certificate';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.organization}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {item.description}
                    </p>
                    {item.issueDate && (
                      <p className="text-xs text-gray-400 mt-3">
                        {t('certificates.issued', 'Issued')}: {item.issueDate}
                      </p>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t('certificates.noItems', 'No items found.')}
            </p>
          </div>
        )}
      </div>

      {/* Modal for Certificate/Badge Details */}
      {isModalOpen && selectedCert && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-slide-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <div className="p-6">
                <div className="mb-4">
                  <img
                    src={selectedCert.miniature}
                    alt={selectedCert.title}
                    className={`w-full ${selectedCert.type === 'badge' ? 'h-64 object-contain' : 'h-48 object-cover'} rounded-lg mb-4`}
                    onError={(e) => {
                      e.target.src = selectedCert.type === 'badge' 
                        ? 'https://via.placeholder.com/300?text=Badge'
                        : 'https://via.placeholder.com/300x200?text=Certificate';
                    }}
                  />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCert.title}
                </h2>

                <p className="text-lg text-gray-700 mb-4">
                  <strong>{t('certificates.organization', 'Organization')}:</strong> {selectedCert.organization}
                </p>

                <p className="text-gray-700 mb-4">
                  {selectedCert.description}
                </p>

                <div className="space-y-2 mb-4">
                  {selectedCert.issueDate && (
                    <p className="text-sm text-gray-600">
                      <strong>{t('certificates.issueDate', 'Issue Date')}:</strong> {selectedCert.issueDate}
                    </p>
                  )}
                  {selectedCert.credentialId && (
                    <p className="text-sm text-gray-600">
                      <strong>{t('certificates.credentialId', 'Credential ID')}:</strong> {selectedCert.credentialId}
                    </p>
                  )}
                </div>

                {selectedCert.credentialUrl && (
                  <div className="mt-6">
                    <a
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-picto-primary text-white rounded-lg font-semibold hover:bg-picto-primary-dark transition-all duration-300"
                    >
                      {t('certificates.viewCredential', 'View Credential')}
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

Certificates.displayName = 'Certificates';

export default Certificates;
