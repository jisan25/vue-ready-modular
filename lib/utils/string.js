// lib/utils/string.js
import pluralize from "pluralize";

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// pluralize dynamically
export const plural = (str) => pluralize(str.toLowerCase());

export const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // CountryDetail -> Country-Detail
    .toLowerCase(); // country-detail
};
