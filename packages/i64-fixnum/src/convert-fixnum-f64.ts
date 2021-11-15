import { assert } from '@scale-codec/util';

function fixnumCoef(precision: number): bigint {
    return 10n ** BigInt(precision);
}

/**
 * https://github.com/loyd/fixnum/blob/77860b04eb53a2e001b3b97fe3601833e18b01b9/src/lib.rs#L628
 */
export function fixnumToF64(fixnum: bigint, precision: number): string {
    const coef = fixnumCoef(precision);
    const isNegative = fixnum < 0;
    const fixnumAbs = isNegative ? -fixnum : fixnum;

    const integral = fixnumAbs / coef;
    let fractional = fixnumAbs % coef;

    let fracWidth = fractional > 0 ? precision : 0;

    while (fractional > 0 && fractional % 10n === 0n) {
        fractional /= 10n;
        fracWidth--;
    }

    return `${isNegative ? '-' : ''}${integral}.${fractional.toString().padStart(fracWidth, '0')}`;
}

/**
 * https://github.com/loyd/fixnum/blob/77860b04eb53a2e001b3b97fe3601833e18b01b9/src/lib.rs#L688
 */
export function f64ToFixnum(f64: string, precision: number): bigint {
    assert(f64.match(/^\-?\d+\.\d+?$/), () => `Invalid number: "${f64}"`);

    const coef = fixnumCoef(precision);
    const isNegative = f64.startsWith('-');

    // const f64Str = f64ToNormalizedString(f64, precision);
    const parts = f64.split('.');
    if (parts.length === 1) {
        const [integralStr] = parts;
        const integral = BigInt(integralStr) * coef;
        return integral;
    }

    const [integralStr, fractionalStr] = parts;
    assert(
        fractionalStr.length <= precision,
        () => `Provided num (${f64}) precision is too high (${fractionalStr.length} > ${precision})`,
    );

    const integral = BigInt(integralStr);
    const finalIntegral = integral * coef;

    const exp = 10n ** BigInt(fractionalStr.length);
    const fractionalNum = BigInt(fractionalStr);

    const finalFractional = (coef / exp) * (isNegative ? -fractionalNum : fractionalNum);

    return finalIntegral + finalFractional;
}
