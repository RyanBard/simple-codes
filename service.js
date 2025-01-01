// TODO - fix issues around multiple spaces being in the message?

const convertToDecode = dictionary => Object.keys(dictionary)
    .map(key => [dictionary[key], key])
    .reduce((acc, val) => {
        acc[val[0]] = val[1]
        return acc
    }, {})

const encodeRadioAlphabetDictionary = {
    a: 'alpha',
    b: 'bravo',
    c: 'charlie',
    d: 'delta',
    e: 'echo',
    f: 'foxtrot',
    g: 'golf',
    h: 'hotel',
    i: 'india',
    j: 'juliet',
    k: 'kilo',
    l: 'lima',
    m: 'mike',
    n: 'november',
    o: 'oscar',
    p: 'papa',
    q: 'quebec',
    r: 'romeo',
    s: 'sierra',
    t: 'tango',
    u: 'uniform',
    v: 'victor',
    w: 'whiskey',
    x: 'x-ray',
    y: 'yankee',
    z: 'zulu',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    0: 'zero',
    ',': 'comma',
    '.': 'fullstop'
}

const decodeRadioAlphabetDictionary = convertToDecode(encodeRadioAlphabetDictionary)

const encodeMorseCodeDictionary = {
    a: '.-',
    b: '-...',
    c: '-.-.',
    d: '-..',
    e: '.',
    f: '..-.',
    g: '--.',
    h: '....',
    i: '..',
    j: '.---',
    k: '-.-',
    l: '.-..',
    m: '--',
    n: '-.',
    o: '---',
    p: '.--.',
    q: '--.-',
    r: '.-.',
    s: '...',
    t: '-',
    u: '..-',
    v: '...-',
    w: '.--',
    x: '-..-',
    y: '-.--',
    z: '--..',
    1: '.----',
    2: '..---',
    3: '...--',
    4: '....-',
    5: '.....',
    6: '-....',
    7: '--...',
    8: '---..',
    9: '----.',
    0: '-----'
}

const decodeMorseCodeDictionary = convertToDecode(encodeMorseCodeDictionary)

const commonEncode = (dictionary, joinWith) => message => [...message]
    .map(c => c.toLowerCase())
    .map(c => dictionary[c] || c)
    .join(joinWith)

const commonDecode = (dictionary, joinedBy) => message => message.split(joinedBy + joinedBy + joinedBy)
    .map(w => w.split(joinedBy)
        .map(w => w.toLowerCase())
        .map(w => dictionary[w] || w)
        .join('')
    ).join(' ')

const encodeRadioAlphabet = commonEncode(encodeRadioAlphabetDictionary, ' ')
const decodeRadioAlphabet = commonDecode(decodeRadioAlphabetDictionary, ' ')

const encodeMorseCode = commonEncode(encodeMorseCodeDictionary, ' ')
const decodeMorseCode = commonDecode(decodeMorseCodeDictionary, ' ')

module.exports = {
    encodeRadioAlphabet,
    decodeRadioAlphabet,
    encodeMorseCode,
    decodeMorseCode
}
