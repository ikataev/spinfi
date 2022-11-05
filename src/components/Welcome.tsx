import {FunctionComponent, memo, useContext} from 'react'
import {NearAPIContext} from '../near/NearAPIContext'

const WelcomeComponent: FunctionComponent = () => {
    const NearAPI = useContext(NearAPIContext)

    const onClick = () => {
        NearAPI.signIn()
    }

    return (
        <>
            <div>Welcome to the Near app</div>
            <div>Click the button below to sign in</div>

            <br/>

            <button onClick={onClick}>Sign In</button>
        </>
    )
}

export const Welcome = memo(WelcomeComponent)