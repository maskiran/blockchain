const crypto = require('crypto')

class Block {
    constructor(data, prevHash, difficulty) {
        this.data = data
        // milliseconds to seconds int
        this.timestamp = Math.ceil(Date.now() / 1000)
        this.hash = ""
        this.prevHash = prevHash || "0"
        this.difficulty = difficulty || 1
        this.nonce = 0
    }

    generateHash = () => {
        var text = this.timestamp.toString() + this.data + this.prevHash + this.nonce.toString()
        var hasher = crypto.createHash("sha256")
        hasher.update(text)
        return hasher.digest("hex")
    }

    generateHashWithDifficulty = () => {
        while (true) {
            var hash = this.generateHash()
            // does it have "difficulty" number of 0s in the beginning?
            var hashPrefix = hash.slice(0, this.difficulty)
            var expectedPrefix = "0".repeat(this.difficulty)
            if (hashPrefix === expectedPrefix) {
                this.hash = hash
                break
            } else {
                this.nonce++
            }
        }
    }

    toString = () => {
        return `Data: ${this.data}, Timestamp: ${this.timestamp}, ` + 
            `PrevHash: ${this.prevHash.slice(-5)}, Hash: ${this.hash.slice(-5)} ` +
            `Nonce: ${this.nonce}`
    }
}

module.exports = Block
