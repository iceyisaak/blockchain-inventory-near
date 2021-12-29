#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 1: Building the contract (One moment please.)"
echo ---------------------------------------------------------
echo

yarn build

echo
echo
echo ---------------------------------------------------------
echo "Step 2: Deploying the contract"
echo
echo "(edit scripts/1.dev-deploy.sh to deploy other contract)"
echo ---------------------------------------------------------
echo

# deploy the contract
near dev-deploy ./build/contracts/inventory.wasm

echo
echo
echo ---------------------------------------------------------
echo "Step 3: Prepare your environment for next steps"
echo
echo "(a) find the contract (account) name in the message above"
echo "    it will look like this: [ Account id: dev-###-### ]"
echo
echo "(b) set an environment variable using this account name"
echo "    see example below (this may not work on Windows)"
echo
echo ---------------------------------------------------------
echo 'export CONTRACT=<dev-123-456>'
echo 'export OWNER=<your-near-account>'
echo "near call \$CONTRACT init '{\"owner\":\"'\$OWNER'\"}' --accountId \$CONTRACT"
echo ---------------------------------------------------------
echo

exit 0