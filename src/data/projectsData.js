/**
 * PROJECTS DATA CONFIGURATION
 * 
 * Edit this file to update your portfolio projects.
 * 
 * Fields:
 * - id: Unique identifier (number)
 * - image: Image filename (e.g., "CSS.png", "card-1.png") or full URL/base64
 * - categoryKey: Translation key for category (see translation.json)
 * - titleKey: Translation key for project title
 * - descriptionKey: Translation key for project description
 * - link: Project URL
 * - tagsKey: Translation key for tags array
 * - isWorkingOn: Set to true to show "WORKING ON IT" overlay
 */

export const projectsData = [
  {
    id: 1,
    image: "CSS.png",
    categoryKey: "portfolio.categories.webDevelopment",
    titleKey: "projects.cssbattle.title",
    descriptionKey: "projects.cssbattle.description",
    link: "https://cssbattle-isfo.vercel.app/",
    tagsKey: "projects.cssbattle.tags",
    isWorkingOn: false,
  },
  {
    id: 2,
    image: "chess.png",
    categoryKey: "webDevelopment",
    titleKey: "Chess.ma",
    descriptionKey: "Chess.ma is an online chess platform designed to connect players of all levels—whether casual beginners or experienced competitors—with flexible options for playing and improving their game.",
    link: "https://chess-isfo.vercel.app/",
    tagsKey: "projects.adminDashboard.tags",
    isWorkingOn: false
  },
  {
    id: 3,
    image: "edutech.png",
    categoryKey: "webDevelopment",
    titleKey: "EduTech",
    descriptionKey: "Edutech is a platform that provides online courses for students and teachers to learn and teach respectively." ,
    link: "https://edu-tech-ma.vercel.app/",
    tagsKey: "projects.adminDashboard.tags",
    isWorkingOn: false,
  },
  {
    id: 4,
    image: "card-1.png",
    categoryKey: "portfolio.categories.webDevelopment",
    titleKey: "projects.ecommerce.title",
    descriptionKey: "projects.ecommerce.description",
    link: "#!",
    tagsKey: "projects.ecommerce.tags",
    isWorkingOn: true,
  },
  {
    id: 5,
    image: "card-2.png",
    categoryKey: "portfolio.categories.mobileApp",
    titleKey: "projects.fitnessTracker.title",
    descriptionKey: "projects.fitnessTracker.description",
    link: "#!",
    tagsKey: "projects.fitnessTracker.tags",
    isWorkingOn: true,
  },
  {
    id: 6,
    image: "card-3.png",
    categoryKey: "portfolio.categories.webDevelopment",
    titleKey: "projects.portfolioWebsite.title",
    descriptionKey: "projects.portfolioWebsite.description",
    link: "#!",
    tagsKey: "projects.portfolioWebsite.tags",
    isWorkingOn: true,
  },
];
