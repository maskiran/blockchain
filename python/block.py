import datetime
import hashlib
import math


class Block:
    def __init__(self, data: str, prev_hash: str = "0", difficulty: int = 1) -> None:
        self.data: str = data
        # seconds int
        self.timestamp: int = math.ceil(datetime.datetime.now().timestamp())
        self.hash: str = ""
        self.prev_hash: str = prev_hash
        self.difficulty: int = difficulty
        self.nonce: int = 0
        self.mining_duration: int = 0

    def generate_hash(self):
        text = str(self.timestamp) + self.data + \
            self.prev_hash + str(self.nonce)
        hasher = hashlib.sha256()
        hasher.update(text.encode())
        return hasher.hexdigest()

    def mine(self):
        start_time = datetime.datetime.now()
        while True:
            hash: int = self.generate_hash()
            # does it have "difficulty" number of 0s in the beginning?
            hash_prefix = hash[0: self.difficulty]
            expected_prefix = "0" * self.difficulty
            if hash_prefix == expected_prefix:
                self.hash = hash
                break
            else:
                self.nonce += 1
        end_time = datetime.datetime.now()
        self.mining_duration = (end_time - start_time).total_seconds()

    def __str__(self) -> str:
        return (f"Data: {self.data}, Timestamp:{self.timestamp}, "
                f"PrevHash: {self.prev_hash[-5:]}, Hash: {self.hash[-5:]}, "
                f"Nonce: {self.nonce}, Duration: {self.mining_duration}")
