const { modPow } = require("./euler");
const { fermatTest } = require("./rsa");
const { findPrimitiveRoots } = require("./primitive");

function runDH(q, xa, xb) {

    if (!q || !xa || !xb) {
        return { error: "q, xa and xb are required" };
    }

    q = parseInt(q);
    xa = parseInt(xa);
    xb = parseInt(xb);

    if (!fermatTest(q)) {
        return { error: "q must be a prime number" };
    }

    // Private key range: 1 to q-1
    if (xa <= 0 || xa > q-1 || xb <= 0 || xb > q-1) {
        return { error: "Private keys must be in range 1 to q-1" };
    }

    const result = findPrimitiveRoots(q);
    const roots = result.roots;

    if (!roots || roots.length === 0) {
        return { error: "No primitive root found for q" };
    }

    const alpha = roots[roots.length - 1];

    const ya = modPow(alpha, xa, q);
    const yb = modPow(alpha, xb, q);

    const ka = modPow(yb, xa, q);
    const kb = modPow(ya, xb, q);

    return {
        q,
        alpha,
        primitiveRoots: roots,
        ya,
        yb,
        ka,
        kb
    };
}

module.exports = runDH;
