import { useState } from "react";

// import randomWords from "random-words";
import wordsFrequency from "words-frequency";
import superbstring from "superbstring";
import numberPro from "number-pro";
import getQuotes from "quotes-factory";
import caseString from "case-string";
import { Dropdown } from "react-bootstrap";
import { frequencyOfString } from "character-frequency";
import { generateSlug } from "random-word-slugs";
import { motion } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../css/TextForm.css";

const TextForm = (props) => {
  const [text, setText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [inputDarkBackground, setInputDarkBackground] = useState("#242526");
  const [outputDarkBackground, setOutputDarkBackground] = useState("#242526");
  const [inputLightBackground, setInputLightBackground] = useState("white");
  const [outputLightBackground, setOutputLightBackground] = useState("white");

  /* MENU DROPDOWN STARTS */
  // uploadTextFile() function - STARTS
  const uploadTextFile = () => {
    let files = document.querySelector('input[type="file"]').files;
    const reader = new FileReader();
    reader.onload = () => {
      const lines = reader.result;
      setText(lines);
      setGeneratedText(lines);
    };
    setInputLightBackground("#8BE48B");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    setInputDarkBackground("#8BE48B");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    reader.readAsText(files[0]);
  };
  // uploadTextFile() function - ENDS
  // downloadTxtFile() function - STARTS
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
    setOutputLightBackground("#0DCAF0");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setOutputDarkBackground("#0DCAF0");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
  };
  // downloadTxtFile() function - ENDS
  /* MENU DROPDOWN ENDS */

  /* EDIT DROPDOWN STARTS */
  // splitText() function - STARTS
  const splitText = () => {
    const newText = superbstring.splitString(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text is splitted!.", "success");
  };
  // splitText() function - ENDS
  // joinText() function - STARTS
  const joinText = () => {
    const newText = superbstring.joinString(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text is joined!.", "success");
  };
  // joinText() function - ENDS
  // removeExtraSpaces() function - STARTS
  const removeExtraSpaces = () => {
    const newText = superbstring.removeExtraSpaces(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Extra spaces removed!", "success");
  };
  // removeExtraSpaces() function - ENDS
  // removeAllSpaces() function - STARTS
  const removeAllSpaces = () => {
    const newText = superbstring.removeAllSpaces(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("All spaces removed!", "success");
  };
  // removeAllSpaces() function - ENDS
  // removeAllSymbols() function - STARTS
  const removeAllSymbols = () => {
    const newText = superbstring.removeAllSymbols(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("All symbols removed!", "success");
  };
  // removeAllSymbols() function - ENDS
  // duplicate() function - STARTS
  const duplicate = () => {
    const count = Number(
      prompt("How many times do you want to duplicate the text?")
    );
    const newText = superbstring.duplicate(text, count);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text duplicated!", "success");
  };
  // duplicate() function - ENDS
  // reverse() function - STARTS
  const reverse = () => {
    const newText = superbstring.reverse(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text Reversed!", "success");
  };
  // reverse() function - ENDS
  // slugify() function - STARTS
  const slugify = () => {
    const newText = superbstring.slugify(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text Slugified!", "success");
  };
  // slugify() function - ENDS
  // truncate() function - STARTS
  const truncate = () => {
    const length = prompt("What length upto you want to truncate your text?");
    const newText = superbstring.truncate(text, length);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text Truncated!", "success");
  };
  // truncate() function - ENDS
  // paraToSingleLine() function - STARTS
  const paraToSingleLine = () => {
    const newText = superbstring.paraToSingleLine(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Changed to one line text!", "success");
  };
  // alphabetize() function - STARTS
  const alphabetize = () => {
    const newText = superbstring.alphabetize(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text Alphabetized", "success");
  };
  // alphabetize() function - ENDS
  // zalgo() function - STARTS
  const zalgo = () => {
    const newText = superbstring.zalgo(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Zalgo affect applied", "success");
  };
  // zalgo() function - ENDS
  // rot13Deg() function - STARTS
  const rot13Deg = () => {
    const newText = superbstring.rotate13Deg(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Rotate 13 decoder applied", "success");
  };
  // rot13Deg() function - ENDS
  // addLineNum() function - STARTS
  const addLineNum = () => {
    const newText = text
      .split("\n")
      .map((line, index) => `${index + 1}. ${line}`)
      .join("\n");
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Line numbers added.", "success");
  };
  // addLineNum() function - ENDS
  // urlEncoded() function - STARTS
  const urlEncoded = () => {
    const newText = encodeURI(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Encoded to URL", "success");
  };
  // urlEncoded() function - ENDS
  // urlDecoded() function - STARTS
  const urlDecoded = () => {
    const newText = decodeURI(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Decoded the URL", "success");
  };
  // urlDecoded() function - ENDS
  // base64Encode() function - STARTS
  const base64Encode = () => {
    const newText = btoa(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Base64 encoded!", "success");
  };
  // base64Encode() function - ENDS
  // base64Decode() function - STARTS
  const base64Decode = () => {
    const newText = atob(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Base64 decoded!", "success");
  };
  // base64Decode() function - ENDS
  // unixToDate() function - STARTS
  const unixToDate = () => {
    const newText = numberPro.unixToDate(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted from Unix Time to Date", "success");
  };
  // unixToDate() function - ENDS
  // unixToTime() function - STARTS
  const unixToTime = () => {
    const newText = numberPro.unixToTime(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted from Unix Timestamp to Time", "success");
  };
  // unixToTime() function - ENDS
  // formatNumbers() function - STARTS
  const formatNumbers = () => {
    const newText = numberPro.formatNumbers(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Number(s) Formated!", "success");
  };
  // formatNumbers() function - ENDS
  // extractText() function - STARTS
  const extractText = () => {
    const newText = superbstring.extractText(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text Extracted!", "success");
  };
  // extractText() function - ENDS
  // extractNumbers() function - STARTS
  const extractNumbers = () => {
    const newText = superbstring.extractNumber(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Numbers Extracted!", "success");
  };
  // extractNumbers() function - ENDS
  // addPrefix() function - STARTS
  const addPrefix = () => {
    const prefix = window.prompt(
      "Enter the text you need to prefix to the text inside the text area."
    );
    const newText = superbstring.addPrefix(text, prefix);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Prefix added!", "success");
  };
  // addPrefix() function - ENDS
  // addSuffix() function - STARTS
  const addSuffix = () => {
    const suffix = window.prompt(
      "Enter the text you need to suffix to the text inside the text area."
    );
    const newText = superbstring.addSuffix(text, suffix);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Suffix added!", "success");
  };
  // addSuffix() function - ENDS
  // sortLinesSENS() function - STARTS
  const sortLinesSENS = () => {
    const newText = text.split(/\r?\n/).sort().join("\n");
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Lines Sorted!", "success");
  };
  // sortLinesSENS() function - ENDS
  // sortLinesINSENS() function - STARTS
  const sortLinesINSENS = () => {
    const newText = text.split(/\r?\n/i).sort().join("\n");
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Lines Sorted!", "success");
  };
  // sortLinesINSENS() function - ENDS
  // sortLinesReverse() function - STARTS
  const sortLinesReverseSENS = () => {
    const newText = text.split(/\r?\n/).sort().reverse().join("\n");
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Lines Sorted in Reverse Order!", "success");
  };
  // sortLinesReverse() function - ENDS
  // sortLinesReverseINSENS() function - STARTS
  const sortLinesReverseINSENS = () => {
    const newText = text.split(/\r?\n/i).sort().reverse().join("\n");
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Lines Sorted in Reverse Order!", "success");
  };
  // sortLinesReverseINSENS() function - ENDS
  // decimalToRoman() function - STARTS
  const decimalToRoman = () => {
    const newText = numberPro.decimalToRoman(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert(
      "The entered decimal is converted to roman format!",
      "success"
    );
  };
  // decimalToRoman() function - ENDS
  // romanToDecimal() function - STARTS
  const romanToDecimal = () => {
    const newText = numberPro.romanToDecimal(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert(
      "The entered roman number is converted to decimal!",
      "success"
    );
  };
  // romanToDecimal() function - ENDS
  /* EDIT DROPDOWN ENDS */

  /* CHANGE CASE DROPDOWN STARTS */
  // upperCase() function - STARTS
  const upperCase = () => {
    const newText = text.toUpperCase();
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'UPPERCASE'!", "success");
  };
  // upperCase() function - ENDS
  // lowerCase() function - STARTS
  const lowerCase = () => {
    const newText = text.toLowerCase();
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'lowercase'!", "success");
  };
  // lowerCase() function - ENDS
  // titleCase() function - STARTS
  const titleCase = () => {
    const newText = caseString.titleCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Title Case'!", "success");
  };
  // titleCase() function - ENDS
  // reverseTitleCase() function - STARTS
  const reverseTitleCase = () => {
    const newText = caseString.reverseTitleCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Reverse Title Case'!", "success");
  };
  // reverseTitleCase() function - ENDS
  // invertCase() function - STARTS
  const invertCase = () => {
    const newText = caseString.invertCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Invert Case'!", "success");
  };
  // invertCase() function - ENDS
  // sentenceCase() function - STARTS
  /* const sentenceCase = () => {
    function firstLetterUpper() {
      var newString = text
        .toLowerCase()
        .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
          return c.toUpperCase();
        });
      setOutputDarkBackground("#CED4DA");
      setTimeout(() => {
        setOutputDarkBackground("#242526");
      }, 280);
      setOutputLightBackground("#CED4DA");
      setTimeout(() => {
        setOutputLightBackground("white");
      }, 280);
      return newString;
    }

    function convertToSentenceCase() {
      var newText = firstLetterUpper(text);
      setText(newText);
      setOutputDarkBackground("#CED4DA");
      setTimeout(() => {
        setOutputDarkBackground("#242526");
      }, 280);
      setOutputLightBackground("#CED4DA");
      setTimeout(() => {
        setOutputLightBackground("white");
      }, 280);
      props.showAlert("Converted to 'Sentence Case'!", "success");
    }
    convertToSentenceCase();
  }; */
  // sentenceCase() function - ENDS
  // toggleCase() function - STARTS
  const toggleCase = () => {
    const newText = text
      .toUpperCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toLowerCase() + word.slice(1);
      })
      .join(" ");
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Toggle cased text!", "success");
  };
  // toggleCase() function - ENDS
  // randomCase() function - STARTS
  /* const randomCase = () => {
    function toggleCase(str) {
      return str
        .toUpperCase()
        .split(" ")
        .map(function (word) {
          return word.charAt(0).toLowerCase() + word.slice(1);
        })
        .join(" ");
    }
    const newText = toggleCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Random Case'!", "success");
  }; */
  // randomCase() function - ENDS
  // camelCase() function - STARTS
  const camelCase = () => {
    const newText = caseString.camelCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Cammal Case'!", "success");
  };
  // camelCase() function - ENDS
  // pascalCase() function - STARTS
  const pascalCase = () => {
    const newText = caseString.pascalCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Pascal Case'!", "success");
  };
  // pascalCase() function - ENDS
  // kebabCase() function - STARTS
  const kebabCase = () => {
    const newText = caseString.kebabCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Kebab Case'!", "success");
  };
  // kebabCase() function - ENDS
  // snakeCase() function - STARTS
  const snakeCase = () => {
    const newText = caseString.snakeCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert(
      "Converted to 'Cammal Case (Upper Camel Case or Pascal Camel Case)'!",
      "success"
    );
  };
  // snakeCase() function - ENDS
  // alternateCase1() function - STARTS
  const alternateCase1 = () => {
    var newText = caseString.alternateCase1(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Alternate Case'!", "success");
  };
  // alternateCase1() function - ENDS
  // alternateCase2() function - STARTS
  const alternateCase2 = () => {
    var newText = caseString.alternateCase2(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Alternate Case'!", "success");
  };
  // alternateCase2() function - ENDS
  /* CHANGE CASE DROPDOWN ENDS */

  /* GENERATE DROPDOWN STARTS */
  // charFreqStr() function - STARTS
  const charFreqStr = () => {
    const JSONdata = frequencyOfString(text);
    console.log(JSONdata);
    let newText;
    for (const [key, value] of Object.entries(JSONdata)) {
      newText += `${JSON.stringify(key)} = ${JSON.stringify(value)}\n`;
    }
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Characters Frequency Generated From a String!", "success");
  };
  // charFreqStr() function - ENDS
  // wordFreq() function - STARTS
  const wordFreq = () => {
    const JSONdata = wordsFrequency(text).data;
    let newText;
    for (const [key, value] of Object.entries(JSONdata)) {
      newText += `${JSON.stringify(key)} = ${JSON.stringify(value)}\n`;
    }
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Words Frequency Generated!", "success");
  };
  // wordFreq() function - ENDS
  // getDummyText() function - STARTS
  const getDummyText = () => {
    let newText = superbstring.getDummyText();
    setText(newText);
    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("Dummy Text Generated!", "success");
  };
  // getDummyText() function - ENDS
  // getRandomCharacters() function - STARTS
  const getRandomCharacters = () => {
    const limit = prompt("What length of random characters do you need?");
    const newText = superbstring.getRandomCharacters(limit);
    setText(newText);
    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("Random Characters generated!", "success");
  };
  // getRandomCharacterss() function - ENDS
  // getRandomWords() function - STARTS
  /* const getRandomWords = () => {
    const count = Number(
      prompt("How many random words do you need? Enter a number:")
    );
    const newText = randomWords({ exactly: count, join: " " });
    setText(newText);
    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("Random Words generated!", "success");
  }; */
  // getRandomWords() function - ENDS
  // getRandomWordsSlug() function - STARTS
  const getRandomWordsSlug = () => {
    const count = Number(
      prompt("How many random words slug do you need? Enter a number:")
    );
    const newText = generateSlug(count);
    setText(newText);
    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("Random Words Slug generated!", "success");
  };
  // getRandomWordsSlug() function - ENDS
  // getNouns() function - STARTS
  const getNouns = () => {
    const count = Number(
      prompt("How many random nouns do you need? Enter a number:")
    );
    const newText = generateSlug(count, { format: "noun" });
    setText(newText);
    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert(
      "Random Nouns generated! You can join them to get all of them in a row.",
      "success"
    );
  };
  // getNouns() function - ENDS
  // getAdjectives() function - STARTS
  const getAdjectives = () => {
    const count = Number(
      prompt("How many random adjectives do you need? Enter a number:")
    );
    const newText = generateSlug(count, { format: "adjective" });
    setText(newText);
    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert(
      "Random Adjectives generated! You can join them to get all of them in a row.",
      "success"
    );
  };
  // getAdjectives() function - ENDS
  // getNumbers() function - STARTS
  const getNumbers = () => {
    const startingNum = window.prompt(
      "The STARTING Number must be SMALLER then the ENDING Number\nEnter the starting number:"
    );
    const endingNum = window.prompt(
      "The ENDING Number must be GREATER then the STARTING Number\nEnter the ending number:"
    );
    const newText = numberPro.getNumbers(startingNum, endingNum);
    setText(newText);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Entered series of numbers is generated!", "success");
  };
  // getNumbers() function - ENDS
  // getHash() function - STARTS
  const getHash = () => {
    String.hashCode = function () {
      var hash = 0,
        i,
        chr;
      if (this.length === 0) return hash;
      for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    };
    const newText = text.hashCode();
    setText(newText.toString());
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert(
      "The hash code is generated from the given string!",
      "success"
    );
  };
  // getHash() function - ENDS
  // getQuotes() function - STARTS
  const getQuote = () => {
    const statement = getQuotes().statement;
    const author = getQuotes().author;

    const newText = `${statement}\n${author}`;
    setText(newText);
    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("Random Quote Fetched!", "success");
  };
  // getQuotes() function - ENDS
  /* GENERATE DROPDOWN ENDS */

  /* BOTTOM BUTTONS START */
  // clear() function - STARTS
  const clear = () => {
    setText("");
    setGeneratedText("");
    setOutputDarkBackground("#962B35");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 400);
    setInputDarkBackground("#962B35");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 400);
    setOutputLightBackground("#962B35");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#962B35");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("Cleared!.", "success");
  };
  // clear() function - ENDS
  // copyToClipboard() function - STARTS
  /*   const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 400);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 400);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("COPIED!", "success");
  }; */
  // copyToClipboard() function - ENDS
  // pasteToTextarea() function - STARTS
  /*   const pasteToTextarea = () => {
    navigator.clipboard
      .readText()
      .then((newText) => {
        setText(newText);
        setGeneratedText(newText);
        props.showAlert("PASTED!", "success");
      })
      .catch((err) => {
        props.showAlert(err, "error");
      });
      setOutputDarkBackground("#CED4DA");
      setTimeout(() => {
        setOutputDarkBackground("#242526");
      }, 400);
      setInputDarkBackground("#CED4DA");
      setTimeout(() => {
        setInputDarkBackground("#242526");
      }, 400);
      setOutputLightBackground("#CED4DA");
      setTimeout(() => {
        setOutputLightBackground("white");
      }, 280);
      setInputLightBackground("#CED4DA");
      setTimeout(() => {
        setInputLightBackground("white");
      }, 280);
      props.showAlert("PASTED!", "success");
    }; */
  // pasteToTextarea() function - ENDS */
  /* BOTTOM BUTTONS END */

  // onTextChange() function - STARTS
  const onTextChange = (e) => {
    setText(e.target.value);
    setGeneratedText(e.target.value);
  };
  // onTextChange() function - ENDS
  return (
    <>
      <motion.h1
        className={`mt-3 text-center text-${
          props.mode === "light" ? "dark" : "light"
        }`}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            scale: 0.8,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: 0.4,
            },
          },
        }}
      >
        <span className="text-uppercase font-monospace">
          TEXTBOT<span className="text-info">ONLINE</span>
        </span>
      </motion.h1>
      <small>
        <p
          className={`text-center text-${
            props.mode === "light" ? "dark" : "light"
          }`}
        >
          Just copy/paste or upload your text here and hit desired button
        </p>
      </small>
      <div className="form-floating mb-3">
        {/* Top Buttons - START */}
        <div className="d-flex">
          {/* Menu Dropdown - STARTS */}
          <Dropdown>
            <Dropdown.Toggle
              className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}
            >
              Upload
            </Dropdown.Toggle>
            <Dropdown.Menu variant={`${props.mode}`} className="menu-opt">
              <input
                type="file"
                accept="text/plain"
                onChange={uploadTextFile}
                title="Open the text file"
                className="menu-item"
              />
            </Dropdown.Menu>
          </Dropdown>
          {/* Menu Dropdown - Ends */}
          {/* Edit Dropdown - STARTS */}
          <Dropdown>
            <Dropdown.Toggle
              className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}
            >
              Edit
            </Dropdown.Toggle>
            <Dropdown.Menu className="menu-scroll" variant={`${props.mode}`}>
              <Dropdown.Item
                onClick={splitText}
                disabled={text.length === 0}
                title="Split all words to new lines."
                className="menu-item"
              >
                Split Text
              </Dropdown.Item>
              <Dropdown.Item
                onClick={joinText}
                disabled={text.length === 0}
                title="Join all the text to a single line."
                className="menu-item"
              >
                Join Text
              </Dropdown.Item>
              <Dropdown.Item
                onClick={removeExtraSpaces}
                disabled={text.length === 0}
                title="Removes extra spaces, new ines, tab spaces"
                className="menu-item"
              >
                Remove Extra Spaces
              </Dropdown.Item>
              <Dropdown.Item
                onClick={removeAllSpaces}
                disabled={text.length === 0}
                title="Removes all the spaces, new ines, tab spaces"
                className="menu-item"
              >
                Remove All Spaces
              </Dropdown.Item>
              <Dropdown.Item
                onClick={removeAllSymbols}
                disabled={text.length === 0}
                title="Removes all the symbols"
                className="menu-item"
              >
                Remove All Symbols
              </Dropdown.Item>
              <Dropdown.Item
                onClick={duplicate}
                disabled={text.length === 0}
                title="Duplicate text"
                className="menu-item"
              >
                Duplicate
              </Dropdown.Item>
              <Dropdown.Item
                onClick={reverse}
                disabled={text.length === 0}
                title="Reverese text"
                className="menu-item"
              >
                Reverse
              </Dropdown.Item>
              <Dropdown.Item
                onClick={slugify}
                disabled={text.length === 0}
                title="Slugify text"
                className="menu-item"
              >
                Slugify
              </Dropdown.Item>
              <Dropdown.Item
                onClick={truncate}
                disabled={text.length === 0}
                title="Truncate the text upto desired length"
                className="menu-item"
              >
                Truncate
              </Dropdown.Item>
              <Dropdown.Item
                onClick={paraToSingleLine}
                disabled={text.length === 0}
                title="Convert paragraphs to single line"
                className="menu-item"
              >
                Paragraph to single line
              </Dropdown.Item>
              <Dropdown.Item
                onClick={alphabetize}
                disabled={text.length === 0}
                title="Change the order of words in text as A-Z"
                className="menu-item"
              >
                Alphabetize Text
              </Dropdown.Item>
              <Dropdown.Item
                onClick={zalgo}
                disabled={text.length === 0}
                title="Apply Zalgo affect"
                className="menu-item"
              >
                Zalgo
              </Dropdown.Item>
              <Dropdown.Item
                onClick={rot13Deg}
                disabled={text.length === 0}
                title="Rotate 13 decoder"
                className="menu-item"
              >
                Rotate 13
              </Dropdown.Item>
              <Dropdown.Item
                onClick={addLineNum}
                disabled={text.length === 0}
                title="Add line number to each line"
                className="menu-item"
              >
                Add Line Number
              </Dropdown.Item>
              <Dropdown.Item
                onClick={urlEncoded}
                disabled={text.length === 0}
                title="Encode to URL"
                className="menu-item"
              >
                Encode URL
              </Dropdown.Item>
              <Dropdown.Item
                onClick={urlDecoded}
                disabled={text.length === 0}
                title="Decode the URL"
                className="menu-item"
              >
                Decode URL
              </Dropdown.Item>
              <Dropdown.Item
                onClick={base64Encode}
                disabled={text.length === 0}
                title="Encode to URL"
                className="menu-item"
              >
                Base64 Encode
              </Dropdown.Item>
              <Dropdown.Item
                onClick={base64Decode}
                disabled={text.length === 0}
                title="Decode the URL"
                className="menu-item"
              >
                Base64 Decode
              </Dropdown.Item>
              <Dropdown.Item
                onClick={unixToDate}
                disabled={text.length === 0}
                title="Convert from Unix to date"
                className="menu-item"
              >
                UNIX to Date
              </Dropdown.Item>
              <Dropdown.Item
                onClick={unixToTime}
                disabled={text.length === 0}
                title="Convert from Unix to time"
                className="menu-item"
              >
                UNIX to Time
              </Dropdown.Item>
              <Dropdown.Item
                onClick={formatNumbers}
                disabled={text.length === 0}
                title="Adds comma to numbers after every three digits"
                className="menu-item"
              >
                Format Numbers
              </Dropdown.Item>
              <Dropdown.Item
                onClick={extractText}
                disabled={text.length === 0}
                title="Extract the text from the given string"
                className="menu-item"
              >
                Extract Text
              </Dropdown.Item>
              <Dropdown.Item
                onClick={extractNumbers}
                disabled={text.length === 0}
                title="Extract the numbers from the given string"
                className="menu-item"
              >
                Extract Numbers
              </Dropdown.Item>
              <Dropdown.Item
                onClick={addPrefix}
                disabled={text.length === 0}
                title="Adds prefix to the given string"
                className="menu-item"
              >
                Add Prefix
              </Dropdown.Item>
              <Dropdown.Item
                onClick={addSuffix}
                disabled={text.length === 0}
                title="Adds suffix to the given string"
                className="menu-item"
              >
                Add Suffix
              </Dropdown.Item>
              <Dropdown.Item
                onClick={sortLinesSENS}
                disabled={text.length === 0}
                title="Sort lines in the aphabetical order"
                className="menu-item"
              >
                Sort lines - 1
              </Dropdown.Item>
              <Dropdown.Item
                onClick={sortLinesINSENS}
                disabled={text.length === 0}
                title="Sort lines in the aphabetical order (case insensitive)"
                className="menu-item"
              >
                Sort lines - 2
              </Dropdown.Item>
              <Dropdown.Item
                onClick={sortLinesReverseSENS}
                disabled={text.length === 0}
                title="Sort lines in the reverse aphabetical order"
                className="menu-item"
              >
                Reverse sort lines - 1
              </Dropdown.Item>
              <Dropdown.Item
                onClick={sortLinesReverseINSENS}
                disabled={text.length === 0}
                title="Sort lines in the reverse aphabetical order (case insensitive)"
                className="menu-item"
              >
                Reverse sort lines - 2
              </Dropdown.Item>
              <Dropdown.Item
                onClick={decimalToRoman}
                disabled={text.length === 0}
                title="Converts Decimal to Roman numbers."
                className="menu-item"
              >
                Decimal to Roman
              </Dropdown.Item>
              <Dropdown.Item
                onClick={romanToDecimal}
                disabled={text.length === 0}
                title="Converts Roman numbers to Decimal."
                className="menu-item"
              >
                Roman to Decimal
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* Edit Dropdown - ENDS */}
          {/* Change Case Dropdown - STARTS */}
          <Dropdown>
            <Dropdown.Toggle
              className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}
            >
              Change Case
            </Dropdown.Toggle>
            <Dropdown.Menu className="menu-scroll" variant={`${props.mode}`}>
              <Dropdown.Item
                onClick={upperCase}
                disabled={text.length === 0}
                title="CHANGE THE CASE OF YOUR TEXT"
                className="menu-item"
              >
                UPPERCASE
              </Dropdown.Item>
              <Dropdown.Item
                onClick={lowerCase}
                disabled={text.length === 0}
                title="change the case of your text"
                className="menu-item"
              >
                lowercase
              </Dropdown.Item>
              <Dropdown.Item
                onClick={titleCase}
                disabled={text.length === 0}
                title="Change The Case Of Your Text"
                className="menu-item"
              >
                Title Case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={reverseTitleCase}
                disabled={text.length === 0}
                title="changE thE casE oF youR texT"
                className="menu-item"
              >
                reversE titlE casE
              </Dropdown.Item>
              <Dropdown.Item
                onClick={invertCase}
                disabled={text.length === 0}
                title="Change THE case OF your TEXT => cHANGE the CASE of YOUR text"
                className="menu-item"
              >
                Invert CASE
              </Dropdown.Item>
              {/* <Dropdown.Item
                onClick={sentenceCase}
                disabled={text.length === 0}
                title="Change the case of your text"
                className="menu-item"
              >
                Sentence case
              </Dropdown.Item> */}
              <Dropdown.Item
                onClick={toggleCase}
                disabled={text.length === 0}
                title="cHANGE tHE cASE oF yOUR tEXT"
                className="menu-item"
              >
                Toggle case
              </Dropdown.Item>
              {/* <Dropdown.Item
                onClick={randomCase}
                disabled={text.length === 0}
                title="CHangE thE CasE OF yoUR teXT"
                className="menu-item"
              >
                raNDoM cASE
              </Dropdown.Item> */}
              <Dropdown.Item
                onClick={camelCase}
                disabled={text.length === 0}
                title="changeTheCaseOfYourText"
                className="menu-item"
              >
                camelCase
              </Dropdown.Item>
              <Dropdown.Item
                onClick={pascalCase}
                disabled={text.length === 0}
                title="ChangeTheCaseOfYourText"
                className="menu-item"
              >
                PascalCase
              </Dropdown.Item>
              <Dropdown.Item
                onClick={kebabCase}
                disabled={text.length === 0}
                title="change-the-case-of-your-text"
                className="menu-item"
              >
                kebab-case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={snakeCase}
                disabled={text.length === 0}
                title="change_the_case_of_your_text"
                className="menu-item"
              >
                snake_case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={alternateCase1}
                disabled={text.length === 0}
                title="ChAnGe ThE cAsE oF yOuR tExT"
                className="menu-item"
              >
                AlTeRnAtE cAsE - 1
              </Dropdown.Item>
              <Dropdown.Item
                onClick={alternateCase2}
                disabled={text.length === 0}
                title="cHaNgE tHe CaSe Of YoUr TeXt"
                className="menu-item"
              >
                AlTeRnAtE cAsE - 2
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* Change Case Dropdown - Ends */}
          {/* Generate Dropdown - STARTS */}
          <Dropdown>
            <Dropdown.Toggle
              className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}
            >
              Generate
            </Dropdown.Toggle>
            <Dropdown.Menu className="menu-scroll" variant={`${props.mode}`}>
              <Dropdown.Item
                onClick={charFreqStr}
                title="Generate characters frequency"
                disabled={text.length === 0}
                className="menu-item"
              >
                Characters Frequency
              </Dropdown.Item>
              <Dropdown.Item
                onClick={wordFreq}
                title="Generate words frequency"
                disabled={text.length === 0}
                className="menu-item"
              >
                Words Frequency
              </Dropdown.Item>
              <Dropdown.Item
                onClick={getDummyText}
                title="Generate dummy text"
                className="menu-item"
              >
                Dummy Text
              </Dropdown.Item>
              <Dropdown.Item
                onClick={getRandomCharacters}
                title="Generate random characters"
                className="menu-item"
              >
                Random Characters
              </Dropdown.Item>
              {/* <Dropdown.Item
                onClick={getRandomWords}
                title="Generate random words"
                className="menu-item"
              >
                Random Words
              </Dropdown.Item> */}
              <Dropdown.Item
                onClick={getRandomWordsSlug}
                title="Generate random words-slug"
                className="menu-item"
              >
                Random-Words-Slug
              </Dropdown.Item>
              <Dropdown.Item
                onClick={getNouns}
                title="Generate random nouns"
                className="menu-item"
              >
                Random Nouns
              </Dropdown.Item>
              <Dropdown.Item
                onClick={getAdjectives}
                title="Generate random adjectives"
                className="menu-item"
              >
                Random Adjectives
              </Dropdown.Item>
              <Dropdown.Item
                onClick={getNumbers}
                title="Generate Numbers"
                className="menu-item"
              >
                Generate Numbers
              </Dropdown.Item>
              <Dropdown.Item
                onClick={getHash}
                title="Generate Hash Code from a string"
                className="menu-item"
              >
                Hash Code
              </Dropdown.Item>
              <Dropdown.Item
                onClick={getQuote}
                title="Generate a quote"
                className="menu-item"
              >
                Get Quote
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* Generate Dropdown - ENDS */}
        </div>
        {/* Top Buttons - END */}
        <div className="d-flex align-items-center mt-1 mb-3">
          {/* Input Textarea - STARTS */}
          <textarea
            className="form-control"
            id="floatingTextarea output"
            style={{
              width: "100%",
              backgroundColor: `${
                props.mode === "dark"
                  ? inputDarkBackground
                  : inputLightBackground
              }`,
              color: `${props.mode === "dark" ? "white" : "black"}`,
              textAlign: "left",
            }}
            onChange={onTextChange}
            value={generatedText}
            placeholder="Enter text here."
            rows={12}
            required
          ></textarea>
          {/* Input Textarea - ENDS */}
          {/* Textarea Dividing Div - STARTS */}
          <div className="mx-1"></div>
          {/* Textarea Dividing Div - ENDS */}
          {/* Output Textarea - STARTS */}
          <textarea
            className="form-control"
            id="floatingTextarea output"
            style={{
              width: "100%",
              backgroundColor: `${
                props.mode === "dark"
                  ? outputDarkBackground
                  : outputLightBackground
              }`,
              color: `${props.mode === "dark" ? "white" : "black"}`,
            }}
            value={text.length === 0 ? "Nothing to preview!" : text}
            readOnly
            rows={12}
          ></textarea>
          {/* Output Textarea - ENDS */}
        </div>

        {/* Bottom Buttons Section - START */}
        <div className="d-flex justify-content-between">
          <div>
            {/* Clear Text Button - STARTS */}
            <motion.button
              whileTap={{
                scale: 0,
              }}
              className="btn btn-danger mx-1 btn-sm bottom-btns rounded"
              onClick={clear}
              disabled={text.length === 0}
            >
              Clear <i className="bi bi-x-lg bottom-btns-icons"></i>
            </motion.button>
            {/* Clear Text Button - ENDS */}
            {/* Paste Text Button - STARTS */}
            {/* <motion.button
              whileTap={{
                scale: 0,
              }}
              className="btn btn-secondary mx-1 btn-sm bottom-btns rounded"
              onClick={pasteToTextarea}
              title="Paste the text to text area"
              style={{display: text.length === 0? "inline" : "none"}}
            >
              Paste <i className="bi bi-clipboard bottom-btns-icons"></i>
            </motion.button> */}
            {/* Paste Text Button - ENDS */}
          </div>
          <div>
            {/* Save Text Button - STARTS */}
            <motion.button
              whileTap={{
                scale: 0,
              }}
              className={`btn btn-${
                text.length === 0 ? "secondary" : "primary"
              } mx-1 btn-sm bottom-btns rounded`}
              onClick={downloadTxtFile}
              title="Save the .txt file"
              disabled={text.length === 0}
            >
              Save <i className="bi bi-download bottom-btns-icons" />
            </motion.button>
            {/* Save Text Button - ENDS */}
            {/* Copy Text Button - STARTS */}
            {/* <motion.button
              whileTap={{
                scale: 0,
              }}
              className="btn btn-warning mx-1 btn-sm bottom-btns rounded"
              onClick={copyToClipboard}
              title="Copy the text to clipboard"
              disabled={text.length === 0}
            >
              Copy{" "}
              <i className="bi bi-clipboard-check-fill bottom-btns-icons"></i>
            </motion.button> */}
            {/* Copy Text Button - ENDS */}
          </div>
        </div>
        {/* Bottom Buttons Section - END */}
      </div>

      {/* STATISTICS SECTION STARTS */}
      <hr className={`text-${props.mode === "dark" ? "light" : "dark"}`} />
      <div className="d-flex justify-content-center">
        <button
          className={`btn btn-outline-${
            props.mode === "dark" ? "light" : "dark"
          } mx-1 btn-sm statistics-btn`}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasBottom"
          aria-controls="offcanvasBottom"
        >
          <span className="text-uppercase">Statistics</span>
        </button>

        <div
          className="offcanvas offcanvas-bottom statistics-section"
          tabIndex="-1"
          id="offcanvasBottom"
          aria-labelledby="offcanvasBottomLabel"
          style={{
            backgroundColor: `${props.mode === "dark" ? "#212529" : "#F8F9FA"}`,
            color: `${props.mode === "dark" ? "white" : "black"}`,
          }}
        >
          <div
            className="offcanvas-header d-flex justify-content-center"
            style={{
              backgroundColor: `${
                props.mode === "dark" ? "#212529" : "#F8F9FA"
              }`,
              color: `${props.mode === "dark" ? "white" : "black"}`,
            }}
          >
            <table
              className={`table table-hover table-sm table-responsive statistics-text table-${props.mode}`}
            >
              <thead>
                <tr>
                  <th scope="col" colSpan="3" className="text-center">
                    TEXT SUMMARY TABLE
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Average reading time</td>
                  <td>
                    {(text.split(" ").length * 0.0033).toFixed(1)} minutes
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Paragraphs</td>
                  <td>{text.split(/\r\n|\r|\n/).filter(Boolean).length}</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Sentences</td>
                  <td>{text.split(".").filter(Boolean).length}</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Words</td>
                  <td>{text.split(/\s+/).filter(Boolean).length}</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Unique Words</td>
                  <td>{new Set(text.split(" ").filter(Boolean)).size}</td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Spaces</td>
                  <td>{text.split(" ").length - 1}</td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Characters with spaces and new lines</td>
                  <td>{text.length}</td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td>Characters without spaces and new lines</td>
                  <td>{text.replace(/\s/g, "").length}</td>
                </tr>
                <tr>
                  <th scope="row">9</th>
                  <td>Average characters per word</td>
                  <td>
                    {text.replace(/ /g, "").length / text.split(" ").length}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              className={`close-btn btn-${props.mode}`}
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
      <hr className={`text-${props.mode === "dark" ? "light" : "dark"}`} />
      {/* STATISTICS SECTION ENDS */}
    </>
  );
};

export default TextForm;
