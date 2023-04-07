export function isNotUndefined<T>(input: T | undefined): input is T {
  return input !== undefined;
}

export function isNotNull<T>(input: T | null): input is T {
  return input !== null;
}

export function isNotNullish<T>(input: T | null | undefined): input is T {
  return input !== null && input !== undefined;
}
