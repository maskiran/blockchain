const crypto = require('crypto')

class Block {
    constructor(height, prevHash, data, difficulty) {
        this.height = height
        this.prevHash = prevHash
        this.data = data
        this.difficulty = difficulty
        this.hash = ""
        this.nonce = 0
        this.timestamp = Date.now()
        this.miningDuration = 0
    }

    mine = () => {
        var start = new Date()
        console.log(`Mining block at height ${this.height} at ${start.toLocaleString()}`)
        while (true) {
            var hash = this.generateHash()
            // check if the number of 0s in the hash matches the difficulty
            if (hash.slice(0, this.difficulty) === "0".repeat(this.difficulty)) {
                this.hash = hash
                var end = new Date()
                break
            } else {
                this.nonce++
                if (this.nonce >= 2 ** 32) {
                    // change the timestamp and restart the nonce
                    this.timestamp = Date.now()
                    this.nonce = 0
                }
            }
        }
        this.miningDuration = (end - start) / 1000
        console.log(`Duration ${this.miningDuration}`)
    }

    generateHash = () => {
        var text = this.prevHash + this.data + this.timestamp.toString() + this.nonce.toString()
        var hash = crypto.createHash('sha256')
        hash.update(text)
        return hash.digest('hex')
    }

    toJSON = () => {
        return {
            "height": this.height,
            "prev_hash": this.prevHash,
            "data": this.data,
            "difficulty": this.difficulty,
            "hash": this.hash,
            "nonce": this.nonce,
            "timestamp": this.timestamp,
            "mining_duration": this.miningDuration
        }
    }
}

module.exports = Block