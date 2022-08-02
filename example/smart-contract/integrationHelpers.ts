import createKeccakHash from 'keccak'

function pad (num: string, size: number, dir: string) {
  while (num.length < size) {
    if (dir === 'left') {
      num = '0' + num
    } else if (dir === 'right') {
      num = num + '0'
    }
  }
  return num
}

function hex (str: string) {
  const arr1: Array<string> = []
  for (let n = 0, l = str.length; n < l; n++) {
    const hex = Number(str.charCodeAt(n)).toString(16)
    arr1.push(hex)
  }
  return arr1.join('')
}

function hexToAscii (str: string) {
  const hex = str.toString()
  let asciiStr = ''
  for (let n = 0; n < hex.length; n += 2) {
    asciiStr += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
  }
  return asciiStr
}

function makeNumberHexLeftPadded (number: number, width = 64) {
  const numberHex = number.toString(16)
  return pad(numberHex, width, 'left')
}

function leftPaddedAddressOfParam (paramIndex: number, numberOfParams: number, width = 64) {
  /* Specifies the position of each argument according to Contract ABI specifications. */
  const bitsOffset = 32 * numberOfParams
  const bitsPerParam = 64
  const bitsForTheParam = bitsOffset + bitsPerParam * paramIndex
  return makeNumberHexLeftPadded(bitsForTheParam, width)
}

function getFirstFourBytesOfKeccak (functionSignature: string) {
  return createKeccakHash('keccak256').update(functionSignature).digest('hex').slice(0, 8)
}

function argumentEncoding (arg: string) {
  /* Encodes the argument according to Contract ABI specifications. */
  let encodedArgument: string = pad((arg.length).toString(16), 64, 'left')
  const encodedString = hex(Buffer.from(arg, 'utf-8').toString())
  encodedArgument = encodedArgument + pad(encodedString, 64, 'right').toUpperCase()
  return encodedArgument
}

export { makeNumberHexLeftPadded, leftPaddedAddressOfParam, getFirstFourBytesOfKeccak, argumentEncoding, hexToAscii }
