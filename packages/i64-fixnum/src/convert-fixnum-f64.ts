import { JSBI } from '@scale-codec/core';
import { assert } from '@scale-codec/util';

function fixnumCoef(precision: number): JSBI {
    return JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(precision));
}

/**
 * https://github.com/loyd/fixnum/blob/77860b04eb53a2e001b3b97fe3601833e18b01b9/src/lib.rs#L628
 */
export function fixnumToF64(fixnum: JSBI, precision: number): string {
    const coef = fixnumCoef(precision);
    const isNegative = JSBI.lessThan(fixnum, JSBI.BigInt(0));
    const fixnumAbs = isNegative ? JSBI.unaryMinus(fixnum) : fixnum;
    // const coefF64 = JSBI.toNumber(coef);

    const integral = JSBI.divide(fixnumAbs, coef);
    let fractional = JSBI.remainder(fixnumAbs, coef);

    let fracWidth = JSBI.greaterThan(fractional, JSBI.BigInt(0)) ? precision : 0;

    while (
        JSBI.greaterThan(fractional, JSBI.BigInt(0)) &&
        JSBI.equal(JSBI.remainder(fractional, JSBI.BigInt(10)), JSBI.BigInt(0))
    ) {
        fractional = JSBI.divide(fractional, JSBI.BigInt(10));
        fracWidth--;
    }

    return `${isNegative ? '-' : ''}${integral}.${fractional.toString().padStart(fracWidth, '0')}`;
}

/**
 * https://github.com/loyd/fixnum/blob/77860b04eb53a2e001b3b97fe3601833e18b01b9/src/lib.rs#L688
 */
export function f64ToFixnum(f64: string, precision: number): JSBI {
    assert(f64.match(/^\-?\d+\.\d+?$/), () => `Invalid number: "${f64}"`);

    const coef = fixnumCoef(precision);
    const isNegative = f64.startsWith('-');

    // const f64Str = f64ToNormalizedString(f64, precision);
    const parts = f64.split('.');
    if (parts.length === 1) {
        const [integralStr] = parts;
        const integral = JSBI.multiply(JSBI.BigInt(integralStr), coef);
        return integral;
    }

    const [integralStr, fractionalStr] = parts;
    assert(
        fractionalStr.length <= precision,
        () => `Provided num (${f64}) precision is too high (${fractionalStr.length} > ${precision})`,
    );

    const integral = JSBI.BigInt(integralStr);
    const finalIntegral = JSBI.multiply(integral, coef);

    const exp = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(fractionalStr.length));
    const fractionalNum = JSBI.BigInt(fractionalStr);
    const finalFractional = JSBI.multiply(
        JSBI.divide(coef, exp),
        isNegative ? JSBI.unaryMinus(fractionalNum) : fractionalNum,
    );

    return JSBI.add(finalIntegral, finalFractional);
}
