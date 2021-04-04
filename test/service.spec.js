const {expect} = require('chai')

const service = require('../service')

describe('simple-codes service', () => {

    describe('radioAlphabet', () => {

        const text = 'abc def ghi jkl mno pqr stu vwx yz 1234567890 ,.'
        const encodedText = 'alpha bravo charlie   delta echo foxtrot   golf hotel india   ' +
            'juliet kilo lima   mike november oscar   papa quebec romeo   sierra tango uniform   ' +
            'victor whiskey x-ray   yankee zulu   one two three four five six seven eight nine ' +
            'zero   comma fullstop'

        describe('encode', () => {

            it('should encode lowercase letters', async () => {
                const result = service.encodeRadioAlphabet(text)
                expect(result).to.eql(encodedText)
            })

            it('should encode uppercase letters', async () => {
                const result = service.encodeRadioAlphabet(text.toUpperCase())
                expect(result).to.eql(encodedText)
            })

        })

        describe('decode', () => {

            it('should decode lowercase letters', async () => {
                const result = service.decodeRadioAlphabet(encodedText)
                expect(result).to.eql(text)
            })

            it('should decode uppercase letters', async () => {
                const result = service.decodeRadioAlphabet(encodedText.toUpperCase())
                expect(result).to.eql(text)
            })

        })

    })

    describe('morseCode', () => {

        const text = 'abc def ghi jkl mno pqr stu vwx yz 1234567890'
        const encodedText = '.- -... -.-.   -.. . ..-.   --. .... ..   .--- -.- .-..   ' +
            '-- -. ---   .--. --.- .-.   ... - ..-   ...- .-- -..-   -.-- --..   .---- ' +
            '..--- ...-- ....- ..... -.... --... ---.. ----. -----'

        describe('encode', () => {

            it('should encode lowercase letters', async () => {
                const result = service.encodeMorseCode(text)
                expect(result).to.eql(encodedText)
            })

            it('should encode uppercase letters', async () => {
                const result = service.encodeMorseCode(text.toUpperCase())
                expect(result).to.eql(encodedText)
            })

        })

        describe('decode', () => {

            it('should decode lowercase letters', async () => {
                const result = service.decodeMorseCode(encodedText)
                expect(result).to.eql(text)
            })

            it('should decode uppercase letters', async () => {
                const result = service.decodeMorseCode(encodedText.toUpperCase())
                expect(result).to.eql(text)
            })

        })

    })

})
