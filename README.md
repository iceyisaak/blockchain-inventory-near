# Blockchain Inventory (NEAR)
###### by: Iceyisaak 
###### Date: 20211229
<br>

## Description

This app is a very simple blockchain app that lets users keep track of inventory on NEAR blockchain.
 
It allows users to:

1. Deploy on NEAR blockchain
2. `addProduct()` to the blockchain
3. `getAllProducts()` from the blockchain
4. `getProduct()` by ID
<br>
<br>

## Prerequisites
- [Enable Yarn in NodeJS](https://yarnpkg.com/getting-started/install)
- [Get NEAR Wallet](https://wallet.testnet.near.org/)
- Run `near login`
<br>
<br>

## Getting Started
1. Run `yarn` to install dependencies
2. Run `./scripts/1.dev-deploy.sh` to set up a NEAR test account + deploy the smartcontract to it.
   1. Look in the terminal log for your experimental contract that looks similar to `dev-###-###`, then run `export CONTRACT=<dev-123-456>`
   2. Set your account as contract owner: `export OWNER=<your-near-account>`
   3. Initialise Contract Owner: `near call \$CONTRACT init '{\"owner\":\"'\$OWNER'\"}' --accountId`
3. Run `./scripts/2.use-contract.sh` to test run Contract
<br>
<br>

## Functionalities

### `addProduct(title: string, description: string, price: f64)`

- Let users add product to the NEAR blockchain
  
  ```ts
  near call $CONTRACT addProduct \
  '{"title":"Product A","description":"This is the awesome Product A","price":9.99}' \
  --accountId $OWNER
  ```

### `getAllProducts(): Array<ProductDetail>`

- Let users get all products from the NEAR blockchain
  
  ```ts
  near call $CONTRACT getAllProducts --accountId $OWNER
  ```

### `getProduct(id: i32): ProductDetail`

- Let users get a single product by ID from the NEAR blockchain

  ```ts
  near call $CONTRACT getProducts \
  '{"id": ###}' \
  --accountId $OWNER
  ```
<br>
<br>


## Cleaning Up
1. Set Beneficiary Contract: `export BENEFICIARY=<your-near-account>`
2. Run `./scripts/3.cleanup.sh/`
<br>
<br>

## About This Project
The project is developed as part of the NEAR Certified Developer Level 1
- Inspired by 
  - [Meme Museum L1](https://github.com/Learn-NEAR/NCD.L1.sample--meme-museum)
  - [Sample Library L1](https://github.com/Learn-NEAR/NCD.L1.sample--library)
- Built on top of [near-sdk-as Starterkit](https://github.com/Learn-NEAR/starter--near-sdk-as) 
<br>
<br>

## The file system

```sh
├── README.md                          # this file
├── as-pect.config.js                  # configuration for as-pect (AssemblyScript unit testing)
├── asconfig.json                      # configuration for AssemblyScript compiler (supports multiple contracts)
├── package.json                       # NodeJS project manifest
├── scripts
│   ├── 1.dev-deploy.sh                # helper: build and deploy contracts
│   ├── 2.use-contract.sh              # helper: call methods on ContractPromise
│   ├── 3.cleanup.sh                   # helper: delete build and deploy artifacts
│   └── README.md                      # documentation for helper scripts
├── src
│   ├── as_types.d.ts                  # AssemblyScript headers for type hints
│   ├── inventory                         # Contract: "inventory"
│   │   ├── __tests__
│   │   │   ├── as-pect.d.ts           # as-pect unit testing headers for type hints
│   │   │   └── index.unit.spec.ts     # unit tests for the contract
│   │   ├── asconfig.json              # configuration for AssemblyScript compiler (one per contract)
│   │   └── assembly
│   │       └── index.ts               # contract code for the contract
│   ├── tsconfig.json                  # Typescript configuration
│   └── utils.ts                       # common contract utility functions
└── yarn.lock                          # project manifest version lock
```

You may clone this repo to get started OR create everything from scratch.

Please note that, in order to create the AssemblyScript and tests folder structure, you may use the command `asp --init` which will create the following folders and files:

```
./assembly/
./assembly/tests/
./assembly/tests/example.spec.ts
./assembly/tests/as-pect.d.ts
```
