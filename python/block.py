import hashlib
import arrow


class Block(object):
    def __init__(self, height: int, prev_hash: str, data: str,
                 difficulty: int = 1):
        self.height: int = height
        self.prev_hash: str = prev_hash
        self.data: str = data
        self.difficulty: int = difficulty
        self.hash: str = ""
        self.nonce: int = 0
        self.timestamp: int = arrow.now().timestamp()
        self.mining_duration = 0

    def mine(self):
        start = arrow.get().to('local')
        print(f"Mining block at height {self.height} at {start}, ",
              end='', flush=True)
        while True:
            hash = self.generate_hash()
            # check if the number of 0s in the hash matches the difficulty
            if hash[0:self.difficulty] == '0' * self.difficulty:
                self.hash = hash
                end = arrow.now()
                break
            else:
                self.nonce += 1
            if self.nonce >= 2 ** 32:
                # change the timestamp and restart the nonce
                self.timestamp = arrow.now().timestamp()
                self.nonce = 0
        self.mining_duration = (end - start).total_seconds()
        print(f"Duration {self.mining_duration}")

    def _print_hash(self, hash):
        # print last 6 chars of the hash to make it easy to read
        return hash[-6:]

    def generate_hash(self):
        text = self.prev_hash + str(self.data) + \
            str(self.timestamp) + str(self.nonce)
        return hashlib.sha256(text.encode()).hexdigest()

    def to_json(self):
        return {
            "height": self.height,
            "prev_hash": self.prev_hash,
            "data": self.data,
            "difficulty": self.difficulty,
            "hash": self.hash,
            "nonce": self.nonce,
            "timestamp": self.timestamp,
            "mining_duration": self.mining_duration
        }

    def __repr__(self) -> str:
        return (f"Height: {self.height}, Difficulty: {self.difficulty}, "
                f"Prevhash: {self._print_hash(self.prev_hash)}, "
                f"Hash: {self._print_hash(self.hash)}, Nonce: {self.nonce}, "
                f"Duration: {self.mining_duration}"
                )
