
const argparse = require('argparse')
const fs = require('fs')
const Blockchain = require('./blockchain')
const Block = require('./block')

parse_args = () => {
    parser = new argparse.ArgumentParser()
    parser.add_argument('-a', '--data',
        { help: 'Create a block with this data. You can provide a data file using @filename as the value' })
    parser.add_argument('-d', '--difficulty', {
        default: 5, type: 'int',
        help: 'Difficult of the block'
    })
    parser.add_argument('-f', '--file', {
        default: "chain.data",
        help: 'File where the blockchain is saved and loaded'
    })
    parser.add_argument('-i', '--valid', {
        action: 'store_true',
        help: 'Check if chain is valid'
    })
    parser.add_argument('-p', '--print', {
        action: 'store_true',
        help: 'Print Blockchain'
    })
    return parser.parse_args()
}

mineBlock = (lastBlock, data, difficulty) => {
    if (data[0] === '@') {
        var fname = data.slice(1)
        data = fs.readFileSync(fname)
    }
    block = new Block(lastBlock.height + 1,
        lastBlock.hash, data, difficulty)
    block.mine()
    return block
}

main = () => {
    args = parse_args()
    chain = new Blockchain(args.file)
    if (args.data) {
        lastBlock = chain.topBlock()
        block = mineBlock(lastBlock, args.data, args.difficulty)
        chain.addBlock(block)
        chain.saveJson(args.file)
    }
    if (args.print) {
        chain.print()
    }
    if (args.valid) {
        [v, bad_blks] = chain.isValid()
        if (v) {
            console.log("Chain is valid")
        } else {
            console.log("Chain is NOT valid")
            console.log("Bad blocks at height", bad_blks)
        }
    }
}

main()
