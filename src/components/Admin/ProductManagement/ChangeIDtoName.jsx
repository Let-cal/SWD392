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
