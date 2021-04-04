# simple-codes

## install dependencies

```
npm i
```

## run tests

```
npm test
```

## run locally

```
npm start
```

## test locally

```
curl -v 'http://localhost:3000/encode-radio-alphabet?message=foobar+baz'
```

```
curl -v 'http://localhost:3000/decode-radio-alphabet?message=foxtrot+oscar+oscar+bravo+alpha+romeo+++bravo+alpha+zulu'
```

```
curl -v 'http://localhost:3000/encode-morse-code?message=foobar+baz'
```

```
curl -v 'http://localhost:3000/decode-morse-code?message=..-.+---+---+-...+.-+.-.+++-...+.-+--..'
```

## health check

```
curl -v 'http://localhost:3000/health'
```

## Discovery in HAL format

```
curl -v 'http://localhost:3000/'
```
