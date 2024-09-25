export const currencyFormat = (val: number, digits: number = 2) => {
	
	if (val > 10000000 || val < -10000000) digits = 0
	
	const formattedWithSeparator = new Intl.NumberFormat('us-US', {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits,
	}).format(val);
	
	const regex = /^0+(?=\d)|\.?0+$/g;
	return formattedWithSeparator.replace(regex, '');
}

export const columnCurrencyFormat = (params: any) => {
	return currencyFormat(params.value, params.data.price_round)
}

export const displayCodeLabel = (id: string) => {
	if (!id) return "-"
    const txt = id.split('-') ?? "";
    return String(txt[1]).padStart(4, '0');
}