export default function makeNumbSentences(string = '', predefinedNumbers = []) {
  return predefinedNumbers.reduce((acc, cur) => {
    if (string.indexOf(cur) !== 0) {
      return acc;
    }

    if (string.substring(cur.length).length > 0) {
      const next = makeNumbSentences(string.substring(cur.length), predefinedNumbers)
        .map(item => `:${cur}${item}`);
      return [...acc, ...next];
    }

    return [...acc, `:${cur}:`]
  }, []);
}
