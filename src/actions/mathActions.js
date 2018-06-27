export function setNumber(value) {
    return {
        type: "NUMBER",
        number: value
    }
}

export function clear() {
    return {
        type: "CLEAR"
    }
}

export function applyOperator(sign) {
    return {
        type: "OPERATOR",
        sign: sign
    }
}

export function evaluate() {
    return {
        type: "EVALUATE"
    }
}

export function setDecimal() {
    return {
        type: "DECIMAL"
    }
}

export function applySqrt() {
    return {
        type: "SQRT"
    }
}

export function setNegative() {
    return {
        type: "NEGATIVE"
    }
}

export function deleteNumber() {
    return {
        type: "BACKSPACE"
    }
}


