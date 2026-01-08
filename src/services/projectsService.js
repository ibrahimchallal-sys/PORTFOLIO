/**
 * Projects Service - Static Data
 * 
 * This service uses static data from src/data/projectsData.js
 * To update projects, edit that file directly.
 */

import { projectsData } from '../data/projectsData';

// Get all projects (static data)
export const getProjects = () => {
  return [...projectsData];
};

// Legacy functions kept for compatibility (no-op for static data)
export const saveProjects = (projects) => {
  console.warn('saveProjects is disabled. Edit src/data/projectsData.js to update projects.');
  return false;
};

export const addProject = (project) => {
  console.warn('addProject is disabled. Edit src/data/projectsData.js to add projects.');
  return null;
};

export const updateProject = (id, updatedProject) => {
  console.warn('updateProject is disabled. Edit src/data/projectsData.js to update projects.');
  return null;
};

export const deleteProject = (id) => {
  console.warn('deleteProject is disabled. Edit src/data/projectsData.js to remove projects.');
  return false;
};

export const resetProjects = () => {
  console.warn('resetProjects is disabled. Edit src/data/projectsData.js to reset projects.');
  return getProjects();
};
