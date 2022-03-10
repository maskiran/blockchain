import datetime
import hashlib
import math


class Block:
    def __init__(self, data: str) -> None:
        self.data: str = data
        # seconds int
        self.timestamp: int = math.ceil(datetime.datetime.now().timestamp())
        self.hash: str = ""

    def generate_hash(self):
        text = str(self.timestamp) + self.data
        hasher = hashlib.sha256()
        hasher.update(text.encode())
        self.hash = hasher.hexdigest()

    def __str__(self) -> str:
        return (f"Data: {self.data}, Timestamp:{self.timestamp}, Hash: {self.hash[-5:]}")


if __name__ == "__main__":
    b: Block = Block('test1')
    b.generate_hash()
    print(b)
