import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Capitalize the first letter of the given string.
 *
 * This function takes a string as input and returns a new string with the first letter
 * converted to uppercase while the rest of the string remains unchanged.
 *
 * @param {string} string - The string to be processed.
 * @returns {string} - The input string with its first letter capitalized.
 *
 * @example
 * // returns "Hello"
 * capitalizeFirstLetter("hello");
 */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Format the given price in cents to a string representing the price in euros.
 *
 * This function converts the input price in cents to euros by dividing it by 100.
 * It then formats the resulting value using the French locale ("fr-FR") with the
 * currency style set to Euros ("EUR").
 *
 * @param {number} price - The price in cents to be formatted.
 * @returns {string} - The formatted price in euros.
 *
 * @example
 * // returns "0,50 €"
 * formatPrice(50);
 */
export function formatPrice(price: number): string {
  const priceInEuros = price / 100;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(priceInEuros);
}

/**
 * Check if a given string is in the format HH:MM.
 *
 * This function verifies if the input string matches the HH:MM format, where HH is
 * a two-digit hour between 00 and 23, and MM is a two-digit minute between 00 and 59.
 *
 * @param {string | undefined} time - The time string to be validated.
 * @returns {boolean} - True if the input is in HH:MM format or undefined, false otherwise.
 *
 * @example
 * // returns true
 * isValidTimeFormat("08:00");
 *
 * @example
 * // returns false
 * isValidTimeFormat("25:00");
 */
export function isValidTimeFormat(time?: string): boolean {
  if (!time) return true;
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
}

/**
 * Format the given phone number to a string representing the phone number in a national format.
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} - The formatted phone number in a national format
 *
 * @example
 * // returns "06 12 34 56 78"
 * formatPhoneNumber("0612345678");
 */
export function formatPhoneNumber(phoneNumber: string): string {
  const parsedNumber = parsePhoneNumberFromString(phoneNumber, "FR");
  if (!parsedNumber) {
    return phoneNumber; // return original if parsing fails
  }
  return parsedNumber.formatNational();
}

/**
 * Return the date in the format "DD/MM/YYYY"
 * @param {Date} date - The date to format
 * @returns {string} - The formatted date
 */
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}
