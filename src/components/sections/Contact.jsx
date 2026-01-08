import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Address from "./Address";
import Form from "./Form";
import SocialMedia from "../ui/socialMedia/SocialMedia";
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  const addressData = [
    {
      icon: faLocationDot,
      titleKey: "contact.address.address",
      descriptionKey: "contact.address.location",
    },
    {
      icon: faEnvelope,
      titleKey: "contact.address.email",
      descriptionKey: "contact.address.emailAddress",
    },
    {
      icon: faPhone,
      titleKey: "contact.address.phone",
      descriptionKey: "contact.address.phoneNumber",
    },
  ];

  return (
    <div 
      className="relative -bottom-15 -mt-15 z-10 px-2 w-full"
    >
      <div
        className="content p-6 md:p-8 lg:p-12 bg-white rounded-2xl shadow-xl w-full border border-gray-100"
        id="contact"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 gradient-text">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="w-full lg:w-2/5">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 h-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">{t('contact.infoTitle')}</h3>
              
              <div className="space-y-5 mb-8">
                {addressData.map((item, index) => (
                  <Address 
                    item={{
                      ...item,
                      title: t(item.titleKey),
                      description: t(item.descriptionKey)
                    }} 
                    key={index} 
                  />
                ))}
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">{t('contact.follow')}</h4>
                <SocialMedia />
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-purple-100">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{t('contact.responseTime')}</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="w-full lg:w-3/5">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">{t('contact.formTitle')}</h3>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;