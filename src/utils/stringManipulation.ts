export function makeSentenceCase(target: string): string {
  const lowercaseTarget = target.toLowerCase();
  const sanitizedString = sanitizeString(lowercaseTarget);
  const newString = sanitizedString[0].toUpperCase() + sanitizedString.slice(1);
  return newString;
}

export function makeUpperCase(target: string): string {
  const newString = target;
  let sanitizedString = sanitizeString(newString);
  const allCaps = sanitizedString.toUpperCase();
  return allCaps;
}

export function makeLowerCase(target: string): string {
  const newString = target;
  let sanitizedString = sanitizeString(newString);
  const allCaps = sanitizedString.toLowerCase();
  return allCaps;
}

export function sanitizeString(target: string): string {
  let newString = target.replace(/[^\w+,]/g, '');
  return newString;
}
