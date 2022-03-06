const Block = require('./block')
const fs = require('fs')
const table = require('table')

module.exports = class Blockchain {
    constructor(fileName) {
        this.chain = []
        if (fs.existsSync(fileName)) {
            this.loadBlockChain(fileName)
        } else {
            this.addGenesisBlock()
        }
    }

    loadBlockChain = (fileName) => {
        var blockChainData = JSON.parse(fs.readFileSync(fileName))
        blockChainData.forEach(blkData => {
            var blk = new Block(blkData.height, blkData.prev_hash,
                blkData.data, blkData.difficulty)
            // set the properties that are not set in the constructor
            blk.nonce = blkData.nonce
            blk.hash = blkData.hash
            blk.timestamp = blkData.timestamp
            blk.miningDuration = blkData.mining_duration
            this.addBlock(blk)
        });
    }

    addGenesisBlock = () => {
        var genesisBlock = new Block(0, "0", "", 1)
        genesisBlock.mine()
        this.addBlock(genesisBlock)
    }

    topBlock = () => {
        return this.chain[this.chain.length - 1]
    }

    addBlock = (block) => {
        this.chain.push(block)
    }

    print = () => {
        var headers = ['Height', 'Prev Hash', 'Hash', 'Data Size',
            'Nonce', 'Difficulty', 'Mining Duration']
        var data = [headers]
        this.chain.forEach(block => {
            data.push([
                block.height,
                block.prevHash.slice(-6),
                block.hash.slice(-6),
                block.data.length,
                block.nonce,
                block.difficulty,
                block.miningDuration
            ])
        })
        console.log(table.table(data))
    }

    isValid = () => {
        var prevBlock = this.chain[0]
        var valid = true
        var badBlocks = []
        this.chain.slice(1).forEach(curBlock => {
            if (curBlock.prevHash === prevBlock.hash && curBlock.hash === curBlock.generateHash()) {
            } else {
                // hashes not matching
                valid = false
                badBlocks.push(curBlock.height)
                prevBlock = curBlock
            }
        })
        return [valid, bad_blocks]
    }

    saveJson = (fileName) => {
        var data = JSON.stringify(this.chain, null, 4)
        fs.writeFileSync(fileName, data)
    }
}
