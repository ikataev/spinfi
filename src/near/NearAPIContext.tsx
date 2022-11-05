import {createContext, FunctionComponent, memo, PropsWithChildren, useRef} from 'react'
import {NearAPI} from './NearAPI'

const contractId = 'app_2.spin_swap.testnet'

const NearAPIContextProviderComponent: FunctionComponent<PropsWithChildren> = ({children}) => {
    const ref = useRef(new NearAPI(contractId))

    return (
        <NearAPIContext.Provider value={ref.current}>
            {children}
        </NearAPIContext.Provider>
    )
}

export const NearAPIContextProvider = memo(NearAPIContextProviderComponent)

// @ts-ignore
export const NearAPIContext = createContext<NearAPI>(null)