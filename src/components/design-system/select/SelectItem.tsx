import {FunctionComponent, memo, PropsWithChildren} from 'react'

type Props = {
    value: string
}

const SelectItemComponent: FunctionComponent<PropsWithChildren<Props>> = ({value, children}) => {
    return (
        <option value={value}>{children}</option>
    )
}

export const SelectItem = memo(SelectItemComponent)