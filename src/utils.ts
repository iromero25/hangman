export const createAlphabetArray = () => {
  const firstLetter = "a".charCodeAt(0);
  const lastLetter = "z".charCodeAt(0);

  const charArray: string[] = [];
  for (let letter = firstLetter; letter <= lastLetter; letter++) {
    console.log("creating the alphabet");
    charArray.push(String.fromCharCode(letter));
  }
  return charArray;
};
