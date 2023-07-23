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

Contracts are deployed on mumbai test network at:

StableCoin: https://mumbai.polygonscan.com/address/0xc28de45bebc19c850ae043830cf94b9d3e56281b
Accounts: https://mumbai.polygonscan.com/address/0x149b967F2df4ac605F89529188375c76f2477aF8
Tokens: https://mumbai.polygonscan.com/address/0xe5d993d4B1B64A7beDf6f13e36747925AF95fdfD

## Deploy dApp

`git push`

dApp is deployed on Vercel at:

https://coinnect.vercel.app/

## Demo

A demo of the creator interface is available here:

https://www.loom.com/share/d570a2a8353c42bcaaf5f3d8853a0dd8?sid=60028c6e-34fc-4e57-bb22-2fcc39627c22

A demo of the user interface is available here:

https://www.loom.com/share/d570a2a8353c42bcaaf5f3d8853a0dd8?sid=60028c6e-34fc-4e57-bb22-2fcc39627c22
