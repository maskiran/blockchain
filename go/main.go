package main

import (
	"blockchain/block"
	"fmt"
)

func main() {
	blk := block.New(0, "0102", "kiran", 4)
	blk.Mine()
	fmt.Printf("%s\n", blk)
}
