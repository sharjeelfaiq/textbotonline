export function getPrimaryTextStats(text) {
  const value = String(text ?? "");

  let lineCount = 0;
  if (value.length > 0) {
    lineCount = 1;
    for (let i = 0; i < value.length; i++) {
      if (value.charCodeAt(i) === 10) lineCount++;
    }
  }

  let wordCount = 0;
  const wordRegex = /\S+/g;
  while (wordRegex.exec(value)) wordCount++;

  return {
    characters: value.length,
    words: wordCount,
    lines: lineCount,
  };
}

