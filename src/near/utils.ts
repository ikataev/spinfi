import {utils} from 'near-api-js'

export const formatAmount = (amount: any) => {
    let formatted = amount.toLocaleString('fullwide', {useGrouping: false})
    formatted = utils.format.formatNearAmount(formatted)

    //I'm not sure about , in formated value. Well, if it exists, return as is
    if (formatted.includes(',')) {
        return formatted
    }

    return Math.floor(formatted * 100) / 100
}