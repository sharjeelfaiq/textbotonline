export function convertToHashCode(text) {
  return String(text)
    .split("")
    .reduce((hash, char) => {
      hash = (hash << 5) - hash + char.charCodeAt(0);
      return hash | 0;
    }, 0)
    .toString();
}
