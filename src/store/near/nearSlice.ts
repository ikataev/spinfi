import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'

type NearType = {
    state: 'idle' | 'connected' | 'disconnected'
    isSignedIn: boolean
    accountId?: string
    accountBalance?: string

    //it's not an actual object, but we need only id
    markets?: any[]
}

const initialState: NearType = {
    state: 'idle',
    isSignedIn: false,
}


const nearSlice = createSlice({
    name: 'near',
    initialState,
    reducers: {
        connected: (state, action: PayloadAction<{
            isSignedIn: boolean,
            accountId?: string,
            accountBalance?: string
            markets?: any[]
        }>) => {
            const {isSignedIn, accountId, accountBalance, markets} = action.payload

            state.state = 'connected'
            state.isSignedIn = isSignedIn
            state.accountId = accountId
            state.accountBalance = accountBalance
            state.markets = markets
        },

        logout: state => ({
            state: 'disconnected',
            isSignedIn: false
        }),
    }
})

export const selectState = (state: RootState) => state.near.state
export const selectIsSignedIn = (state: RootState) => state.near.isSignedIn
export const selectAccountId = (state: RootState) => state.near.accountId
export const selectAccountBalance = (state: RootState) => state.near.accountBalance
export const selectMarkets = (state: RootState) => state.near.markets

export const {connected, logout} = nearSlice.actions
export const nearReducer = nearSlice.reducer