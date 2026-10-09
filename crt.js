(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CRT = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const mod = (a, m) => ((a % m) + m) % m;

  function gcd(a, b) {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b) [a, b] = [b, a % b];
    return a;
  }

  // returns [g, s, t] with a*s + b*t = g
  function extGcd(a, b) {
    let [or, r] = [a, b];
    let [os, s] = [1n, 0n];
    let [ot, t] = [0n, 1n];
    while (r) {
      const q = or / r;
      [or, r] = [r, or - q * r];
      [os, s] = [s, os - q * s];
      [ot, t] = [t, ot - q * t];
    }
    return [or, os, ot];
  }

  function modInv(a, m) {
    const [g, s] = extGcd(mod(a, m), m);
    if (g !== 1n) return null;
    return mod(s, m);
  }

  // eqs: [{a: BigInt, m: BigInt}], m >= 2
  // Returns {ok, x, M, coprime, normalized, classic, merges, conflict}
  function solve(eqs) {
    const normalized = eqs.map(({ a, m }) => ({ a: mod(a, m), m, rawA: a }));
    let coprime = true;
    for (let i = 0; i < normalized.length; i++)
      for (let j = i + 1; j < normalized.length; j++)
        if (gcd(normalized[i].m, normalized[j].m) !== 1n) coprime = false;

    // Sequential merge (works for coprime and non-coprime moduli)
    const merges = [];
    let x = normalized[0].a;
    let M = normalized[0].m;
    for (let i = 1; i < normalized.length; i++) {
      const { a: a2, m: m2 } = normalized[i];
      const g = gcd(M, m2);
      const diff = a2 - x;
      if (mod(diff, g) !== 0n) {
        return { ok: false, coprime, normalized, merges, conflict: { i: i, g, diff } };
      }
      const m2g = m2 / g;
      const inv = m2g === 1n ? 0n : modInv(M / g, m2g);
      const k = m2g === 1n ? 0n : mod((diff / g) * inv, m2g);
      const newM = (M / g) * m2;
      const newX = mod(x + M * k, newM);
      merges.push({ i, prevX: x, prevM: M, a: a2, m: m2, g, k, newX, newM });
      x = newX;
      M = newM;
    }

    let classic = null;
    if (coprime) {
      const terms = normalized.map(({ a, m }) => {
        const Mi = M / m;
        const yi = modInv(Mi, m);
        return { a, m, Mi, yi, term: a * Mi * yi };
      });
      const sum = terms.reduce((s, t) => s + t.term, 0n);
      classic = { terms, sum, x: mod(sum, M) };
    }
    return { ok: true, x, M, coprime, normalized, classic, merges };
  }

  // candidate: BigInt; returns per-congruence check
  function verify(x, eqs) {
    return eqs.map(({ a, m }) => ({ a, m, r: mod(x, m), ok: mod(x, m) === mod(a, m) }));
  }

  return { mod, gcd, extGcd, modInv, solve, verify };
});
