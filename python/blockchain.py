from typing import List
from block import Block


class Blockchain():
    def __init__(self) -> None:
        self.blocks: List[Block] = []

    def add_block(self, block: Block):
        self.blocks.append(block)

    def print(self):
        for blk in self.blocks:
            print(blk)

    def is_valid(self):
        prev_blk = self.blocks[0]
        valid = True
        for blk in self.blocks[1:]:
            # check if the hash is good
            if blk.generate_hash() != blk.hash:
                valid = False
            # check curblock's prev_hash == prev_blk.hash
            if blk.prev_hash != prev_blk.hash:
                valid = False
            prev_blk = blk
        if valid:
            print("Chain is Valid")
        else:
            print("Chain is INVALID")


if __name__ == "__main__":
    chain: Blockchain = Blockchain()
    # add a dummy block as the header, this is called genesis block
    gblk = Block("genesis", "0")
    gblk.mine()
    chain.add_block(gblk)
    # add 5 blocks
    prev_blk = gblk
    data_items = ["test1", "test2", "test3", "test4", "test5"]
    difficulty = 5
    for data in data_items:
        blk: Block = Block(data, prev_blk.hash, difficulty)
        blk.mine()
        chain.add_block(blk)
        prev_blk = blk
    chain.print()
    chain.is_valid()
    print("Changing data in block idx 2")
    # change data and check validity
    chain.blocks[2].data = "testxxxxxxx"
    chain.is_valid()
    # re-mine the block and check validity
    print("Re-mining block idx 2 and check validity")
    chain.blocks[2].mine()
    chain.is_valid()
    # remine all the blocks and check validity
    print("Re-mining all blocks after idx 2 and check validity")
    prev_blk = chain.blocks[2]
    for blk in chain.blocks[3:]:
        blk.prev_hash = prev_blk.hash
        blk.mine()
        prev_blk = blk
    chain.is_valid()
