// utils/helpers.js

// Generate Certificate ID
exports.generateCertificateId = () => {
  return "CERT-" + Math.random().toString(36).substring(2, 10).toUpperCase();
};

// Calculate Progress %
exports.calculateProgress = (completed, total) => {
  if (total === 0) return 0;
  return Math.floor((completed / total) * 100);
};