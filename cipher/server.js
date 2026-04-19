const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

/* ================= AFFINE ================= */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function modInverse(a, m) {
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) return i;
  }
  return -1;
}

function affineEncrypt(text, a, b) {
  a = parseInt(a);
  b = parseInt(b);

  if (gcd(a, 26) !== 1)
    return "Error: 'a' must be coprime with 26";

  let res = "";
  text = text.toUpperCase();

  for (let ch of text) {
    if (ch >= 'A' && ch <= 'Z') {
      let x = ch.charCodeAt(0) - 65;
      res += String.fromCharCode(((a * x + b) % 26) + 65);
    } else res += ch;
  }
  return res;
}

function affineDecrypt(text, a, b) {
  a = parseInt(a);
  b = parseInt(b);

  let aInv = modInverse(a, 26);
  if (aInv === -1)
    return "Error: No modular inverse for given 'a'";

  let res = "";
  text = text.toUpperCase();

  for (let ch of text) {
    if (ch >= 'A' && ch <= 'Z') {
      let y = ch.charCodeAt(0) - 65;
      res += String.fromCharCode(((aInv * (y - b + 26)) % 26) + 65);
    } else res += ch;
  }
  return res;
}

/* ================= VIGENERE ================= */
function vigenereEncrypt(text, key) {
  text = text.toUpperCase();
  key = key.toUpperCase();
  let res = "", j = 0;

  for (let ch of text) {
    if (ch >= 'A' && ch <= 'Z') {
      let t = ch.charCodeAt(0) - 65;
      let k = key[j % key.length].charCodeAt(0) - 65;
      res += String.fromCharCode((t + k) % 26 + 65);
      j++;
    } else res += ch;
  }
  return res;
}

function vigenereDecrypt(text, key) {
  text = text.toUpperCase();
  key = key.toUpperCase();
  let res = "", j = 0;

  for (let ch of text) {
    if (ch >= 'A' && ch <= 'Z') {
      let t = ch.charCodeAt(0) - 65;
      let k = key[j % key.length].charCodeAt(0) - 65;
      res += String.fromCharCode((t - k + 26) % 26 + 65);
      j++;
    } else res += ch;
  }
  return res;
}

/* ================= PLAYFAIR ================= */
function generateMatrix(key) {
  key = key.toUpperCase().replace(/J/g, "I");
  let seen = {}, matrix = [];

  for (let ch of key + "ABCDEFGHIKLMNOPQRSTUVWXYZ") {
    if (!seen[ch]) {
      matrix.push(ch);
      seen[ch] = true;
    }
  }
  return matrix;
}

function formatText(text) {
  text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
  let res = "";

  for (let i = 0; i < text.length; i++) {
    res += text[i];
    if (text[i] === text[i + 1]) res += "X";
  }
  if (res.length % 2 !== 0) res += "X";
  return res;
}

function playfairProcess(text, key, encrypt = true) {
  let m = generateMatrix(key);
  text = formatText(text);
  let res = "";

  for (let i = 0; i < text.length; i += 2) {
    let a = text[i], b = text[i + 1];
    let ia = m.indexOf(a), ib = m.indexOf(b);
    let ra = Math.floor(ia / 5), ca = ia % 5;
    let rb = Math.floor(ib / 5), cb = ib % 5;

    if (ra === rb) {
      res += m[ra * 5 + (ca + (encrypt ? 1 : 4)) % 5];
      res += m[rb * 5 + (cb + (encrypt ? 1 : 4)) % 5];
    }
    else if (ca === cb) {
      res += m[((ra + (encrypt ? 1 : 4)) % 5) * 5 + ca];
      res += m[((rb + (encrypt ? 1 : 4)) % 5) * 5 + cb];
    }
    else {
      res += m[ra * 5 + cb];
      res += m[rb * 5 + ca];
    }
  }
  return res;
}

/* ================= API ================= */
app.post("/process", (req, res) => {
  const { cipher, mode, text, a, b, key } = req.body;
  let result = "";

  if (cipher === "affine") {
    result = mode === "encrypt"
      ? affineEncrypt(text, a, b)
      : affineDecrypt(text, a, b);
  }
  else if (cipher === "vigenere") {
    result = mode === "encrypt"
      ? vigenereEncrypt(text, key)
      : vigenereDecrypt(text, key);
  }
  else if (cipher === "playfair") {
    result = playfairProcess(text, key, mode === "encrypt");
  }

  res.json({ result });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
