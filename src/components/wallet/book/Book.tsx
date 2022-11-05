import {FunctionComponent, memo, useContext, useEffect, useState} from 'react'
import {NearAPIContext} from '../../../near/NearAPIContext'
import {MarketView} from '../../../near/types'
import {BookTable} from './BookTable'

type Props = {
    marketId: number
}

const BookComponent: FunctionComponent<Props> = ({marketId}) => {
    const NearAPI = useContext(NearAPIContext)
    const [marketView, setMarketView] = useState<MarketView>()

    useEffect(() => {
        NearAPI?.loadMarket(marketId).then(
            (marketView) => setMarketView(marketView)
        )

        return () => {
            //todo need to stop request and receive results if market has been changed
        }
    }, [marketId])

    return (
        <div>
            {marketView && (
                <>
                    <BookTable orders={marketView.ask_orders}/>
                    <br/>
                    <BookTable orders={marketView.bid_orders}/>
                </>
            )}
        </div>
    )
}

export const Book = memo(BookComponent)