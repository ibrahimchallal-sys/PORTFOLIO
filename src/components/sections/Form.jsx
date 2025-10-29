import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { insertMessage } from '../../services/supabase';

const telegramSVG = (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.34 9.32013L6.34 2.32013C5.78749 2.04514 5.16362 1.94724 4.55344 2.03978C3.94326 2.13232 3.37646 2.4108 2.93033 2.83724C2.48421 3.26369 2.18046 3.81735 2.0605 4.42274C1.94054 5.02813 2.0102 5.65578 2.26 6.22013L4.66 11.5901C4.71446 11.72 4.74251 11.8593 4.74251 12.0001C4.74251 12.1409 4.71446 12.2803 4.66 12.4101L2.26 17.7801C2.0567 18.2368 1.97076 18.7371 2.00998 19.2355C2.0492 19.7339 2.21235 20.2145 2.48459 20.6338C2.75682 21.0531 3.12953 21.3977 3.56883 21.6363C4.00812 21.875 4.50009 22 5 22.0001C5.46823 21.9955 5.92949 21.8861 6.35 21.6801L20.35 14.6801C20.8466 14.4303 21.264 14.0474 21.5557 13.5742C21.8474 13.101 22.0018 12.556 22.0018 12.0001C22.0018 11.4442 21.8474 10.8993 21.5557 10.4261C21.264 9.95282 20.8466 9.56994 20.35 9.32013H20.34ZM19.45 12.8901L5.45 19.8901C5.26617 19.9784 5.05973 20.0084 4.85839 19.976C4.65705 19.9436 4.47041 19.8504 4.32352 19.709C4.17662 19.5675 4.07648 19.3845 4.03653 19.1846C3.99658 18.9846 4.01873 18.7772 4.1 18.5901L6.49 13.2201C6.52094 13.1484 6.54766 13.075 6.57 13.0001H13.46C13.7252 13.0001 13.9796 12.8948 14.1671 12.7072C14.3546 12.5197 14.46 12.2653 14.46 12.0001C14.46 11.7349 14.3546 11.4806 14.1671 11.293C13.9796 11.1055 13.7252 11.0001 13.46 11.0001H6.57C6.54766 10.9253 6.52094 10.8518 6.49 10.7801L4.1 5.41013C4.01873 5.22309 3.99658 5.01568 4.03653 4.8157C4.07648 4.61572 4.17662 4.43273 4.32352 4.29128C4.47041 4.14982 4.65705 4.05666 4.85839 4.02428C5.05973 3.9919 5.26617 4.02186 5.45 4.11013L19.45 11.1101C19.6138 11.194 19.7513 11.3215 19.8473 11.4786C19.9433 11.6356 19.994 11.8161 19.994 12.0001C19.994 12.1842 19.9433 12.3647 19.8473 12.5217C19.7513 12.6787 19.6138 12.8062 19.45 12.8901Z"
      fill="currentColor"
    />
  </svg>
);

const Form = () => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const inputRefs = useRef([]);
  const [focusedInputs, setFocusedInputs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add entrance animation
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  // Add focus and hover animations to form inputs
  const handleInputFocus = (index, isFocused) => {
    const inputElement = inputRefs.current[index];
    if (inputElement) {
      if (isFocused) {
        gsap.to(inputElement, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(inputElement, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
    setFocusedInputs(prev => ({ ...prev, [index]: isFocused }));
  };

  // Add hover effect to submit button
  const handleButtonHover = (isEnter) => {
    const button = document.getElementById('submit-button');
    if (button) {
      if (isEnter) {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const messageData = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    setIsSubmitting(true);
    
    // Insert message into Supabase
    const result = await insertMessage(messageData);
    
    if (result.success) {
      // Reset form without alert
      e.target.reset();
    } else {
      // Handle error silently or with visual feedback
      console.error('Error submitting message:', result.error);
    }
    
    setIsSubmitting(false);
    
    // Add a success animation to the button
    const button = document.getElementById('submit-button');
    if (button) {
      gsap.to(button, {
        backgroundColor: result.success ? "#10B981" : "#EF4444",
        duration: 0.3,
        onComplete: () => {
          setTimeout(() => {
            gsap.to(button, {
              backgroundColor: "#9929fb",
              duration: 0.3
            });
          }, 1000);
        }
      });
    }
  };

  return (
    <div 
      ref={formRef}
      className="w-full"
    >
      <p className="text-gray-600 mb-6">
        {t('contact.formDescription')}
      </p>
      
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t('contact.form.name')} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={t('contact.form.namePlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary transition-all duration-300"
              required
              ref={el => inputRefs.current[0] = el}
              onFocus={() => handleInputFocus(0, true)}
              onBlur={() => handleInputFocus(0, false)}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('contact.form.email')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t('contact.form.emailPlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary transition-all duration-300"
              required
              ref={el => inputRefs.current[1] = el}
              onFocus={() => handleInputFocus(1, true)}
              onBlur={() => handleInputFocus(1, false)}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            {t('contact.form.subject')} *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder={t('contact.form.subjectPlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary transition-all duration-300"
            required
            ref={el => inputRefs.current[2] = el}
            onFocus={() => handleInputFocus(2, true)}
            onBlur={() => handleInputFocus(2, false)}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {t('contact.form.message')} *
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder={t('contact.form.messagePlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary transition-all duration-300 resize-none"
            required
            ref={el => inputRefs.current[3] = el}
            onFocus={() => handleInputFocus(3, true)}
            onBlur={() => handleInputFocus(3, false)}
          />
        </div>
        
        <button
          type="submit"
          id="submit-button"
          className="btn btn-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center gap-2 hover:-translate-y-1"
          onMouseEnter={() => handleButtonHover(true)}
          onMouseLeave={() => handleButtonHover(false)}
          disabled={isSubmitting}
        >
          {isSubmitting ? t('contact.form.sending') || 'Sending...' : t('contact.form.send')}
          {telegramSVG}
        </button>
      </form>
    </div>
  );
};

export default Form;