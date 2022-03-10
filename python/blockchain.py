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


if __name__ == "__main__":
    chain: Blockchain = Blockchain()
    # add a dummy block as the header, this is called genesis block
    gblk = Block("genesis", "0")
    gblk.generate_hash()
    chain.add_block(gblk)
    # add 5 blocks
    prev_blk = gblk
    for data in ["test1", "test2", "test3", "test4", "test5"]:
        blk:Block = Block(data, prev_blk.hash)
        blk.generate_hash()
        chain.add_block(blk)
        prev_blk = blk
    chain.print()
