import json
import os
from typing import List
import tabulate
from block import Block


class Blockchain():
    def __init__(self, file_name) -> None:
        self.chain: List[Block] = []
        if os.path.exists(file_name):
            self.load_block_chain(file_name)
        else:
            self.add_genesis_block()

    def load_block_chain(self, file_name):
        with open(file_name) as fd:
            block_chain_data = json.load(fd)
            for blk_data in block_chain_data:
                blk = Block(blk_data['height'], blk_data['prev_hash'],
                            blk_data['data'], blk_data['difficulty'])
                # set the properties that are not set in the constructor
                blk.nonce = blk_data['nonce']
                blk.hash = blk_data['hash']
                blk.timestamp = blk_data['timestamp']
                blk.mining_duration = blk_data['mining_duration']
                self.add_block(blk)

    def add_genesis_block(self):
        genesis_block = Block(0, "0", "", 1)
        genesis_block.mine()
        self.chain.append(genesis_block)

    def top_block(self):
        return self.chain[-1]

    def add_block(self, block: Block):
        self.chain.append(block)

    def print(self):
        headers = ['Height', 'Prev Hash', 'Hash', 'Data Size',
                   'Nonce', 'Difficulty', 'Mining Duration']
        data = []
        for block in self.chain:
            data.append([
                block.height,
                block.prev_hash[-6:],
                block.hash[-6:],
                len(block.data),
                block.nonce,
                block.difficulty,
                block.mining_duration
            ])
        print(tabulate.tabulate(data, headers=headers, tablefmt="fancy_grid", floatfmt="f"))

    def is_valid(self):
        prev_block = self.chain[0]
        valid = True
        bad_blocks = []
        for cur_block in self.chain[1:]:
            if cur_block.prev_hash == prev_block.hash and cur_block.hash == cur_block.generate_hash():
                pass
            else:
                # hashes not matching
                valid = False
                bad_blocks.append(cur_block.height)
            prev_block = cur_block
        return (valid, bad_blocks)

    def save_json(self, file_name):
        with open(file_name, 'w') as fd:
            json.dump(self.chain, fd, indent=4,
                      default=lambda blk: blk.to_json())
