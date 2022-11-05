import {FunctionComponent, memo} from 'react'
import {MarketOrder} from '../../../near/types'
import {formatAmount} from '../../../near/utils'

type Props = {
    orders: MarketOrder[]
}

export const BookTableComponent: FunctionComponent<Props> = ({orders}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
            </thead>

            <tbody>
            {orders.map(order => (
                <tr key={order.price}>
                    <td>{formatAmount(order.price)}</td>
                    <td>{formatAmount(order.quantity)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export const BookTable = memo(BookTableComponent)