const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Math Logic
const eulerTotient = (n) => {
    let result = n;
    for (let p = 2; p * p <= n; p++) {
        if (n % p === 0) {
            while (n % p === 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
};

const power = (base, exp, mod) => {
    let res = 1n; base = BigInt(base) % BigInt(mod);
    exp = BigInt(exp); mod = BigInt(mod);
    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % mod;
        base = (base * base) % mod;
        exp = exp / 2n;
    }
    return res.toString();
};

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Route for calculations
app.post('/api/calculate', (req, res) => {
    const { mode, val1, val2 } = req.body;
    let result;

    if (mode === 'euler') {
        result = eulerTotient(parseInt(val1));
    } else {
        // Fermat: a^(p-2) % p
        result = power(val1, parseInt(val2) - 2, val2);
    }
    res.json({ result });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
