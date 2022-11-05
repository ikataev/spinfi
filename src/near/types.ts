export type MarketOrder = {
    price: number
    quantity: number
}

export type MarketView = {
    ask_orders: MarketOrder[]
    bid_orders: MarketOrder[]
}