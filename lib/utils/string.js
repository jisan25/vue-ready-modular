// lib/utils/string.js
import pluralize from 'pluralize'

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

// pluralize dynamically
export const plural = (str) => pluralize(str.toLowerCase())
