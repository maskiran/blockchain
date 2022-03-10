const crypto = require('crypto')

class Block {
    constructor(data, prevHash) {
        this.data = data
        // milliseconds to seconds int
        this.timestamp = Math.ceil(Date.now() / 1000)
        this.hash = ""
        this.prevHash = prevHash || "0"
    }

    generateHash = () => {
        var text = this.timestamp.toString() + this.data + this.prevHash
        var hasher = crypto.createHash("sha256")
        hasher.update(text)
        this.hash = hasher.digest("hex")
    }

    toString = () => {
        return `Data: ${this.data}, Timestamp: ${this.timestamp}, ` + 
            `PrevHash: ${this.prevHash.slice(-5)}, Hash: ${this.hash.slice(-5)}`
    }
}

module.exports = Block
