import datetime
import hashlib
import math


class Block:
    def __init__(self, data: str, prev_hash: str = "0") -> None:
        self.data: str = data
        # seconds int
        self.timestamp: int = math.ceil(datetime.datetime.now().timestamp())
        self.hash: str = ""
        self.prev_hash: str = prev_hash

    def generate_hash(self):
        text = str(self.timestamp) + self.data + self.prev_hash
        hasher = hashlib.sha256()
        hasher.update(text.encode())
        self.hash = hasher.hexdigest()

    def __str__(self) -> str:
        return (f"Data: {self.data}, Timestamp:{self.timestamp}, "
                f"PrevHash: {self.prev_hash[-5:]}, Hash: {self.hash[-5:]}")


if __name__ == "__main__":
    b1: Block = Block("test1")
    b1.generate_hash()
    b2: Block = Block('test2', b1.hash)
    b2.generate_hash()
    print(b1)
    print(b2)
