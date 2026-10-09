const assert = require('assert');
const CRT = require('./crt.js');

const eq = (a, m) => ({ a: BigInt(a), m: BigInt(m) });

// classic coprime
let r = CRT.solve([eq(2, 3), eq(3, 5), eq(2, 7)]);
assert(r.ok && r.coprime && r.x === 23n && r.M === 105n);
assert.strictEqual(r.classic.x, 23n);

// negative residue normalised
r = CRT.solve([eq(-1, 3), eq(3, 5)]);
assert(r.ok && r.x === 8n && r.M === 15n);

// non-coprime, solvable: x=2 mod 6, x=5 mod 9 -> x=32 mod 18? check
r = CRT.solve([eq(2, 6), eq(5, 9)]);
assert(r.ok && !r.coprime && r.M === 18n);
assert(CRT.verify(r.x, [eq(2, 6), eq(5, 9)]).every((c) => c.ok));

// inconsistent
r = CRT.solve([eq(1, 4), eq(2, 6)]);
assert(!r.ok);

// single congruence
r = CRT.solve([eq(7, 5)]);
assert(r.ok && r.x === 2n && r.M === 5n);

// big numbers
const big = [eq('123456789012345678901', '1000000007'), eq(5, '998244353'), eq(9, '1000000009')];
r = CRT.solve(big);
assert(r.ok && CRT.verify(r.x, big).every((c) => c.ok));

// verify detects wrong answer
assert(!CRT.verify(24n, [eq(2, 3), eq(3, 5), eq(2, 7)]).every((c) => c.ok));

console.log('all tests passed');
