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

// run this only if this file is execute directly from node cli
if (require.main === module) {
    var b1 = new Block('test1')
    b1.generateHash()
    var b2 = new Block('test2', b1.hash)
    b2.generateHash()
    console.log(b1.toString())
    console.log(b2.toString())
}
