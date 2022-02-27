from block import Block


class Blockchain(object):
    def __init__(self) -> None:
        self.chain = []

    def add_genesis_block(self):
        genesis_block = Block(0, "0", "", 1)
        genesis_block.mine()
        self.chain.append(genesis_block)

    def top_block(self):
        return self.chain[-1]

    def add_block(self, block):
        self.chain.append(block)

    def print(self):
        for block in self.chain:
            print(block)

    def is_valid(self):
        prev_block = self.chain[0]
        valid = True
        for cur_block in self.chain[1:]:
            if cur_block.prev_hash == prev_block.hash and cur_block.hash == cur_block.generate_hash():
                pass
            else:
                # hashes not matching
                valid = False
            prev_block = cur_block
        return valid
