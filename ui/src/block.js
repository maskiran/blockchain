import sha256 from 'crypto-js/sha256';

export default class Block {
    constructor(index, prevHash, data, difficulty = 1) {
        this.index = index
        this.prevHash = prevHash
        this.data = data
        this.nonce = 0
        this.hash = "0"
        this.difficulty = parseInt(difficulty) || 1
        this.timestamp = Date.now()
    }

    mineBlock = () => {
        var data;
        var hash;
        while (true) {
            data = this.timestamp.toString() + this.prevHash + this.data + this.nonce.toString()
            hash = sha256(data).toString()
            var hashPrefix = hash.slice(0, this.difficulty)
            var difficultyPrefix = '0'.repeat(this.difficulty)
            if (hashPrefix === difficultyPrefix) {
                this.hash = hash
                break
            } else {
                this.nonce++;
            }
        }
    }
}