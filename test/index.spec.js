const {expect} = require('chai')

const baseUrl = 'http://localhost:3000'

describe('simple-codes controller', () => {

    let server

    before(async () => {
        if (!server) {
            try {
                delete require.cache[require.resolve('../index')]
                server = require('../index')
            } catch (e) {
                console.log('Something went wrong!', e)
                expect.fail('Something went wrong!')
            }
        }
    })

    after(done => {
        if (server) {
            server.close(done)
        } else {
            done()
        }
    })

    describe('root discovery', () => {

        it('should return hal format', async () => {
            const resp = await fetch(`${baseUrl}/`)
            expect(resp.status).to.eql(200)
            expect(resp.headers.get('content-type')).to.eql('application/hal+json; charset=utf-8')
            const body = await resp.json()
            expect(body).to.eql({
                _links: {
                    health: {href: `${baseUrl}/health`},
                    encodeRadioAlphabet: {href: `${baseUrl}/encode-radio-alphabet?message={message}`, templated: true},
                    decodeRadioAlphabet: {href: `${baseUrl}/decode-radio-alphabet?message={message}`, templated: true},
                    encodeMorseCode: {href: `${baseUrl}/encode-morse-code?message={message}`, templated: true},
                    decodeMorseCode: {href: `${baseUrl}/decode-morse-code?message={message}`, templated: true}
                }
            })
        })

    })

    describe('health', () => {

        it('should return status of UP', async () => {
            const resp = await fetch(`${baseUrl}/health`)
            expect(resp.status).to.eql(200)
            expect(resp.headers.get('content-type')).to.eql('application/json; charset=utf-8')
            const body = await resp.json()
            expect(body).to.eql({status: 'UP'})
        })

    })

    describe('radio-alphabet', () => {

        const text = 'abc def ghi jkl mno pqr stu vwx yz 1234567890 ,.'
        const encodedText = 'alpha bravo charlie   delta echo foxtrot   golf hotel india   ' +
            'juliet kilo lima   mike november oscar   papa quebec romeo   sierra tango uniform   ' +
            'victor whiskey x-ray   yankee zulu   one two three four five six seven eight nine ' +
            'zero   comma fullstop'

        describe('encode', () => {

            it('should encode lowercase letters', async () => {
                const resp = await fetch(`${baseUrl}/encode-radio-alphabet?message=${encodeURIComponent(text)}`)
                expect(resp.status).to.eql(200)
                expect(resp.headers.get('content-type')).to.eql('text/plain; charset=utf-8')
                const body = await resp.text()
                expect(body).to.eql(encodedText)
            })

            it('should encode uppercase letters', async () => {
                const resp = await fetch(`${baseUrl}/encode-radio-alphabet?message=${encodeURIComponent(text.toUpperCase())}`)
                expect(resp.status).to.eql(200)
                expect(resp.headers.get('content-type')).to.eql('text/plain; charset=utf-8')
                const body = await resp.text()
                expect(body).to.eql(encodedText)
            })

        })

        describe('decode', () => {

            it('should decode lowercase letters', async () => {
                const resp = await fetch(`${baseUrl}/decode-radio-alphabet?message=${encodeURIComponent(encodedText)}`)
                expect(resp.status).to.eql(200)
                expect(resp.headers.get('content-type')).to.eql('text/plain; charset=utf-8')
                const body = await resp.text()
                expect(body).to.eql(text)
            })

            it('should decode uppercase letters', async () => {
                const resp = await fetch(`${baseUrl}/decode-radio-alphabet?message=${encodeURIComponent(encodedText.toUpperCase())}`)
                expect(resp.status).to.eql(200)
                expect(resp.headers.get('content-type')).to.eql('text/plain; charset=utf-8')
                const body = await resp.text()
                expect(body).to.eql(text)
            })

        })

    })

    describe('morse-code', () => {

        const text = 'abc def ghi jkl mno pqr stu vwx yz 1234567890'
        const encodedText = '.- -... -.-.   -.. . ..-.   --. .... ..   .--- -.- .-..   ' +
            '-- -. ---   .--. --.- .-.   ... - ..-   ...- .-- -..-   -.-- --..   .---- ' +
            '..--- ...-- ....- ..... -.... --... ---.. ----. -----'

        describe('encode', () => {

            it('should encode lowercase letters', async () => {
                const resp = await fetch(`${baseUrl}/encode-morse-code?message=${encodeURIComponent(text)}`)
                expect(resp.status).to.eql(200)
                expect(resp.headers.get('content-type')).to.eql('text/plain; charset=utf-8')
                const body = await resp.text()
                expect(body).to.eql(encodedText)
            })

            it('should encode uppercase letters', async () => {
                const resp = await fetch(`${baseUrl}/encode-morse-code?message=${encodeURIComponent(text.toUpperCase())}`)
                expect(resp.status).to.eql(200)
                expect(resp.headers.get('content-type')).to.eql('text/plain; charset=utf-8')
                const body = await resp.text()
                expect(body).to.eql(encodedText)
            })

        })

        describe('decode', () => {

            it('should decode lowercase letters', async () => {
                const resp = await fetch(`${baseUrl}/decode-morse-code?message=${encodeURIComponent(encodedText)}`)
                expect(resp.status).to.eql(200)
                expect(resp.headers.get('content-type')).to.eql('text/plain; charset=utf-8')
                const body = await resp.text()
                expect(body).to.eql(text)
            })

            it('should decode uppercase letters', async () => {
                const resp = await fetch(`${baseUrl}/decode-morse-code?message=${encodeURIComponent(encodedText.toUpperCase())}`)
                expect(resp.status).to.eql(200)
                expect(resp.headers.get('content-type')).to.eql('text/plain; charset=utf-8')
                const body = await resp.text()
                expect(body).to.eql(text)
            })

        })

    })

})
