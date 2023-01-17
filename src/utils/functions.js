export const currencyFormat = (amount, currencyCode = "EUR", currencySymbol = "€") => {
    return currencySymbol+" "+parseFloat(amount).toFixed(2)+" "+currencyCode
}
export const variationCurrencyFormat = (amount1, amount2, currencyCode = "EUR", currencySymbol = "€") => {
    return currencySymbol+" "+parseFloat(amount1).toFixed(2)+" - "+parseFloat(amount2).toFixed(2)+" "+currencyCode
}