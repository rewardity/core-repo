```bash
yarn build
yarn test
```

To deploy:
```shell
npx hardhat run scripts/deploy.ts --network polygonMumbai
npx hardhat verify --network polygonMumbai --constructor-args scripts/arguments.js --contract contracts/SimpleToken.sol:SimpleToken <contract address>
npx hardhat verify --network polygonMumbai --constructor-args scripts/arguments.js 0xB021c9Ada326Ed7e7B2a395bf5D06abca0302fC0
```