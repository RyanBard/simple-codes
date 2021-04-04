const port = process.env.PORT || 3000

const {log, urlPrefix} = require('./util')

const {encodeRadioAlphabet, decodeRadioAlphabet, encodeMorseCode, decodeMorseCode} = require('./service')

const express = require('express')
const app = express()

app.get('/health', (req, res) => res.json({status: 'UP'}))

app.get('/', (req, res) => res
    .header('Content-Type', 'application/hal+json')
    .json({_links: {
        health: {href: urlPrefix(req, '/health')},
        encodeRadioAlphabet: {href: urlPrefix(req, '/encode-radio-alphabet') + '?message={message}', templated: true},
        decodeRadioAlphabet: {href: urlPrefix(req, '/decode-radio-alphabet') + '?message={message}', templated: true},
        encodeMorseCode: {href: urlPrefix(req, '/encode-morse-code') + '?message={message}', templated: true},
        decodeMorseCode: {href: urlPrefix(req, '/decode-morse-code') + '?message={message}', templated: true}
    }}))

app.get('/encode-radio-alphabet', (req, res) => res
    .header('Content-Type', 'text/plain')
    .send(encodeRadioAlphabet(req.query.message)))

app.get('/decode-radio-alphabet', (req, res) => res
    .header('Content-Type', 'text/plain')
    .send(decodeRadioAlphabet(req.query.message)))

app.get('/encode-morse-code', (req, res) => res
    .header('Content-Type', 'text/plain')
    .send(encodeMorseCode(req.query.message)))

app.get('/decode-morse-code', (req, res) => res
    .header('Content-Type', 'text/plain')
    .send(decodeMorseCode(req.query.message)))

// TODO - braile, banner text

const server = app.listen(port, () => log('Listening on port', port))

module.exports = server
