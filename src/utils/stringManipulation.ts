export function makeSentenceCase(target: string): string {
  const lowercaseTarget = target.toLowerCase();
  const sanitizedString = lowercaseTarget.replace(/[^\w+,]/g, '');
  const newString = sanitizedString[0].toUpperCase() + sanitizedString.slice(1);
  return newString;
}

