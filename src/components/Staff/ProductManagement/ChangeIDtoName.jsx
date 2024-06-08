// ChangeIDtoName.jsx

export const categories = {
  1: "Necklaces",
  2: "Bracelets",
  3: "Earrings",
  4: "Rings",
  5: "Tshirt",
};

export const genders = {
  1: "Male",
  2: "Female",
  3: "Other",
};
export const Material = {
  1: "Gold",
  2: "Emeral",
  3: "Diamonds",
};

export const zodiacs = {
  1: "Aries",
  2: "Taurus",
  3: "Gemini",
  4: "Cancer",
  5: "Leo",
  6: "Virgo",
  7: "Libra",
  8: "Scorpio",
  9: "Sagittarius",
  10: "Capricorn",
  11: "Aquarius",
  12: "Pisces",
};

export const getCategoryName = (id) => {
  return categories[id] || "Unknown Category";
};

export const getGenderName = (id) => {
  return genders[id] || "Unknown Gender";
};
export const getMaterialName = (id) => {
  return Material[id] || "Unknown Gender";
};

export const getZodiacName = (id) => {
  return zodiacs[id] || "Unknown Zodiac";
};


export const NameCategories = {
  "Necklaces": 1,
  "Bracelets": 2,
  "Earrings": 3,
  "Rings": 4,
  "Tshirt": 5,
};

export const NameGenders = {
  "Male": 1,
  "Female": 2,
  "Other": 3,
};

export const NameMaterials = {
  "Gold": 1,
  "Emeral": 2,
  "Diamonds": 3,
};

export const NameZodiacs = {
  "Aries": 1,
  "Taurus": 2,
  "Gemini": 3,
  "Cancer": 4,
  "Leo": 5,
  "Virgo": 6,
  "Libra": 7,
  "Scorpio": 8,
  "Sagittarius": 9,
  "Capricorn": 10,
  "Aquarius": 11,
  "Pisces": 12,
};

export const getCategoryID = (name) => {
  return NameCategories[name] || 0;
};

export const getGenderID = (name) => {
  return NameGenders[name] || 0;
};

export const getMaterialID = (name) => {
  return NameMaterials[name] || 0;
};

export const getZodiacID = (name) => {
  return NameZodiacs[name] || 0;
};