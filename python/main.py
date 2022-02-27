from blockchain import Blockchain
from block import Block

chain = Blockchain()
chain.add_genesis_block()

for data in range(1, 6):
    data = str(data) * 4
    last_block = chain.top_block()
    block = Block(last_block.height + 1, last_block.hash, data, 4)
    block.mine()
    chain.add_block(block)
chain.print()
print("Chain Valid:", chain.is_valid())
