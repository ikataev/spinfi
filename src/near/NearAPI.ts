import * as nearAPI from 'near-api-js'
import {connect, Contract, Near, WalletConnection} from 'near-api-js'

export class NearAPI {
    private nearConnection?: Near
    private walletConnection?: WalletConnection
    private contract?: Contract

    constructor(private contractId: string, private networkId = 'testnet') {
    }

    async connect() {
        const {keyStores} = nearAPI
        const myKeyStore = new keyStores.BrowserLocalStorageKeyStore()

        const connectionConfig = {
            networkId: this.networkId,
            keyStore: myKeyStore, // first create a key store
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
            explorerUrl: 'https://explorer.testnet.near.org',
            headers: {}
        }

        this.nearConnection = await connect(connectionConfig)
        this.walletConnection = new WalletConnection(this.nearConnection, null)

        const isSignedIn = this.walletConnection.isSignedIn()

        let accountId = undefined
        let accountBalance = undefined
        let markets = undefined

        if (isSignedIn) {
            const accountId = this.walletConnection.getAccountId()
            const account = await this.nearConnection.account(accountId)

            accountBalance = (await account.getAccountBalance()).available

            this.contract = new Contract(account, this.contractId, {
                viewMethods: ['markets', 'view_market'],
                changeMethods: []
            })

            // @ts-ignore
            markets = await this.contract.markets({}) as Array<{ id: string }>
        }

        return {
            isSignedIn,
            accountId,
            accountBalance,
            markets
        }
    }

    async signIn() {
        await this.walletConnection?.requestSignIn()
    }

    async signOut() {
        await this.walletConnection?.signOut()
    }

    async loadMarket(marketId: number) {
        // @ts-ignore
        return await this.contract.view_market({
            market_id: marketId
        })
    }

}