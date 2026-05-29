export function getApiErrorMessage(error, fallbackMessage) {
  return error?.message || fallbackMessage;
}
