import { storage, Context, logging } from "near-sdk-core"
import { AccountId } from "../../utils"
import { ProductDetail, Products } from "./model"

@nearBindgen
export class Contract {
  private owner: AccountId
  private message: string = 'hello world'

  constructor(owner: AccountId) {
    this.owner = owner
  }

  greeting(): string {
    return `Hi ${this.owner} :D Welcome to the Blockchain Inventory System :D !!!`
  }

  contractInfo(): string {
    this.assert_owner()
    logging.log('-------------------------------------')
    logging.log(`$CONTRACT: ${Context.contractName}`)
    logging.log(`$OWNER: ${this.owner}`)
    logging.log('-------------------------------------')
    return `contractInfo()`
  }

  @mutateState()
  addProduct(title: string, description: string, price: f64): bool {
    this.assert_owner()
    assert(title.length > 0, "Title is required.")
    assert(price >= 0, "Price is required.")

    Products.push(new ProductDetail(Products.length, title, description, price, Context.blockTimestamp))
    return true
  }

  getProducts(): Array<ProductDetail> {
    const result = new Array<ProductDetail>(Products.length)
    for (let i = 0; i < Products.length; i++) {
      result[i] = Products[i]
    }
    return result
  }

  getProduct(id: i32): ProductDetail {
    assert(Products.length > 0, "Inventory is empty.")
    assert(id <= (Products.length - 1), "Product not found.")
    return Products[id]
  }


  // private helper method used by read() and write() above
  private storageReport(): string {
    return `storage [ ${Context.storageUsage} bytes ]`
  }

  private assert_owner(): void {
    const caller = Context.predecessor
    assert(this.owner == caller, "Only the owner of this contract may call this method")
  }

}

/**
 * This function exists only to avoid a compiler error
 *

ERROR TS2339: Property 'contains' does not exist on type 'src/singleton/assembly/index/Contract'.

     return this.contains(key);
                 ~~~~~~~~
 in ~lib/near-sdk-core/storage.ts(119,17)

/Users/sherif/Documents/code/near/_projects/edu.t3/starter--near-sdk-as/node_modules/asbuild/dist/main.js:6
        throw err;
        ^

 * @param key string key in account storage
 * @returns boolean indicating whether key exists
 */
function isKeyInStorage(key: string): bool {
  return storage.hasKey(key)
}

