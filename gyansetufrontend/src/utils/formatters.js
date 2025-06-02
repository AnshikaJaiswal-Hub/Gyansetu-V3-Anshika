export const formatIndianRupee = (value) => {
  // Convert to crores/lakhs format for larger numbers
  if (value >= 10000000) { // 1 crore
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) { // 1 lakh
    return `₹${(value / 100000).toFixed(2)} L`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
}; 