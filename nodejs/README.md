# Blockchain in nodejs

## Getting Started
```
git clone https://github.com/maskiran/blockchain.git
cd blockchain/nodejs
npm install
```

## Usage
```
node main.js -h
usage: main.js [-h] [-a DATA] [-d DIFFICULTY] [-f FILE] [-i] [-p]

optional arguments:
  -h, --help            show this help message and exit
  -a DATA, --data DATA  Create a block with this data. You can provide a data file using @filename
                        as the value
  -d DIFFICULTY, --difficulty DIFFICULTY
                        Difficult of the block
  -f FILE, --file FILE  File where the blockchain is saved and loaded
  -i, --valid           Check if chain is valid
  -p, --print           Print Blockchain
```

## Blockchain file
The blockchain data can be saved and loaded during the actions performed while running the commands. The default file is `chain.data` in the current directory. It can be overridden by providing a custom file using `-f filename` option of the command. When the program starts it load the data from the file. If a block is added, it saves the chain to the file name.

## Add a Block with some data
```
# Add a sample data string
node main.js -f chain.data -a testdata1234

# Add data from a file
node main.js -f chain.data -a @datfilepath

# Change the difficulty
node main.js -f chain.data -a testdata1234 -d 6
```

## Print Blockchain
```
node main.js -f chain.data -p
```

## Check the validity of the chain
```
node main.js -f chain.data -i
```