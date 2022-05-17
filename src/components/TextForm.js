import React, { useState } from "react";
import About from "./About";
import _ from "lodash";
import { Dropdown } from "react-bootstrap";
import wordsFrequency from "words-frequency";
import { frequencyOfArray, frequencyOfString } from "character-frequency";
import { generateSlug } from "random-word-slugs";
import randomWords from "random-words";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/TextForm.css";

const TextForm = (props) => {
  const [text, setText] = useState(""); // Handles the state of text inside textarea
  const [generatedText, setGeneratedText] = useState(""); // Handles the state of text inside textarea
  const [alignment, setAlignment] = useState(""); // Handles the state of alignment of text inside output textarea

  /* MENU DROPDOWN STARTS */
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
  };
  // downloadTxtFile() function - ENDS
  // uploadTextFile() function - STARTS
  const uploadTextFile = () => {
    let files = document.querySelector('input[type="file"]').files;
    const reader = new FileReader();
    reader.onload = () => {
      const lines = reader.result;
      setText(lines);
      setGeneratedText(lines);
    };
    reader.readAsText(files[0]);
  };
  // uploadTextFile() function - ENDS
  /* MENU DROPDOWN ENDS */

  /* EDIT DROPDOWN STARTS */
  // splitText() function - STARTS
  const splitText = () => {
    const newText = text
      .split(/((?:\w+ ){1})/g)
      .filter(Boolean)
      .join("\n");
    setText(newText);
    props.showAlert("Text is splitted!.", "success");
  };
  // splitText() function - ENDS
  // joinText() function - STARTS
  const joinText = () => {
    const newText = text.replace(/\n/g, "");
    setText(newText);
    props.showAlert("Text is joined!.", "success");
  };
  // joinText() function - ENDS
  // removeExtraSpaces() function - STARTS
  const removeExtraSpaces = () => {
    const newText = text
      .replace(/\s+/g, " ")
      .replace(/^\s+|\s+$/g, "")
      .replace(/ +(\W)/g, "$1");
    setText(newText);
    props.showAlert("Extra spaces removed!", "success");
  };
  // removeExtraSpaces() function - ENDS
  // removeAllSpaces() function - STARTS
  const removeAllSpaces = () => {
    const newText = text.replace(/\s+/g, "");
    setText(newText);
    props.showAlert("All spaces removed!", "success");
  };
  // removeAllSpaces() function - ENDS
  // removeAllSymbols() function - STARTS
  const removeAllSymbols = () => {
    const regex = /[0-9/A-Z/a-z/ /]/g;
    const letters = text.match(regex);
    const newText = letters.join("");
    setText(newText);
    props.showAlert("All symbols removed!", "success");
  };
  // removeAllSymbols() function - ENDS
  // duplicate() function - STARTS
  const duplicate = () => {
    const count = Number(
      prompt("How many times do you want to duplicate the text?")
    );
    const newText = text.repeat(count + 1);
    setText(newText);
    props.showAlert("Text duplicated!", "success");
  };
  // duplicate() function - ENDS
  // reverse() function - STARTS
  const reverse = () => {
    const newText = text
      .split("")
      .reverse()
      .join("");
    setText(newText);
    props.showAlert("Text Reversed!", "success");
  };
  // reverse() function - ENDS
  // slugify() function - STARTS
  const slugify = () => {
    const newText = text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setText(newText);
    props.showAlert("Text Slugified!", "success");
  };
  // slugify() function - ENDS
  // truncate() function - STARTS
  const truncate = () => {
    const length = prompt("What length upto you want to truncate your text?");
    const newText = text.substring(0, length);
    setText(newText);
    props.showAlert("Text Truncated!", "success");
  };
  // truncate() function - ENDS
  // paraToSingleLine() function - STARTS
  const paraToSingleLine = () => {
    const newText = text.replace(/\s+/g, " ");
    setText(newText);
    props.showAlert("Changed to one line text!", "success");
  };
  // alphabetize() function - STARTS
  const alphabetize = () => {
    const newText = text
      .split(" ")
      .sort(function(a, b) {
        return a.localeCompare(b);
      })
      .join(" ")
      .toString();
    setText(newText);
    props.showAlert("Text Alphabetized", "success");
  };
  // alphabetize() function - ENDS
  // zalgo() function - STARTS
  const zalgo = () => {
    var Z = {
      chars: {
        0: [
          /* up */ "\u030d" /*     ̍     */,
          "\u030e" /*     ̎     */,
          "\u0304" /*     ̄     */,
          "\u0305" /*     ̅     */,
          "\u033f" /*     ̿     */,
          "\u0311" /*     ̑     */,
          "\u0306" /*     ̆     */,
          "\u0310" /*     ̐     */,
          "\u0352" /*     ͒     */,
          "\u0357" /*     ͗     */,
          "\u0351" /*     ͑     */,
          "\u0307" /*     ̇     */,
          "\u0308" /*     ̈     */,
          "\u030a" /*     ̊     */,
          "\u0342" /*     ͂     */,
          "\u0343" /*     ̓     */,
          "\u0344" /*     ̈́     */,
          "\u034a" /*     ͊     */,
          "\u034b" /*     ͋     */,
          "\u034c" /*     ͌     */,
          "\u0303" /*     ̃     */,
          "\u0302" /*     ̂     */,
          "\u030c" /*     ̌     */,
          "\u0350" /*     ͐     */,
          "\u0300" /*     ̀     */,
          "\u0301" /*     ́     */,
          "\u030b" /*     ̋     */,
          "\u030f" /*     ̏     */,
          "\u0312" /*     ̒     */,
          "\u0313" /*     ̓     */,
          "\u0314" /*     ̔     */,
          "\u033d" /*     ̽     */,
          "\u0309" /*     ̉     */,
          "\u0363" /*     ͣ     */,
          "\u0364" /*     ͤ     */,
          "\u0365" /*     ͥ     */,
          "\u0366" /*     ͦ     */,
          "\u0367" /*     ͧ     */,
          "\u0368" /*     ͨ     */,
          "\u0369" /*     ͩ     */,
          "\u036a" /*     ͪ     */,
          "\u036b" /*     ͫ     */,
          "\u036c" /*     ͬ     */,
          "\u036d" /*     ͭ     */,
          "\u036e" /*     ͮ     */,
          "\u036f" /*     ͯ     */,
          "\u033e" /*     ̾     */,
          "\u035b" /*     ͛     */,
          "\u0346" /*     ͆     */,
          "\u031a" /*     ̚     */,
        ],
        1: [
          /* down */ "\u0316" /*     ̖     */,
          "\u0317" /*     ̗     */,
          "\u0318" /*     ̘     */,
          "\u0319" /*     ̙     */,
          "\u031c" /*     ̜     */,
          "\u031d" /*     ̝     */,
          "\u031e" /*     ̞     */,
          "\u031f" /*     ̟     */,
          "\u0320" /*     ̠     */,
          "\u0324" /*     ̤     */,
          "\u0325" /*     ̥     */,
          "\u0326" /*     ̦     */,
          "\u0329" /*     ̩     */,
          "\u032a" /*     ̪     */,
          "\u032b" /*     ̫     */,
          "\u032c" /*     ̬     */,
          "\u032d" /*     ̭     */,
          "\u032e" /*     ̮     */,
          "\u032f" /*     ̯     */,
          "\u0330" /*     ̰     */,
          "\u0331" /*     ̱     */,
          "\u0332" /*     ̲     */,
          "\u0333" /*     ̳     */,
          "\u0339" /*     ̹     */,
          "\u033a" /*     ̺     */,
          "\u033b" /*     ̻     */,
          "\u033c" /*     ̼     */,
          "\u0345" /*     ͅ     */,
          "\u0347" /*     ͇     */,
          "\u0348" /*     ͈     */,
          "\u0349" /*     ͉     */,
          "\u034d" /*     ͍     */,
          "\u034e" /*     ͎     */,
          "\u0353" /*     ͓     */,
          "\u0354" /*     ͔     */,
          "\u0355" /*     ͕     */,
          "\u0356" /*     ͖     */,
          "\u0359" /*     ͙     */,
          "\u035a" /*     ͚     */,
          "\u0323" /*     ̣     */,
        ],
        2: [
          /* mid */ "\u0315" /*     ̕     */,
          "\u031b" /*     ̛     */,
          "\u0340" /*     ̀     */,
          "\u0341" /*     ́     */,
          "\u0358" /*     ͘     */,
          "\u0321" /*     ̡     */,
          "\u0322" /*     ̢     */,
          "\u0327" /*     ̧     */,
          "\u0328" /*     ̨     */,
          "\u0334" /*     ̴     */,
          "\u0335" /*     ̵     */,
          "\u0336" /*     ̶     */,
          "\u034f" /*     ͏     */,
          "\u035c" /*     ͜     */,
          "\u035d" /*     ͝     */,
          "\u035e" /*     ͞     */,
          "\u035f" /*     ͟     */,
          "\u0360" /*     ͠     */,
          "\u0362" /*     ͢     */,
          "\u0338" /*     ̸     */,
          "\u0337" /*     ̷      */,
          "\u0361" /*     ͡     */,
          "\u0489" /*     ҉_     */,
        ],
      },
      random: function(len) {
        if (len === 1) return 0;
        return !!len ? Math.floor(Math.random() * len + 1) - 1 : Math.random();
      },
      generate: function(str) {
        var str_arr = str.split(""),
          output = str_arr.map(function(a) {
            if (a === " ") return a;
            for (var i = 0, l = Z.random(16); i < l; i++) {
              var rand = Z.random(3);
              a += Z.chars[rand][Z.random(Z.chars[rand].length)];
            }
            return a;
          });
        return output.join("");
      },
    };
    const newText = Z.generate(text);
    setText(newText);
    props.showAlert("Zalgo affect applied", "success");
  };
  // zalgo() function - ENDS
  // rot13Deg() function - STARTS
  const rot13Deg = () => {
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var b = "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM";
    const newText = text.replace(/[a-z]/gi, (c) => b[a.indexOf(c)]);
    setText(newText);
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
    props.showAlert("Line numbers added.", "success");
  };
  // addLineNum() function - ENDS
  // urlEncoded() function - STARTS
  const urlEncoded = () => {
    const newText = encodeURI(text);
    setText(newText);
    props.showAlert("Rotate 13 decoder applied", "success");
  };
  // urlEncoded() function - ENDS
  // urlDecoded() function - STARTS
  const urlDecoded = () => {
    const newText = decodeURI(text);
    setText(newText);
    props.showAlert("Rotate 13 decoder applied", "success");
  };
  // urlDecoded() function - ENDS
  // base64Encode() function - STARTS
  const base64Encode = () => {
    const newText = btoa(text);
    setText(newText);
    props.showAlert("Rotate 13 decoder applied", "success");
  };
  // base64Encode() function - ENDS
  // base64Decode() function - STARTS
  const base64Decode = () => {
    const newText = atob(text);
    setText(newText);
    props.showAlert("Rotate 13 decoder applied", "success");
  };
  // base64Decode() function - ENDS
  // unixToDate() function - STARTS
  const unixToDate = () => {
    const unixTime = text;
    const date = new Date(unixTime * 1000);
    const newText = date.toLocaleDateString("en-US");
    setText(newText);
    props.showAlert("Converted from Unix Time to Date", "success");
  };
  // unixToDate() function - ENDS
  // unixToTime() function - STARTS
  const unixToTime = () => {
    const unix_timestamp = text;
    const date = new Date(unix_timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const newText =
      hours + " : " + minutes.substr(-2) + " : " + seconds.substr(-2);
    setText(newText);
    props.showAlert("Converted from Unix Timestamp to Time", "success");
  };
  // unixToTime() function - ENDS
  // formatNumbers() function - STARTS
  const formatNumbers = () => {
    const num = parseInt(text);
    const newText = num.toLocaleString();
    setText(newText);
    props.showAlert("Number(s) Formated!", "success");
  };
  // formatNumbers() function - ENDS
  // extractText() function - STARTS
  const extractText = () => {
    const regex = /[A-Z/a-z/ /]/g;
    const letters = text.match(regex);
    const newText = letters.join("");
    setText(newText);
    props.showAlert("Text Extracted!", "success");
  };
  // extractText() function - ENDS
  // extractNumbers() function - STARTS
  const extractNumbers = () => {
    const regex = /[0-9/ /]/g;
    const nums = text.match(regex);
    const newText = nums.join("");
    setText(newText);
    props.showAlert("Text Extracted!", "success");
  };
  // extractNumbers() function - ENDS
  // addPrefix() function - STARTS
  const addPrefix = () => {
    const prefix = window.prompt(
      "Enter the text you need to prefix to the text inside the text area."
    );
    const newText = prefix.concat(text);
    setText(newText);
    props.showAlert("Text Extracted!", "success");
  };
  // addPrefix() function - ENDS
  // addSuffix() function - STARTS
  const addSuffix = () => {
    const suffix = window.prompt(
      "Enter the text you need to suffix to the text inside the text area."
    );
    const newText = text.concat(suffix);
    setText(newText);
    props.showAlert("Text Extracted!", "success");
  };
  // addSuffix() function - ENDS
  // sortLinesSENS() function - STARTS
  const sortLinesSENS = () => {
    const newText = text
      .split(/\r?\n/)
      .sort()
      .join("\n");
    setText(newText);
    props.showAlert("Lines Sorted!", "success");
  };
  // sortLinesSENS() function - ENDS
  // sortLinesINSENS() function - STARTS
  const sortLinesINSENS = () => {
    const newText = text
      .split(/\r?\n/i)
      .sort()
      .join("\n");
    setText(newText);
    props.showAlert("Lines Sorted!", "success");
  };
  // sortLinesINSENS() function - ENDS
  // sortLinesReverse() function - STARTS
  const sortLinesReverseSENS = () => {
    const newText = text
      .split(/\r?\n/)
      .sort()
      .reverse()
      .join("\n");
    setText(newText);
    props.showAlert("Lines Sorted in Reverse Order!", "success");
  };
  // sortLinesReverse() function - ENDS
  // sortLinesReverseINSENS() function - STARTS
  const sortLinesReverseINSENS = () => {
    const newText = text
      .split(/\r?\n/i)
      .sort()
      .reverse()
      .join("\n");
    setText(newText);
    props.showAlert("Lines Sorted in Reverse Order!", "success");
  };
  // sortLinesReverseINSENS() function - ENDS
  // decimalToRoman() function - STARTS
  const decimalToRoman = () => {
    const intToRoman = (num) => {
      let result = "";
      while (num) {
        if (num >= 1000) {
          result += "M";
          num -= 1000;
        } else if (num >= 500) {
          if (num >= 900) {
            result += "CM";
            num -= 900;
          } else {
            result += "D";
            num -= 500;
          }
        } else if (num >= 100) {
          if (num >= 400) {
            result += "CD";
            num -= 400;
          } else {
            result += "C";
            num -= 100;
          }
        } else if (num >= 50) {
          if (num >= 90) {
            result += "XC";
            num -= 90;
          } else {
            result += "L";
            num -= 50;
          }
        } else if (num >= 10) {
          if (num >= 40) {
            result += "XL";
            num -= 40;
          } else {
            result += "X";
            num -= 10;
          }
        } else if (num >= 5) {
          if (num >= 9) {
            result += "IX";
            num -= 9;
          } else {
            result += "V";
            num -= 5;
          }
        } else {
          if (num >= 4) {
            result += "IV";
            num -= 4;
          } else {
            result += "I";
            num -= 1;
          }
        }
      }
      return result;
    };
    const newText = intToRoman(Math.abs(Number(text)));
    setText(newText);
    props.showAlert(
      "The entered decimal is converted to roman format!",
      "success"
    );
  };
  // decimalToRoman() function - ENDS
  // romanToDecimal() function - STARTS
  const romanToDecimal = () => {
    const romanToInt = (s) => {
      const legend = "IVXLCDM";
      const l = [1, 5, 10, 50, 100, 500, 1000];
      let sum = 0;
      while (s) {
        if (!!s[1] && legend.indexOf(s[0]) < legend.indexOf(s[1])) {
          sum += l[legend.indexOf(s[1])] - l[legend.indexOf(s[0])];
          s = s.substring(2, s.length);
        } else {
          sum += l[legend.indexOf(s[0])];
          s = s.substring(1, s.length);
        }
      }
      return sum;
    };
    setText(romanToInt(text.toUpperCase()).toString());
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
    props.showAlert("Converted to 'UPPERCASE'!", "success");
  };
  // upperCase() function - ENDS
  // lowerCase() function - STARTS
  const lowerCase = () => {
    const newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to 'lowercase'!", "success");
  };
  // lowerCase() function - ENDS
  // titleCase() function - STARTS
  const titleCase = () => {
    const newText = _.startCase(text);
    setText(newText);
    props.showAlert("Converted to 'Title Case'!", "success");
  };
  // titleCase() function - ENDS
  // reverseTitleCase() function - STARTS
  const reverseTitleCase = () => {
    const newText = text
      .toLowerCase()
      .split(" ")
      .map(function(item) {
        return item.slice(0, -1) + item.slice(-1).toUpperCase();
      })
      .join(" ");
    setText(newText);
    props.showAlert("Converted to 'Reverse Title Case'!", "success");
  };
  // reverseTitleCase() function - ENDS
  // invertCase() function - STARTS
  const invertCase = () => {
    const newText = text.replace(/./g, (c) =>
      c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
    );
    setText(newText);
    props.showAlert("Converted to 'Inverse Case'!", "success");
  };
  // invertCase() function - ENDS
  // sentenceCase() function - STARTS
  const sentenceCase = () => {
    function firstLetterUpper() {
      var newString = text
        .toLowerCase()
        .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function(c) {
          return c.toUpperCase();
        });
      return newString;
    }

    function convertToSentenceCase() {
      var newText = firstLetterUpper(text);
      setText(newText);
      props.showAlert("Converted to 'Sentence Case'!", "success");
    }
    convertToSentenceCase();
  };
  // sentenceCase() function - ENDS
  // toggleCase() function - STARTS
  const toggleCase = () => {
    const newText = text
      .toUpperCase()
      .split(" ")
      .map(function(word) {
        return word.charAt(0).toLowerCase() + word.slice(1);
      })
      .join(" ");
    setText(newText);
  };
  // toggleCase() function - ENDS
  // randomCase() function - STARTS
  const randomCase = () => {
    function toggleCase(str) {
      return str
        .toUpperCase()
        .split(" ")
        .map(function(word) {
          return word.charAt(0).toLowerCase() + word.slice(1);
        })
        .join(" ");
    }
    const newText = toggleCase(text);
    setText(newText);
    props.showAlert("Converted to 'Random Case'!", "success");
  };
  // randomCase() function - ENDS
  // camelCase() function - STARTS
  const camelCase = () => {
    function camelize(str) {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
    }
    const newText = camelize(text);
    setText(newText);
    props.showAlert("Converted to 'Cammal Case'!", "success");
  };
  // camelCase() function - ENDS
  // pascalCase() function - STARTS
  const pascalCase = () => {
    function toPascalCase(string) {
      return `${string}`
        .replace(new RegExp(/[-_]+/, "g"), " ")
        .replace(new RegExp(/[^\w\s]/, "g"), "")
        .replace(
          new RegExp(/\s+(.)(\w*)/, "g"),
          ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
        )
        .replace(new RegExp(/\w/), (s) => s.toUpperCase());
    }
    const newText = toPascalCase(text);
    setText(newText);
    props.showAlert("Converted to 'Pascal Case'!", "success");
  };
  // pascalCase() function - ENDS
  // kebabCase() function - STARTS
  const kebabCase = () => {
    const kebabCase = string => string
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
  
    const newText = kebabCase(text);
    setText(newText);
    props.showAlert("Converted to 'Kebab Case'!", "success");
  };
  // kebabCase() function - ENDS
  // snakeCase() function - STARTS
  const snakeCase = () => {
    const toSnakeCase = (str = "") => {
      const strArr = str.split(" ");
      const snakeArr = strArr.reduce((acc, val) => {
        return acc.concat(val.toLowerCase());
      }, []);
      return snakeArr.join("_");
    };
    const newText = toSnakeCase(text);
    setText(newText);
    props.showAlert(
      "Converted to 'Cammal Case (Upper Camel Case or Pascal Camel Case)'!",
      "success"
    );
  };
  // snakeCase() function - ENDS
  // alternateCase1() function - STARTS
  const alternateCase1 = () => {
    var newText = text.toLowerCase().split("");
    for (var i = 0; i < newText.length; i += 2) {
      newText[i] = newText[i].toUpperCase();
    }
    setText(newText.join(""));
    props.showAlert("Converted to 'Alternate Case'!", "success");
  };
  // alternateCase1() function - ENDS
  // alternateCase2() function - STARTS
  const alternateCase2 = () => {
    var newText = text.toUpperCase().split("");
    for (var i = 0; i < newText.length; i += 2) {
      newText[i] = newText[i].toLowerCase();
    }
    setText(newText.join(""));
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
    props.showAlert("Words Frequency Generated!", "success");
  };
  // wordFreq() function - ENDS
  // getDummyText() function - STARTS
  const getDummyText = () => {
    let newText = generatedText.concat(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
    );
    setText(newText);
    setGeneratedText(newText);
    props.showAlert("Dummy Text Generated!", "success");
  };
  // getDummyText() function - ENDS
  // getRandomCharacters() function - STARTS
  const getRandomCharacters = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-!%*~`_()[]{}<>";
    let newText = "";
    const chaactersLength = characters.length;
    const limit = prompt("What length of random characters do you need?");

    for (let i = 0; i < limit; i++) {
      newText += characters.charAt(Math.floor(Math.random() * chaactersLength));
    }

    setText(newText);
    setGeneratedText(newText);
    props.showAlert("Random Words generated!", "success");
  };
  // getRandomCharacterss() function - ENDS
  // getRandomWords() function - STARTS
  const getRandomWords = () => {
    const count = Number(
      prompt("How many random words do you need? Enter a number:")
    );
    const newText = randomWords({ exactly: count, join: " " });
    setText(newText);
    setGeneratedText(newText);
    props.showAlert("Random Words generated!", "success");
  };
  // getRandomWords() function - ENDS
  // getRandomWordsSlug() function - STARTS
  const getRandomWordsSlug = () => {
    const count = Number(
      prompt("How many random words slug do you need? Enter a number:")
    );
    const newText = generateSlug(count);
    setText(newText);
    setGeneratedText(newText);
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
    props.showAlert(
      "Random Adjectives generated! You can join them to get all of them in a row.",
      "success"
    );
  };
  // getAdjectives() function - ENDS
  // getNumbers() function - STARTS
  const getNumbers = () => {
    const startingNum = window.prompt("Enter the starting number:");
    const endingNum = window.prompt("Enter the ending number:");
    let newText = "";
    for (
      let numberSeries = startingNum;
      numberSeries <= endingNum;
      numberSeries++
    ) {
      newText += numberSeries.toString() + "\n";
    }
    setText(newText);
    props.showAlert("Entered series of numbers is generated!", "success");
  };
  // getNumbers() function - ENDS
  // getHash() function - STARTS
  const getHash = () => {
    String.prototype.hashCode = function() {
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
    props.showAlert(
      "The hash code is generated from the given string!",
      "success"
    );
  };
  // getHash() function - ENDS
  // getQuotes() function - STARTS
  const getQuotes = () => {
    const inspo = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;
    fetch(inspo)
      .then((res) => res.json())
      .then((data) => {
        const dataQuotes = data.quotes;
        // Gives us our array of quotes
        const randomNum = Math.floor(Math.random() * dataQuotes.length);
        // Randomization: This is iterating a random number from 0 to the length of array.
        const randomQuote = data.quotes[randomNum];
        // Accessing a random quote corresponding with that random number
        const newText = randomQuote.quote + "\n" + randomQuote.author;
        setText(newText);
        setGeneratedText(newText);
        props.showAlert("Random Quote Fetched!", "success");
      });
  };
  // getQuotes() function - ENDS
  /* GENERATE DROPDOWN ENDS */

  /* BOTTOM BUTTONS START */
  // clear() function - STARTS
  const clear = () => {
    setText("");
    setGeneratedText("");
    setAlignment("left");
    props.showAlert("Cleared!.", "success");
  };
  // clear() function - ENDS
  /*   // copyToClipboard() function - STARTS
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("COPIED!", "success");
  };
  // copyToClipboard() function - ENDS
  // pasteToTextarea() function - STARTS
  const pasteToTextarea = () => {
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
  };
  // pasteToTextarea() function - ENDS */
  /* BOTTOM BUTTONS END */

  // onTextChange() function - STARTS
  const onTextChange = (e) => {
    setText(e.target.value);
    setGeneratedText(e.target.value);
    if (text === "") {
      setAlignment("left");
    }
  };
  // onTextChange() function - ENDS
  return (
    <>
      <h1
        className={`mt-3 text-center text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        <span className="text-uppercase font-monospace">
          textbot<span className="text-info">online</span>
        </span>
      </h1>
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
              Menu
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
              <Dropdown.Item
                onClick={sentenceCase}
                disabled={text.length === 0}
                title="Change the case of your text"
                className="menu-item"
              >
                Sentence case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={toggleCase}
                disabled={text.length === 0}
                title="cHANGE tHE cASE oF yOUR tEXT"
                className="menu-item"
              >
                Toggle case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={randomCase}
                disabled={text.length === 0}
                title="CHangE thE CasE OF yoUR teXT"
                className="menu-item"
              >
                raNDoM cASE
              </Dropdown.Item>
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
              <Dropdown.Item
                onClick={getRandomWords}
                title="Generate random words"
                className="menu-item"
              >
                Random Words
              </Dropdown.Item>
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
                onClick={getQuotes}
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
        <div className="d-flex">
          {/* Input Textarea - STARTS */}
          <textarea
            className="form-control mt-1 mb-3"
            id="floatingTextarea output"
            style={{
              width: "100%",
              backgroundColor: `${props.mode === "dark" ? "#242526" : "white"}`,
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
          {/* Output Textarea - STARTS */}
          <textarea
            className="form-control mt-1 mb-3"
            id="floatingTextarea output"
            style={{
              width: "100%",
              backgroundColor: `${props.mode === "dark" ? "#242526" : "white"}`,
              color: `${props.mode === "dark" ? "white" : "black"}`,
              textAlign: text ? alignment : "left",
            }}
            value={text.length === 0 ? "Nothing to preview!" : text}
            readOnly
            rows={12}
          ></textarea>
          {/* Output Textarea - ENDS */}
        </div>

        {/* Bottom Buttons Section - START */}
        <div className="d-flex justify-content-between">
          {/* Clear Text Button - STARTS */}
          <button
            className="btn btn-danger mx-1 btn-sm bottom-btns rounded"
            onClick={clear}
            disabled={text.length === 0}
          >
            Clear <i className="bi bi-x-lg bottom-btns-icons"></i>
          </button>
          <button
            className={`btn btn-${
              text.length === 0 ? "secondary" : "primary"
            } mx-1 btn-sm bottom-btns rounded`}
            onClick={downloadTxtFile}
            title="Save the .txt file"
            disabled={text.length === 0}
          >
            Save <i className="bi bi-download bottom-btns-icons" />
          </button>
          {/* Clear Text Button - ENDS */}
          {/* <button
              className="btn btn-secondary mx-1 btn-sm bottom-btns rounded"
              onClick={pasteToTextarea}
              title="Paste the text to text area"
              style={{ display: text.length === 0 ? "block" : "none" }}
            >
              Paste <i className="bi bi-clipboard bottom-btns-icons"></i>
            </button>
          </div>
          <div>
            <button
              className="btn btn-warning mx-1 btn-sm bottom-btns rounded"
              onClick={copyToClipboard}
              title="Copy the text to clipboard"
              disabled={text.length === 0}
            >
              Copy{" "}
              <i className="bi bi-clipboard-check-fill bottom-btns-icons"></i>
            </button> */}
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
            backgroundColor: `${props.mode === "dark" ? "#212529" : "white"}`,
            color: `${props.mode === "dark" ? "white" : "black"}`,
          }}
        >
          <div
            className="offcanvas-header d-flex justify-content-center"
            style={{
              backgroundColor: `${props.mode === "dark" ? "#212529" : "white"}`,
              color: `${props.mode === "dark" ? "white" : "black"}`,
            }}
          >
            <table
              className={`table table-hover table-sm table-responsive statistics-text table-${props.mode}`}
            >
              <thead>
                <tr>
                  <th scope="col" colSpan="3" className="text-center">
                    YOUR TEXT SUMMARY
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
      {/* ABOUT SECTION STARTS */}
      <div className="py-5">
        <About mode={props.mode} showAlert={props.showAlert} />
      </div>
      {/* ABOUT SECTION ENDS */}
    </>
  );
};

export default TextForm;
