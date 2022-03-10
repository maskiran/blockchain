const Block = require('./block')


class Blockchain {
    constructor() {
        this.blocks = []
    }

    addBlock = (block) => {
        this.blocks.push(block)
    }

    print = () => {
        this.blocks.forEach(blk => {
            console.log(blk.toString())
        })
    }
}

if (require.main === module) {
    var chain = new Blockchain()
    // add a dummy block as the header, this is called genesis block
    var gblk = new Block("genesis", "0")
    gblk.generateHash()
    chain.addBlock(gblk)
    // add 5 blocks
    var prevBlk = gblk
    var dataList = ["test1", "test2", "test3", "test4", "test5"]
    dataList.forEach(data => {
        var blk = new Block(data, prevBlk.hash)
        blk.generateHash()
        chain.addBlock(blk)
        prevBlk = blk
    })
    chain.print()
}
