const invisibleChars: { [key: string]: string } = {
  '\u0009': '',
  '\u0020': '',
  '\u00A0': '',
  '\u00AD': '',
  '\u034F': '',
  '\u061C': '',
  '\u115F': '',
  '\u1160': '',
  '\u17B4': '',
  '\u17B5': '',
  '\u180E': '',
  '\u2000': '',
  '\u2001': '',
  '\u2002': '',
  '\u2003': '',
  '\u2004': '',
  '\u2005': '',
  '\u2008': '',
  '\u2009': '',
  '\u200A': '',
  '\u200B': '',
  '\u200C': '',
  '\u200D': '',
  '\u200E': '',
  '\u200F': '',
  '\u202F': '',
  '\u205F': '',
  '\u2060': '',
  '\u2061': '',
  '\u2062': '',
  '\u2063': '',
  '\u2064': '',
  '\u206A': '',
  '\u206B': '',
  '\u206C': '',
  '\u206D': '',
  '\u206E': '',
  '\u206F': '',
  '\u3000': '',
  '\u2800': '',
  '\u3164': '',
  '\uFEFF': '',
  '\uFFA0': '',
  '\u1D159': '',
  '\u1D173': '',
  '\u1D174': '',
  '\u1D175': '',
  '\u1D176': '',
  '\u1D177': '',
  '\u1D178': '',
  '\u1D179': '',
  '\u1D17A': ''
}
export default function removeHiddenCharacters (text: string) {
  let result = ''
  for (const ch of text) {
    result += invisibleChars[ch] === undefined
      ? ch
      : ''
  }
  return result
}