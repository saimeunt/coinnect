# Coinnect

## Run in dev

```
pnpm hardhat:node
pnpm hardhat:deploy:localhost
pnpm dev
```

## Test

`pnpm hardhat:test`

## Coverage

`pnpm hardhat:coverage`

| File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines |
| --------------- | ------- | -------- | ------- | ------- | --------------- |
| contracts/      | 100     | 100      | 100     | 100     |                 |
| Accounts.sol    | 100     | 100      | 100     | 100     |                 |
| StableCoin.sol  | 100     | 100      | 100     | 100     |                 |
| Tokens.sol      | 100     | 100      | 100     | 100     |                 |
| --------------- | ------- | -------- | ------- | ------- | --------------- |
| All files       | 100     | 100      | 100     | 100     |                 |

## Deploy contracts

`pnpm hardhat:deploy:mumbai`

Contracts are deployed on mumbai test network.

StableCoin:

https://mumbai.polygonscan.com/address/0xc28de45bebc19c850ae043830cf94b9d3e56281b
Accounts:

https://mumbai.polygonscan.com/address/0x149b967F2df4ac605F89529188375c76f2477aF8
Tokens:

https://mumbai.polygonscan.com/address/0xe5d993d4B1B64A7beDf6f13e36747925AF95fdfD

## Deploy dApp

`git push`

dApp is deployed on Vercel at:

https://coinnect.vercel.app/

## Demo

A demo of the creator interface is available here:

https://www.loom.com/share/c06a1432910c4995b6afeb6b4ca76fa4

A demo of the user interface is available here:

https://www.loom.com/share/50c332ca4dec4a12b4bf9a26de7c99fe

La carte de fidélité mise à jour évoquée à la fin de cette vidéo:

https://testnets.opensea.io/assets/mumbai/0x97cbB7A477d7b8d7008d176641c08bf8F9c08e7d/3
