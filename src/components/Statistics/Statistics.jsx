import React, { useMemo, useCallback } from "react";

const Statistics = ({ mode, outputText }) => {
  const isDarkMode = mode === "dark";
  const themeColor = isDarkMode ? "light" : "dark";
  const bgColor = isDarkMode ? "#212529" : "#F8F9FA";
  const textColor = isDarkMode ? "white" : "black";

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
    return word.match(/[aeiouy]{1,2}/g)?.length || 1;
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

  const statistics = useMemo(() => {
    const words = outputText.split(/\s+/).filter(Boolean);
    const sentences = outputText.split(/[.!?]+/).filter(Boolean);
    const paragraphs = outputText.split(/\r\n|\r|\n/).filter(Boolean);
    const characters = outputText.length;

    const uniqueWords = new Set(words);
    const syllables = words.reduce(
      (sum, word) => sum + countSyllables(word),
      0
    );
    const longestWord = words.reduce(
      (longest, word) => (word.length > longest.length ? word : longest),
      ""
    );
    const shortestWord = words.reduce(
      (shortest, word) =>
        word.length < shortest.length && word.length > 1 ? word : shortest,
      words[0]
    );
    const averageWordLength = (
      words.reduce((sum, word) => sum + word.length, 0) / words.length
    ).toFixed(2);
    const complexWords = words.filter(
      (word) => countSyllables(word) > 3
    ).length;

    const slowReadingTime = (words.length / 125).toFixed(1);
    const averageReadingTime = (words.length / 200).toFixed(1);
    const fastReadingTime = (words.length / 300).toFixed(1);

    const passiveVoiceSentences = sentences.filter((sentence) =>
      detectPassiveVoice(sentence)
    ).length;
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
    const shortestSentence = sentences.reduce(
      (shortest, sentence) =>
        sentence.split(/\s+/).length < shortest.split(/\s+/).length
          ? sentence
          : shortest,
      sentences[0]
    );
    const complexSentences = sentences.filter(
      (sentence) => sentence.split(/\s+/).length > 20
    ).length;
    const hapaxLegomena = words.filter(
      (word) => words.filter((w) => w === word).length === 1
    ).length;

    const fleschKincaidGradeLevel = (
      0.39 * (words.length / sentences.length) +
      11.8 * (syllables / words.length) -
      15.59
    ).toFixed(1);

    return [
      { label: "Reading time (Slow)", value: `${slowReadingTime} minutes` },
      {
        label: "Reading time (Average)",
        value: `${averageReadingTime} minutes`,
      },
      { label: "Reading time (Fast)", value: `${fastReadingTime} minutes` },
      { label: "Paragraphs", value: paragraphs.length },
      { label: "Sentences", value: sentences.length },
      { label: "Words", value: words.length },
      { label: "Characters", value: characters },
      { label: "Unique Words", value: uniqueWords.size },
      { label: "Longest Word", value: longestWord },
      { label: "Shortest Word", value: shortestWord },
      {
        label: "Average Word Length",
        value: `${averageWordLength} characters`,
      },
      { label: "Complex Words", value: complexWords },
      { label: "Lexical Density", value: `${lexicalDensity}%` },
      { label: "Passive Voice Sentences", value: passiveVoiceSentences },
      { label: "Longest Sentence", value: longestSentence },
      { label: "Shortest Sentence", value: shortestSentence },
      { label: "Complex Sentences (20+ words)", value: complexSentences },
      { label: "Hapax Legomena", value: hapaxLegomena },
      {
        label: "Average Sentence Length",
        value: `${(words.length / sentences.length).toFixed(1)} words`,
      },
      {
        label: "Unique Word Ratio",
        value: `${((uniqueWords.size / words.length) * 100).toFixed(2)}%`,
      },
      { label: "Flesch-Kincaid Grade Level", value: fleschKincaidGradeLevel },
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
  ]);

  return (
    <div className="d-flex justify-content-center">
      <button
        className={`btn mx-1 btn-sm text-uppercase shadow`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasBottom"
        aria-controls="offcanvasBottom"
        style={{
          borderRadius: "50px",
          fontWeight: "600",
          padding: "12px 30px",
          backgroundColor: isDarkMode ? "#343a40" : "#007bff",
          color: "#ffffff",
          border: "none",
          transition: "background-color 0.3s, transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDarkMode
            ? "#495057"
            : "#0056b3";
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isDarkMode
            ? "#343a40"
            : "#007bff";
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        Key Statistics
      </button>

      <div
        className="offcanvas offcanvas-bottom statistics-section"
        tabIndex="-1"
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          height: "70vh",
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
          padding: "20px",
        }}
      >
        <div
          className="offcanvas-header"
          style={{ borderBottom: `1px solid ${textColor}` }}
        >
          <h5 className="offcanvas-title" id="offcanvasBottomLabel">
            Text Analysis Summary
          </h5>
          <button
            type="button"
            className={`btn-close btn-close-${themeColor}`}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div
          className="offcanvas-body"
          style={{ overflowY: "auto", padding: "10px 0" }}
        >
          <div className="table-responsive">
            <table
              className={`table table-hover table-sm statistics-text table-${mode}`}
              style={{ textAlign: "left" }}
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: isDarkMode ? "#495057" : "#e2e6ea",
                      color: isDarkMode ? "white" : "black",
                      padding: "10px 15px",
                    }}
                  >
                    Metric
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: isDarkMode ? "#495057" : "#e2e6ea",
                      color: isDarkMode ? "white" : "black",
                      padding: "10px 15px",
                    }}
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {statistics.map((stat, index) => (
                  <tr
                    key={index}
                    style={{ transition: "background-color 0.2s" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = isDarkMode
                        ? "#343a40"
                        : "#e9ecef")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "inherit")
                    }
                  >
                    <td style={{ padding: "10px 15px" }}>{stat.label}</td>
                    <td style={{ padding: "10px 15px" }}>{stat.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
