import {FunctionComponent, memo, useContext, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../store/store'
import {logout, selectAccountBalance, selectAccountId, selectMarkets} from '../../store/near/nearSlice'
import {Select} from '../design-system/select/Select'
import {SelectItem} from '../design-system/select/SelectItem'
import {Book} from './book/Book'
import {formatAmount} from '../../near/utils'
import {NearAPIContext} from '../../near/NearAPIContext'

const WalletComponent: FunctionComponent = () => {
    const dispatch = useAppDispatch()
    const NearAPI = useContext(NearAPIContext)
    const accountId = useAppSelector(selectAccountId)
    const accountBalance = formatAmount(useAppSelector(selectAccountBalance))
    const markets = useAppSelector(selectMarkets) as any[]

    const [selectedMarketId, setSelectedMarketId] = useState<number>(markets[0].id)

    const onLogoutClicked = () => {
        NearAPI.signOut().then(
            () => dispatch(logout())
        )
    }

    const onMarketIdChanged = (marketId: string) => {
        setSelectedMarketId(parseInt(marketId))
    }

    return (
        <div>
            <button onClick={onLogoutClicked}>Logout {accountId}</button>

            <br/><br/>

            <div>Account Id: {accountId}</div>
            <div>Account Balance: {accountBalance}</div>

            <br/>

            <Select onChange={onMarketIdChanged}>
                {markets?.map(market => (
                    <SelectItem value={market.id} key={market.id}>
                        {market.base.ticker} / {market.quote.ticker}
                    </SelectItem>
                ))}
            </Select>

            <br/><br/>

            <Book marketId={selectedMarketId}/>
        </div>
    )
}

export const Wallet = memo(WalletComponent)