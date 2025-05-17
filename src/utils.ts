export function getFormikError(errors: any, touched: any, ...path: (string | number)[]): string | undefined {
  let currentError = errors;
  let currentTouched = touched;

  for (const key of path) {
    if (!currentError || !currentTouched) return undefined;
    currentError = currentError[key];
    currentTouched = currentTouched[key];
  }

  return typeof currentError === 'string' && currentTouched ? currentError : undefined;
}
