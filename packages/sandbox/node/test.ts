import diff from 'diff';
import keys from '../config/keys';
import prettyDiff from 'pretty-string-diff';

const pub =
    'E5, 55, D1, 94, E8, 82, 2D, A3, 5A, C5, 41, CE, 9E, EC, 8B, 45, 5, 8F, 4D, 29, 4D, 94, 26, EF, 97, BA, 92, 69, 87, 66, F7, D3';
const priv =
    'DE, 75, 7B, CB, 79, F4, C6, 3E, 8F, A0, 79, 5E, DC, 26, F8, 6D, FD, BA, 18, 9B, 84, 6E, 90, 3D, B, 73, 2B, B6, 44, 60, 77, 20, E5, 55, D1, 94, E8, 82, 2D, A3, 5A, C5, 41, CE, 9E, EC, 8B, 45, 5, 8F, 4D, 29, 4D, 94, 26, EF, 97, BA, 92, 69, 87, 66, F7, D3';

function normalize(s: string): string {
    return s.replace(/, /g, '').toLowerCase();
}

console.log(prettyDiff(normalize(pub), keys.publicKey.hex));
console.log(prettyDiff(normalize(priv), keys.privateKey.hex));
