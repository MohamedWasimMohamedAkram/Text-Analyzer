import React, { useState } from "react";
function Input() {
  let textList = [];
  const [inpText, setValue] = useState("");
  const [fullText, setFullText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [longestWordState, setLongestWord] = useState("");
  const [avgWordLength, setAvgLength] = useState(0);
  const [readingTimeSecs, setReadingTime] = useState(0);
  const [medianWordLength, setMedianLength] = useState(0);
  const [medianSortLength, setMedianSortLength] = useState(0);
  const [fiveCommonWords, setCommonWords] = useState("");
  const [textLanguage, setTextLanguage] = useState("");

  textList = inpText.split(/\s*[\s,]\s*/);
  let avgLength = (inpText.length / textList.length).toFixed(2);
  let chars = inpText.length;
  let wordLength = textList.length;
  let readingTime = Math.round((textList.length / 200) * 60);
  let medianLength = textList[Math.floor(textList.length / 2)].length;
  let commonWordsArr = commonWords();
  let str = " ";
  function handleChange(event) {
    setValue(event.target.value);
  }
  function handleClick() {
    setFullText(inpText);
    setWordCount(wordLength);
    setLetterCount(chars);
    setLongestWord(longestWord());
    setAvgLength(avgLength);
    setReadingTime(readingTime);
    setMedianLength(medianLength);
    setMedianSortLength(sortedMedianLength());
    setCommonWords(separate());
    setTextLanguage(language());
    console.log("Number of characters", chars);
    console.log("Number of words", wordLength);
    console.log("Longest Word", longestWord());
    console.log("Average Word Length", avgLength);
    console.log("Average Reading Time", readingTime, " seconds");
    console.log("Median Word Length", medianLength);
    console.log("Median word when sorted, ", sortedMedianLength());
    console.log(separate());
    console.log(language());
  }

  function separate() {
    var str = commonWordsArr.join(", ");
    return str;
  }
  function longestWord() {
    let max = 0;
    let wordMax = "";
    for (var i = 0; i < textList.length; i++) {
      if (textList[i].length > max) {
        max = textList[i].length;
        wordMax = textList[i];
      }
    }
    return wordMax;
  }

  function sortedMedianLength() {
    const asc = textList.sort((a, b) => a.length - b.length);
    return asc[Math.floor(asc.length / 2)];
  }

  function commonWords() {
    let regex = ".*[a-zA-Z].*";
    if (inpText.match(regex)) {
      let wordMap = new Map();
      inpText.split(" ").forEach((word) => {
        if (word) {
          word = word.toLowerCase();
          if (wordMap.has(word)) {
            let count = wordMap.get(word);
            count++;
            wordMap.set(word, count);
          } else {
            wordMap.set(word, 1);
          }
        }
      });
      const sortedWordMap = new Map(
        [...wordMap.entries()].sort((a, b) => b[1] - a[1])
      );

      let result = Array.from(sortedWordMap.keys()).filter(
        (word, index) => index < 5
      );
      result = result.map((res) => {
        res = res.replace(/[/.,]/g, "");
        if (res !== "") {
          return res;
        }
      });
      return result.filter((res) => res !== undefined);
    } else {
      return [];
    }
  }

  function language() {
    for (let i = 0; i < textList.length; i++) {
      if (
        textList[i].localeCompare("is") === 0 ||
        textList[i].localeCompare("and") === 0 ||
        textList[i].localeCompare("a") === 0 ||
        textList[i].localeCompare("you") === 0 ||
        textList[i].localeCompare("are") === 0 ||
        textList[i].localeCompare("I") === 0 ||
        textList[i].localeCompare("i") === 0 ||
        textList[i].localeCompare("to") === 0
      ) {
        return "English";
      }
      if (
        textList[i].localeCompare("ve") === 0 ||
        textList[i].localeCompare("bir") === 0 ||
        textList[i].localeCompare("bu") === 0 ||
        textList[i].localeCompare("ve") === 0 ||
        textList[i].localeCompare("bu") === 0 ||
        textList[i].localeCompare("de") === 0 ||
        textList[i].localeCompare("da") === 0 ||
        textList[i].localeCompare("ben") === 0
      ) {
        return "Turkish";
      }
    }
    return "";
  }

  return (
    <div className="cr">
      <div className="row">
        <div className="col-sm">
          <textarea
            onChange={handleChange}
            className="textValue"
            name="text"
            rows="9"
            cols="70"
            id="input_text"
            placeholder="Enter Text"
            value={inpText}
          ></textarea>
        </div>
      </div>
      <button onClick={handleClick} className="button">
        Analyze
      </button>
      <br />
      <h3 className="details">
        Word Count: <strong>{wordCount}</strong>
      </h3>
      <h3 className="details">
        Letter Count: <strong>{letterCount}</strong>
      </h3>
      <h3 className="details">
        Longest Word: <strong>{longestWordState}</strong>
      </h3>
      <h3 className="details">
        Average Word Length: <strong>{avgWordLength}</strong>
      </h3>
      <h3 className="details">
        Reading time in seconds: <strong>{readingTimeSecs}</strong>
      </h3>
      <h3 className="details">
        Median Word Length: <strong>{medianLength}</strong>
      </h3>
      <h3 className="details">
        Median word when sorted by length: <strong>{medianSortLength}</strong>
      </h3>
      <h3 className="details">
        Top 5 most common words: <strong>{fiveCommonWords}</strong>
      </h3>
      <h3 className="details">
        Text Language: <strong>{textLanguage}</strong>
      </h3>
    </div>
  );
}
export default Input;
