package block

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"strconv"
	"strings"
	"time"
)

type Block struct {
	height          int
	prev_hash       string
	data            string
	difficulty      int
	hash            string
	nonce           int
	timestamp       int
	mining_duration int
}

func New(height int, prev_hash string, data string, difficulty int) *Block {
	blk := Block{
		height:     height,
		prev_hash:  prev_hash,
		data:       data,
		difficulty: difficulty,
		nonce:      0,
		timestamp:  int(time.Now().Unix()),
	}
	return &blk
}

func (blk *Block) generate_hash() string {
	var digest string
	text := blk.prev_hash + blk.data + strconv.Itoa(blk.timestamp) + strconv.Itoa(blk.nonce)
	hash := sha256.New()
	hash.Write([]byte(text))
	digest = hex.EncodeToString(hash.Sum(nil))
	return digest
}

func (blk *Block) Mine() {
	start := time.Now()
	for {
		digest := blk.generate_hash()
		exp_prefix := strings.Repeat("0", blk.difficulty)
		digest_prefix := digest[0:blk.difficulty]
		if exp_prefix == digest_prefix {
			blk.hash = digest
			break
		} else {
			blk.nonce++
		}
	}
	end := time.Now()
	duration := end.Sub(start)
	blk.mining_duration = int(duration.Seconds())
}

func (blk *Block) String() string {
	return fmt.Sprintf("Height: %d, Prev Hash: %s, Hash: %s, Difficulty: %d, Nonce: %d, TimeStamp: %d, Duration: %d",
		blk.height, blk.prev_hash, blk.hash, blk.difficulty, blk.nonce, blk.timestamp, blk.mining_duration)
}
