class Block {
    constructor(data) {
        this.data = data
        // milliseconds to seconds int
        this.timestamp = Math.ceil(Date.now() / 1000)
    }

    toString = () => {
        return `Data: ${this.data}, Timestamp: ${this.timestamp}`
    }
}

// run this only if this file is execute directly from node cli
if (require.main === module) {
    var b = new Block('test1')
    console.log(b.toString())
}
