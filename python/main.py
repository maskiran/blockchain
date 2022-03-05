
import argparse
from blockchain import Blockchain
from block import Block


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('-a', '--data',
                        help='Create a block with this data. You can provide a data file using @filename as the value')
    parser.add_argument('-d', '--difficulty', default=5, type=int,
                        help='Difficult of the block')
    parser.add_argument('-f', '--file', default="chain.data",
                        help='File where the blockchain is saved and loaded')
    parser.add_argument('-i', '--valid', action='store_true',
                        help='Check if chain is valid')
    parser.add_argument('-p', '--print', action='store_true',
                        help='Print Blockchain')
    return parser.parse_args()


def mine_block(last_block, data, difficulty):
    if data.startswith('@'):
        fname = data[1:]
        with open(fname) as fd:
            data = fd.read()
    block = Block(height=last_block.height + 1,
                  prev_hash=last_block.hash,
                  data=data,
                  difficulty=difficulty)
    block.mine()
    return block


def main():
    args = parse_args()
    chain = Blockchain(args.file)
    if args.data:
        last_block = chain.top_block()
        block = mine_block(last_block, args.data, args.difficulty)
        chain.add_block(block)
        chain.save_json(args.file)
    if args.print:
        chain.print()
    if args.valid:
        v, bad_blks = chain.is_valid()
        if v:
            print("Chain is valid")
        else:
            print("Chain is NOT valid")
            print("Bad blocks at height", bad_blks)


if __name__ == "__main__":
    main()
