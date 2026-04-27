"use client";

import { useMemo, useCallback, useState } from "react";
import { BsBarChartLine, BsXLg } from "react-icons/bs";

const Statistics = ({ mode, outputText }) => {
  const MAX_DETAILED_STATS_CHARS = 200_000;

  const calculateReadabilityScore = useCallback(
    (sentences, words, syllables) => {
      if (words.length === 0 || sentences.length === 0) return "N/A";

      const score =
        206.835 -
        1.015 * (words.length / sentences.length) -
        84.6 * (syllables / words.length);
      if (score > 90) return "Very Easy";
      if (score > 80) return "Easy";
      if (score > 70) return "Fairly Easy";
      if (score > 60) return "Standard";
      if (score > 50) return "Fairly Difficult";
      if (score > 30) return "Difficult";
      return "Very Difficult";
    },
    []
  );

  const countSyllables = useCallback((word) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
    word = word.replace(/^y/, "");
    return (word.match(/[aeiouy]{1,2}/g) || []).length || 1;
  }, []);

  const detectPassiveVoice = useCallback((sentence) => {
    const passivePatterns =
      /\b(?:am|is|are|was|were|be|been|being)\b\s+\w+ed\b/;
    return passivePatterns.test(sentence);
  }, []);

  const countStopWords = useCallback((words) => {
    const stopWords = new Set([
      "the",
      "and",
      "in",
      "on",
      "at",
      "of",
      "a",
      "is",
      "to",
      "for",
      "with",
    ]);
    return words.filter((word) => stopWords.has(word.toLowerCase())).length;
  }, []);

  const countWordsFast = useCallback((text) => {
    let count = 0;
    let inWord = false;
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      const isWhitespace =
        code === 9 ||
        code === 10 ||
        code === 13 ||
        code === 32 ||
        code === 11 ||
        code === 12;
      if (isWhitespace) {
        inWord = false;
      } else if (!inWord) {
        inWord = true;
        count++;
      }
    }
    return count;
  }, []);

  const countSentencesFast = useCallback((text) => {
    let count = 0;
    let prevWasTerminator = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const isTerminator = ch === "." || ch === "!" || ch === "?";
      if (isTerminator && !prevWasTerminator) count++;
      prevWasTerminator = isTerminator;
    }
    return count;
  }, []);

  const countParagraphsFast = useCallback((text) => {
    let paragraphs = 0;
    let betweenParagraphs = true;
    let lineHasNonWhitespace = false;

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === "\r") continue;

      if (ch === "\n") {
        if (!lineHasNonWhitespace) betweenParagraphs = true;
        lineHasNonWhitespace = false;
        continue;
      }

      if (ch.trim() !== "") {
        if (betweenParagraphs) paragraphs++;
        betweenParagraphs = false;
        lineHasNonWhitespace = true;
      }
    }

    if (!text.trim()) return 0;
    return paragraphs;
  }, []);

  const statistics = useMemo(() => {
    const text = String(outputText ?? "");
    const trimmed = text.trim();

    if (!trimmed) {
      return [
        { label: "Reading time (Slow)", value: "N/A" },
        { label: "Reading time (Average)", value: "N/A" },
        { label: "Reading time (Fast)", value: "N/A" },
        { label: "Paragraphs", value: "N/A" },
        { label: "Sentences", value: "N/A" },
        { label: "Words", value: "N/A" },
        { label: "Characters", value: 0 },
        { label: "Unique Words", value: "N/A" },
        { label: "Longest Word", value: "N/A" },
        { label: "Shortest Word", value: "N/A" },
        { label: "Average Word Length", value: "N/A" },
        { label: "Complex Words", value: "N/A" },
        { label: "Lexical Density", value: "N/A" },
        { label: "Passive Voice Sentences", value: "N/A" },
        { label: "Longest Sentence", value: "N/A" },
        { label: "Shortest Sentence", value: "N/A" },
        { label: "Complex Sentences (20+ words)", value: "N/A" },
        { label: "Hapax Legomena", value: "N/A" },
        { label: "Average Sentence Length", value: "N/A" },
        { label: "Unique Word Ratio", value: "N/A" },
        { label: "Flesch-Kincaid Grade Level", value: "N/A" },
        { label: "Readability", value: "N/A" },
      ];
    }

    const characters = text.length;

    if (text.length > MAX_DETAILED_STATS_CHARS) {
      const wordsCount = countWordsFast(text);
      const sentencesCount = countSentencesFast(text);
      const paragraphsCount = countParagraphsFast(text);
      return [
        {
          label: "Note",
          value: `Text is large; showing basic statistics only (>${MAX_DETAILED_STATS_CHARS.toLocaleString()} chars).`,
        },
        { label: "Paragraphs", value: paragraphsCount || "N/A" },
        { label: "Sentences", value: sentencesCount || "N/A" },
        { label: "Words", value: wordsCount || "N/A" },
        { label: "Characters", value: characters || "N/A" },
      ];
    }

    const words = trimmed.split(/\s+/).filter(Boolean);
    const sentences = trimmed.split(/[.!?]+/).filter(Boolean);
    const paragraphs = text.split(/\r\n|\r|\n/).filter(Boolean);

    const wordCounts = new Map();
    for (const word of words) {
      wordCounts.set(word, (wordCounts.get(word) ?? 0) + 1);
    }

    const uniqueWordsCount = wordCounts.size;
    let hapaxLegomena = 0;
    for (const count of wordCounts.values()) {
      if (count === 1) hapaxLegomena++;
    }

    let syllables = 0;
    let longestWord = "";
    let shortestWord = "";
    let totalWordLength = 0;
    let complexWords = 0;

    for (const word of words) {
      const wordSyllables = countSyllables(word);
      syllables += wordSyllables;
      totalWordLength += word.length;
      if (wordSyllables > 3) complexWords++;
      if (word.length > longestWord.length) longestWord = word;
      if (!shortestWord || (word.length > 1 && word.length < shortestWord.length))
        shortestWord = word;
    }

    const averageWordLength = (
      totalWordLength / words.length
    ).toFixed(2);

    const slowReadingTime = (words.length / 125).toFixed(1);
    const averageReadingTime = (words.length / 200).toFixed(1);
    const fastReadingTime = (words.length / 300).toFixed(1);

    const passiveVoiceSentences = sentences.filter(detectPassiveVoice).length;
    const stopWordCount = countStopWords(words);
    const lexicalDensity = (
      ((words.length - stopWordCount) / words.length) *
      100
    ).toFixed(2);
    const longestSentence = sentences.reduce(
      (longest, sentence) =>
        sentence.split(/\s+/).length > longest.split(/\s+/).length
          ? sentence
          : longest,
      ""
    );
    const shortestSentence = sentences.reduce((shortest, sentence) => {
      const sentenceLength = sentence.split(/\s+/).length;
      return sentenceLength < shortest.split(/\s+/).length && sentenceLength > 0
        ? sentence
        : shortest;
    }, sentences[0]);

    const complexSentences = sentences.filter(
      (sentence) => sentence.split(/\s+/).length > 20
    ).length;

    const fleschKincaidGradeLevel = (
      0.39 * (words.length / sentences.length) +
      11.8 * (syllables / words.length) -
      15.59
    ).toFixed(1);

    return [
      {
        label: "Reading time (Slow)",
        value:
          `${slowReadingTime} minutes` === "0.0 minutes"
            ? "N/A"
            : `${slowReadingTime} minutes`,
      },
      {
        label: "Reading time (Average)",
        value:
          `${averageReadingTime} minutes` === "0.0 minutes"
            ? "N/A"
            : `${averageReadingTime} minutes`,
      },
      {
        label: "Reading time (Fast)",
        value:
          `${fastReadingTime} minutes` === "0.0 minutes"
            ? "N/A"
            : `${fastReadingTime} minutes`,
      },
      { label: "Paragraphs", value: paragraphs.length || "N/A" },
      { label: "Sentences", value: sentences.length || "N/A" },
      { label: "Words", value: words.length || "N/A" },
      { label: "Characters", value: characters || "N/A" },
      { label: "Unique Words", value: uniqueWordsCount || "N/A" },
      { label: "Longest Word", value: longestWord || "N/A" },
      { label: "Shortest Word", value: shortestWord || "N/A" },
      {
        label: "Average Word Length",
        value: `${averageWordLength} characters` === "NaN characters" ? "N/A" : `${averageWordLength} characters`,
      },
      { label: "Complex Words", value: complexWords || "N/A" },
      { label: "Lexical Density", value: `${lexicalDensity}%` === "NaN%" ? "N/A" : `${lexicalDensity}%` },
      { label: "Passive Voice Sentences", value: passiveVoiceSentences || "N/A" },
      { label: "Longest Sentence", value: longestSentence || "N/A" },
      { label: "Shortest Sentence", value: shortestSentence || "N/A" },
      {
        label: "Complex Sentences (20+ words)",
        value: complexSentences || "N/A",
      },
      { label: "Hapax Legomena", value: hapaxLegomena || "N/A" },
      {
        label: "Average Sentence Length",
        value:
          `${(words.length / sentences.length).toFixed(1)} words` ===
          "NaN words"
            ? "N/A"
            : `${(words.length / sentences.length).toFixed(1)} words`,
      },
      {
        label: "Unique Word Ratio",
        value:
          `${((uniqueWordsCount / words.length) * 100).toFixed(2)}%` === "NaN%"
            ? "N/A"
            : `${((uniqueWordsCount / words.length) * 100).toFixed(2)}%`,
      },
      {
        label: "Flesch-Kincaid Grade Level",
        value:
          fleschKincaidGradeLevel === "NaN" ? "N/A" : fleschKincaidGradeLevel,
      },
      {
        label: "Readability",
        value: calculateReadabilityScore(sentences, words, syllables),
      },
    ];
  }, [
    outputText,
    calculateReadabilityScore,
    countSyllables,
    detectPassiveVoice,
    countStopWords,
    countWordsFast,
    countSentencesFast,
    countParagraphsFast,
  ]);

  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-tbo-border dark:bg-tbo-panelSoft dark:text-tbo-text dark:shadow-tbo-inset dark:hover:bg-tbo-panel"
        onClick={() => setOpen(true)}
        disabled={!outputText}
      >
        <BsBarChartLine className="text-sm opacity-90" aria-hidden="true" />
        Key Statistics
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Text analysis summary"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-default bg-black/40"
            aria-label="Close statistics"
            onClick={() => setOpen(false)}
          />

          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-4xl rounded-t-2xl border border-slate-200 bg-white shadow-2xl dark:border-tbo-border dark:bg-tbo-surface">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-tbo-border dark:bg-tbo-surface">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-tbo-text">
                Text Analysis Summary
              </h3>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-tbo-border dark:bg-tbo-panel dark:text-tbo-text dark:hover:bg-tbo-panelSoft"
                onClick={() => setOpen(false)}
                aria-label="Close statistics"
              >
                <BsXLg className="text-sm opacity-80" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-auto p-4 dark:bg-tbo-surface">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {statistics.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-tbo-border dark:bg-tbo-panel"
                  >
                    <div className="text-xs font-medium text-slate-600 dark:text-tbo-muted">
                      {label}
                    </div>
                    <div className="mt-1 font-mono text-sm text-slate-900 dark:text-tbo-text">
                      {String(value)}
                    </div>
                  </div>
                ))}
              </div>

              {outputText && outputText.length > MAX_DETAILED_STATS_CHARS && (
                <p className="mt-4 text-xs text-slate-500 dark:text-tbo-muted">
                  Showing a lightweight summary because the output is very large.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
