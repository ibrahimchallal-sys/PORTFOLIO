/**
 * Certificates Service - Static Data
 * 
 * This service uses static data from src/data/certificatesData.js
 * To update certificates and badges, edit that file directly.
 */

import { certificatesData } from '../data/certificatesData';

// Get all certificates and badges (static data)
export const getCertificates = () => {
  return [...certificatesData];
};

// Get certificates only
export const getCertificatesOnly = () => {
  return certificatesData.filter(item => item.type === 'certificate');
};

// Get badges only
export const getBadgesOnly = () => {
  return certificatesData.filter(item => item.type === 'badge');
};

// Legacy functions kept for compatibility (no-op for static data)
export const saveCertificates = (certificates) => {
  console.warn('saveCertificates is disabled. Edit src/data/certificatesData.js to update certificates.');
  return false;
};

export const addCertificate = (certificate) => {
  console.warn('addCertificate is disabled. Edit src/data/certificatesData.js to add certificates.');
  return null;
};

export const updateCertificate = (id, updatedCertificate) => {
  console.warn('updateCertificate is disabled. Edit src/data/certificatesData.js to update certificates.');
  return null;
};

export const deleteCertificate = (id) => {
  console.warn('deleteCertificate is disabled. Edit src/data/certificatesData.js to remove certificates.');
  return false;
};

export const resetCertificates = () => {
  console.warn('resetCertificates is disabled. Edit src/data/certificatesData.js to reset certificates.');
  return getCertificates();
};
