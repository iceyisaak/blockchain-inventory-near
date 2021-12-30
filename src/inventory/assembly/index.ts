import { Context, logging } from "near-sdk-core"
import { AccountId } from "../../utils"
import { ProductDetail, Products } from "./model"

@nearBindgen
export class Contract {
  private owner: AccountId
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

  getAllProducts(): Array<ProductDetail> {
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

  private assert_owner(): void {
    const caller = Context.predecessor
    assert(this.owner == caller, "You have no right to call such method ;)")
  }

}

