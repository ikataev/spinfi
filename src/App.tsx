import {connected, selectIsSignedIn, selectState} from './store/near/nearSlice'
import {useAppDispatch, useAppSelector} from './store/store'
import {Welcome} from './components/Welcome'
import {Wallet} from './components/wallet/Wallet'
import {useContext} from 'react'
import {NearAPIContext} from './near/NearAPIContext'

export const App = () => {
    const NearAPI = useContext(NearAPIContext)
    const dispatch = useAppDispatch()

    const state = useAppSelector(selectState)
    const isSignedIn = useAppSelector(selectIsSignedIn)

    if (state === 'idle') {
        NearAPI.connect().then(
            config => dispatch(connected(config))
        )

        return <div>Initializing...</div>
    }

    return (
        <>
            {!isSignedIn ? (
                <Welcome/>
            ) : (
                <Wallet/>
            )}
        </>
    )
}