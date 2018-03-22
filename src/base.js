
export const myBaseJs = {
	pxToVw: (viewportSize, minPixelValue = 1, unitPrecision = 3) => number => {
		let floatNumber = parseFloat(number);
		if (floatNumber >= 0) {
			if (floatNumber < minPixelValue) return number;
		} else {
			if (-floatNumber < minPixelValue) return number;
		}
		let data = floatNumber / viewportSize * 100,
			multiplier = Math.pow(10, unitPrecision + 1),
			wholeNumber = Math.floor(data * multiplier);
		return Math.round(wholeNumber / 10) * 10 / multiplier;
	}
}
