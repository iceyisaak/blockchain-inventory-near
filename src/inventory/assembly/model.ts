import { PersistentMap, PersistentVector } from 'near-sdk-core'
import { AccountId } from '../../utils'

export enum ProductRating {
  none,
  bad,
  ok,
  good,
  excellent,
  perfect
}

export class Rating {
  rating: ProductRating
  constructor(_rating: ProductRating) {
    this.rating = _rating
  }
}

@nearBindgen
export class ProductDetail {
  id: u64;
  title: string
  description: string
  price: f64
  rating: PersistentVector<Rating>
  comment: PersistentMap<AccountId, string>
  timestamp: u64
  constructor(
    id: u64,
    title: string,
    description: string,
    price: f64,
    timestamp: u64
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.price = price
    this.rating = new PersistentVector<Rating>('rating')
    this.comment = new PersistentMap<AccountId, string>('comment')
    this.timestamp = timestamp
  }
}

export const Products = new PersistentVector<ProductDetail>("Products")
export const rate = new PersistentMap<AccountId, u64>("rate")