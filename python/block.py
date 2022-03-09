import datetime
import math


class Block:
    def __init__(self, data: str) -> None:
        self.data: str = data
        # seconds int
        self.timestamp: int = math.ceil(datetime.datetime.now().timestamp())

    def __str__(self) -> str:
        return (f"Data: {self.data}, Timestamp:{self.timestamp}")


if __name__ == "__main__":
    b: Block = Block('test1')
    print(b)
