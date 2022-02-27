import datetime
import hashlib


class Block(object):
    def __init__(self, height, prev_hash, data, difficulty=1):
        self.height = height
        self.prev_hash = prev_hash
        self.data = data
        self.difficulty = difficulty
        self.hash = ""
        self.nonce = 0
        self.timestamp = datetime.datetime.utcnow()
        self.mining_duration = 0

    def mine(self):
        print(f"Mining block at height {self.height} at {datetime.datetime.now()}")
        start = datetime.datetime.now()
        while True:
            hash = self.generate_hash()
            # check if the number of 0s in the hash matches the difficulty
            if hash[0:self.difficulty] == '0' * self.difficulty:
                self.hash = hash
                end = datetime.datetime.now()
                break
            else:
                self.nonce += 1
            if self.nonce >= 2 ** 32:
                # change the timestamp and restart the nonce
                self.timestamp = datetime.datetime.utcnow()
                self.nonce = 0
        self.mining_duration = (end - start).total_seconds()

    def _print_hash(self, hash):
        # print 6 chars after the difficult to make it easy to read
        return hash[0:10]

    def generate_hash(self): 
        text = self.prev_hash + str(self.data) + str(self.timestamp) + str(self.nonce)
        return hashlib.sha256(text.encode()).hexdigest()

    def __repr__(self) -> str:
        return (f"Height: {self.height}, Difficulty: {self.difficulty}, "
                f"Prevhash: {self._print_hash(self.prev_hash)}, "
                f"Hash: {self._print_hash(self.hash)}, Nonce: {self.nonce}, "
                f"Duation: {self.mining_duration}"
                )
