const crypto = require('crypto')

class Block {
    constructor(data) {
        this.data = data
        // milliseconds to seconds int
        this.timestamp = Math.ceil(Date.now() / 1000)
        this.hash = ""
    }

    generateHash = () => {
        var text = this.timestamp.toString() + this.data
        var hasher = crypto.createHash("sha256")
        hasher.update(text)
        this.hash = hasher.digest("hex")
    }

    toString = () => {
        return `Data: ${this.data}, Timestamp: ${this.timestamp}, Hash: ${this.hash.slice(-5)}`
    }
}

// run this only if this file is execute directly from node cli
if (require.main === module) {
    var b = new Block('test1')
    b.generateHash()
    console.log(b.toString())
}
