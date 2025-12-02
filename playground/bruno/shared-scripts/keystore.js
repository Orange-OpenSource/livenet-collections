const fs = require('fs')
const jose = require('node-jose')
const path = require('path')

const retrieveKey = async () => {
    const KEYSTORE_PATH = '.keystore.json'
    const cwd = bru.cwd()
    const fullPath = path.join(cwd, KEYSTORE_PATH)
    if (fs.existsSync(fullPath)) {
        console.log('Keystore Already exists')
        const data = await fs.readFileSync(fullPath, 'utf8')
        const json = JSON.parse(data)

        const keystore = await jose.JWK.asKeyStore(json)

        const keys = keystore.all ? keystore.all() : []
        if (keys.length > 0) {
            console.log('Key Found')
            return keys[0]
        }

        console.log('No key found in the keystore. Generating one !')
        const key = await keystore.generate('RSA', 2048, { use: 'sig', alg: 'RS256' })
        fs.writeFileSync(fullPath, JSON.stringify(keystore.toJSON(true), null, 2))
        return key
    } else {
        console.log('Keystore does not exist. Creating keystore and key!')
        const keystore = await jose.JWK.createKeyStore()
        const key = await keystore.generate('RSA', 2048, { use: 'sig', alg: 'RS256' })

        fs.writeFileSync(fullPath, JSON.stringify(keystore.toJSON(true), null, 2))
        return key
    }
}

module.exports = {
    retrieveKey
}