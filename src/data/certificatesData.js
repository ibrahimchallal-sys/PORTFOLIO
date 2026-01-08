/**
 * CERTIFICATES & BADGES DATA CONFIGURATION
 * 
 * Edit this file to update your certificates and badges.
 * 
 * Fields:
 * - id: Unique identifier (number)
 * - type: "certificate" or "badge"
 * - miniature: Image URL or path to certificate/badge image
 * - title: Title of the certificate/badge
 * - organization: Issuing organization name
 * - description: Description of the certificate/badge
 * - issueDate: Date when it was issued (format: "YYYY-MM-DD" or "Month YYYY")
 * - credentialId: Credential ID or certificate number (optional)
 * - credentialUrl: URL to verify/view the credential (optional)
 */

export const certificatesData = [
  {
    id: 1,
    type: "certificate",
    miniature: "https://via.placeholder.com/300x200?text=Certificate+1",
    title: "Web Development Certificate",
    organization: "Example Organization",
    description: "This certificate demonstrates proficiency in web development technologies including HTML, CSS, and JavaScript.",
    issueDate: "2024-01-15",
    credentialId: "CERT-2024-001",
    credentialUrl: "https://example.com/verify/CERT-2024-001"
  },
  {
    id: 2,
    type: "certificate",
    miniature: "https://via.placeholder.com/300x200?text=Certificate+2",
    title: "React Developer Certification",
    organization: "Tech Academy",
    description: "Advanced React development skills including hooks, context API, and state management.",
    issueDate: "2024-03-20",
    credentialId: "CERT-2024-002",
    credentialUrl: "https://example.com/verify/CERT-2024-002"
  },
  {
    id: 3,
    type: "badge",
    miniature: "https://via.placeholder.com/150x150?text=Badge+1",
    title: "JavaScript Master",
    organization: "Code School",
    description: "Achieved mastery level in JavaScript programming.",
    issueDate: "2024-02-10",
    credentialId: "BADGE-JS-001",
    credentialUrl: "https://example.com/badges/JS-001"
  },
  {
    id: 4,
    type: "badge",
    miniature: "https://via.placeholder.com/150x150?text=Badge+2",
    title: "UI/UX Design Expert",
    organization: "Design Institute",
    description: "Expert level badge in user interface and user experience design.",
    issueDate: "2024-04-05",
    credentialId: "BADGE-UI-001",
    credentialUrl: "https://example.com/badges/UI-001"
  },
];
