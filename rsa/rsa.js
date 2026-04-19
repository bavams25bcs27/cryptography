// --- Math Utility Functions (updated with Fermat test) ---

function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;

    while (exp > 0) {
        if (exp % 2 === 1)
            result = (result * base) % mod;

        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

function isPrime(num, k = 5) {

    if (num <= 1 || num === 4) return false;
    if (num <= 3) return true;

    for (let i = 0; i < k; i++) {
        let a = 2 + Math.floor(Math.random() * (num - 4));

        if (modExp(a, num - 1, num) !== 1)
            return false;
    }

    return true;
}

function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function extendedGCD(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const { gcd, x: x1, y: y1 } = extendedGCD(b, a % b);
    return { gcd, x: y1, y: x1 - Math.floor(a / b) * y1 };
}

function modInverse(e, phi) {
    const { gcd, x } = extendedGCD(e, phi);
    return gcd !== 1 ? null : (x % phi + phi) % phi;
}

function modPow(base, exp, mod) {
    let res = 1n;
    let b = BigInt(base) % BigInt(mod);
    let e = BigInt(exp);
    let m = BigInt(mod);

    while (e > 0n) {
        if (e % 2n === 1n) res = (res * b) % m;
        b = (b * b) % m;
        e = e / 2n;
    }
    return Number(res);
}

// --- Logic ---
let keys = null;

const generateBtn = document.getElementById('generateKeysBtn');
const encryptBtn = document.getElementById('encryptBtn');

generateBtn.addEventListener('click', () => {

    const p = parseInt(document.getElementById('primeP').value);
    const q = parseInt(document.getElementById('primeQ').value);
    const e = parseInt(document.getElementById('publicE').value);

    try {

        if (isNaN(p) || !isPrime(p)) throw new Error("p must be a prime number!");
        if (isNaN(q) || !isPrime(q)) throw new Error("q must be a prime number!");

        const n = p * q;
        const phi = (p - 1) * (q - 1);

        if (gcd(e, phi) !== 1)
            throw new Error("e and φ(n) must be coprime!");

        const d = modInverse(e, phi);

        if (d === null)
            throw new Error("Could not calculate modular inverse.");

        keys = { e, d, n, phi };

        document.getElementById('keysOutput').innerHTML =
            `<strong>Steps:</strong><br>` +
            `n = ${p} * ${q} = ${n}<br>` +
            `φ(n) = (${p}-1) * (${q}-1) = ${phi}<br>` +
            `d = ${d}<br><br>` +
            `<strong>Public Key:</strong> (e=${e}, n=${n})<br>` +
            `<strong>Private Key:</strong> (d=${d}, n=${n})`;

        encryptBtn.disabled = false;

    } catch (err) {
        alert(err.message);
    }
});


encryptBtn.addEventListener('click', () => {

    const input = document.getElementById('messageInput').value;

    if (!input) return alert("Please enter a message.");

    let outputHtml = "<strong>Process:</strong><br>";
    let encryptedArr = [];
    let decryptedStr = "";

    // NUMBER INPUT
    if (!isNaN(input)) {

        const m = parseInt(input);

        if (m >= keys.n) {
            outputHtml += `Error: message ${m} must be smaller than n (${keys.n})<br>`;
        } else {

            const c = modPow(m, keys.e, keys.n);
            const dm = modPow(c, keys.d, keys.n);

            outputHtml += `Message Number: ${m}<br>`;
            outputHtml += `Cipher: ${c}<br>`;
            outputHtml += `Decrypted Number: ${dm}<br>`;
        }

        document.getElementById('encryptionOutput').innerHTML = outputHtml;
        return;
    }

    // STRING INPUT
    for (let i = 0; i < input.length; i++) {

        const m = input.charCodeAt(i);

        if (m >= keys.n) {

            outputHtml += `<span style="color:red">Error: '${input[i]}' (ASCII ${m}) >= n (${keys.n})</span><br>`;
            continue;
        }

        const c = modPow(m, keys.e, keys.n);
        const dm = modPow(c, keys.d, keys.n);

        encryptedArr.push(c);
        decryptedStr += String.fromCharCode(dm);

        outputHtml += `'${input[i]}' (ASCII ${m}) → Cipher: ${c} | Decrypted: ${dm} ('${String.fromCharCode(dm)}')<br>`;
    }

    document.getElementById('encryptionOutput').innerHTML =
        outputHtml +
        `<br><strong>Final Ciphertext (Array):</strong> [${encryptedArr.join(', ')}]<br>` +
        `<strong>Final Decrypted Text:</strong> ${decryptedStr}`;
});
