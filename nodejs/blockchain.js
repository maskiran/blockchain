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

    isValid = () => {
        var prevBlk = this.blocks[0]
        var valid = true
        this.blocks.slice(1).forEach(blk => {
            // check if the hash is good
            if (blk.generateHash() != blk.hash) {
                valid = false
            }
            // check curblock's prev_hash == prev_blk.hash
            if (blk.prevHash != prevBlk.hash) {
                valid = false
            }
            prevBlk = blk
        })
        if (valid) {
            console.log("Chain is Valid")
        } else {
            console.log("Chain is INVALID")
        }
    }
}

if (require.main === module) {
    var chain = new Blockchain()
    // add a dummy block as the header, this is called genesis block
    var gblk = new Block("genesis", "0")
    gblk.mine()
    chain.addBlock(gblk)
    // add 5 blocks
    var prevBlk = gblk
    var dataList = ["test1", "test2", "test3", "test4", "test5"]
    var difficulty = 5
    dataList.forEach(data => {
        var blk = new Block(data, prevBlk.hash, difficulty)
        blk.mine()
        chain.addBlock(blk)
        prevBlk = blk
    })
    chain.print()
    chain.isValid()
    console.log("Changing data in block idx 2")
    //change data and check validity
    chain.blocks[2].data = "testxxxxxxx"
    chain.isValid()
    // re-mine the block and check validity
    console.log("Re-mining block idx 2 and check validity")
    chain.blocks[2].mine()
    chain.isValid()
    // remine all the blocks and check validity
    console.log("Re-mining all blocks after idx 2 and check validity")
    var prevBlk = chain.blocks[2]
    chain.blocks.slice(3).forEach(blk => {
        blk.prevHash = prevBlk.hash
        blk.mine()
        prevBlk = blk
    })
    chain.isValid()
}
