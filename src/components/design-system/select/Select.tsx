import {ChangeEvent, FunctionComponent, memo, PropsWithChildren} from 'react'

type Props = {
    onChange: (value: any, event?: ChangeEvent<HTMLSelectElement>) => void
}

const SelectComponent: FunctionComponent<PropsWithChildren<Props>> = ({onChange, children}) => {
    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value, event)
    }

    return (
        <select onChange={onChangeHandler}>
            {children}
        </select>
    )
}



export const Select = memo(SelectComponent)