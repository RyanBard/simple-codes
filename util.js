const normalizeUrl = require('normalize-url')

const log = (format, ...args) => {
    console.log(format, ...args)
}

const urlPrefix = (req, path) => {
    const proto = req.header('x-forwarded-proto') || 'http'
    const host = req.header('x-forwarded-host')
    const port = req.header('x-forwarded-port')
    const prefixPath = req.header('x-forwarded-prefix') || ''

    let fullPath

    if (host && port) {
        fullPath = `${proto}://${host}:${port}/${prefixPath}/${path}`
    } else if (host && !port) {
        fullPath = `${proto}://${host}/${prefixPath}${path}`
    } else {
        fullPath = `${proto}://${req.headers.host}/${prefixPath}/${path}`
    }

    return normalizeUrl(fullPath)
}

module.exports = {
    log,
    urlPrefix
}
