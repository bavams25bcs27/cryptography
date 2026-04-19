
let keyScheduleHTML = "";


const sbox = [
0x63,0x7C,0x77,0x7B,0xF2,0x6B,0x6F,0xC5,0x30,0x01,0x67,0x2B,0xFE,0xD7,0xAB,0x76,
0xCA,0x82,0xC9,0x7D,0xFA,0x59,0x47,0xF0,0xAD,0xD4,0xA2,0xAF,0x9C,0xA4,0x72,0xC0,
0xB7,0xFD,0x93,0x26,0x36,0x3F,0xF7,0xCC,0x34,0xA5,0xE5,0xF1,0x71,0xD8,0x31,0x15,
0x04,0xC7,0x23,0xC3,0x18,0x96,0x05,0x9A,0x07,0x12,0x80,0xE2,0xEB,0x27,0xB2,0x75,
0x09,0x83,0x2C,0x1A,0x1B,0x6E,0x5A,0xA0,0x52,0x3B,0xD6,0xB3,0x29,0xE3,0x2F,0x84,
0x53,0xD1,0x00,0xED,0x20,0xFC,0xB1,0x5B,0x6A,0xCB,0xBE,0x39,0x4A,0x4C,0x58,0xCF,
0xD0,0xEF,0xAA,0xFB,0x43,0x4D,0x33,0x85,0x45,0xF9,0x02,0x7F,0x50,0x3C,0x9F,0xA8,
 0x51,0xA3,0x40,0x8F,0x92,0x9D,0x38,0xF5,0xBC,0xB6,0xDA,0x21,0x10,0xFF,0xF3,0xD2,
0xCD,0x0C,0x13,0xEC,0x5F,0x97,0x44,0x17,0xC4,0xA7,0x7E,0x3D,0x64,0x5D,0x19,0x73,
0x60,0x81,0x4F,0xDC,0x22,0x2A,0x90,0x88,0x46,0xEE,0xB8,0x14,0xDE,0x5E,0x0B,0xDB,
0xE0,0x32,0x3A,0x0A,0x49,0x06,0x24,0x5C,0xC2,0xD3,0xAC,0x62,0x91,0x95,0xE4,0x79,
0xE7,0xC8,0x37,0x6D,0x8D,0xD5,0x4E,0xA9,0x6C,0x56,0xF4,0xEA,0x65,0x7A,0xAE,0x08,
0xBA,0x78,0x25,0x2E,0x1C,0xA6,0xB4,0xC6,0xE8,0xDD,0x74,0x1F,0x4B,0xBD,0x8B,0x8A,
0x70,0x3E,0xB5,0x66,0x48,0x03,0xF6,0x0E,0x61,0x35,0x57,0xB9,0x86,0xC1,0x1D,0x9E,
0xE1,0xF8,0x98,0x11,0x69,0xD9,0x8E,0x94,0x9B,0x1E,0x87,0xE9,0xCE,0x55,0x28,0xDF,
0x8C,0xA1,0x89,0x0D,0xBF,0xE6,0x42,0x68,0x41,0x99,0x2D,0x0F,0xB0,0x54,0xBB,0x16
];

const invSboxArray = [
0x52,0x09,0x6A,0xD5,0x30,0x36,0xA5,0x38,0xBF,0x40,0xA3,0x9E,0x81,0xF3,0xD7,0xFB,
0x7C,0xE3,0x39,0x82,0x9B,0x2F,0xFF,0x87,0x34,0x8E,0x43,0x44,0xC4,0xDE,0xE9,0xCB,
0x54,0x7B,0x94,0x32,0xA6,0xC2,0x23,0x3D,0xEE,0x4C,0x95,0x0B,0x42,0xFA,0xC3,0x4E,
0x08,0x2E,0xA1,0x66,0x28,0xD9,0x24,0xB2,0x76,0x5B,0xA2,0x49,0x6D,0x8B,0xD1,0x25,
0x72,0xF8,0xF6,0x64,0x86,0x68,0x98,0x16,0xD4,0xA4,0x5C,0xCC,0x5D,0x65,0xB6,0x92,
0x6C,0x70,0x48,0x50,0xFD,0xED,0xB9,0xDA,0x5E,0x15,0x46,0x57,0xA7,0x8D,0x9D,0x84,
0x90,0xD8,0xAB,0x00,0x8C,0xBC,0xD3,0x0A,0xF7,0xE4,0x58,0x05,0xB8,0xB3,0x45,0x06,
0xD0,0x2C,0x1E,0x8F,0xCA,0x3F,0x0F,0x02,0xC1,0xAF,0xBD,0x03,0x01,0x13,0x8A,0x6B,
0x3A,0x91,0x11,0x41,0x4F,0x67,0xDC,0xEA,0x97,0xF2,0xCF,0xCE,0xF0,0xB4,0xE6,0x73,
0x96,0xAC,0x74,0x22,0xE7,0xAD,0x35,0x85,0xE2,0xF9,0x37,0xE8,0x1C,0x75,0xDF,0x6E,
0x47,0xF1,0x1A,0x71,0x1D,0x29,0xC5,0x89,0x6F,0xB7,0x62,0x0E,0xAA,0x18,0xBE,0x1B,
0xFC,0x56,0x3E,0x4B,0xC6,0xD2,0x79,0x20,0x9A,0xDB,0xC0,0xFE,0x78,0xCD,0x5A,0xF4,
0x1F,0xDD,0xA8,0x33,0x88,0x07,0xC7,0x31,0xB1,0x12,0x10,0x59,0x27,0x80,0xEC,0x5F,
0x60,0x51,0x7F,0xA9,0x19,0xB5,0x4A,0x0D,0x2D,0xE5,0x7A,0x9F,0x93,0xC9,0x9C,0xEF,
0xA0,0xE0,0x3B,0x4D,0xAE,0x2A,0xF5,0xB0,0xC8,0xEB,0xBB,0x3C,0x83,0x53,0x99,0x61,
0x17,0x2B,0x04,0x7E,0xBA,0x77,0xD6,0x26,0xE1,0x69,0x14,0x63,0x55,0x21,0x0C,0x7D
];

const rcon=[0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80,0x1B,0x36];


function pkcs7Pad(str){
    let blockSize=16;
    let padLen=blockSize-(str.length%blockSize);
    if(padLen===0) padLen=16;
    return str + String.fromCharCode(padLen).repeat(padLen);
}

function pkcs7Unpad(str){
    let padLen=str.charCodeAt(str.length-1);
    return str.slice(0,-padLen);
}


function subBytes(s){ for(let i=0;i<16;i++) s[i]=sbox[s[i]]; }
function invSubBytes(s){ for(let i=0;i<16;i++) s[i]=invSboxArray[s[i]]; }
function shiftRows(s){
 let t=s.slice();
 s[1]=t[5]; s[5]=t[9]; s[9]=t[13]; s[13]=t[1];
 s[2]=t[10]; s[6]=t[14]; s[10]=t[2]; s[14]=t[6];
 s[3]=t[15]; s[7]=t[3]; s[11]=t[7]; s[15]=t[11];
}
function invShiftRows(s){
 let t=s.slice();
 s[1]=t[13]; s[5]=t[1]; s[9]=t[5]; s[13]=t[9];
 s[2]=t[10]; s[6]=t[14]; s[10]=t[2]; s[14]=t[6];
 s[3]=t[7]; s[7]=t[11]; s[11]=t[15]; s[15]=t[3];
}
function xtime(a){return ((a<<1)^(a&128?27:0))&255;}
function mixColumns(s){
 for(let i=0;i<16;i+=4){
  let a=s.slice(i,i+4);
  s[i]=xtime(a[0])^xtime(a[1])^a[1]^a[2]^a[3];
  s[i+1]=a[0]^xtime(a[1])^xtime(a[2])^a[2]^a[3];
  s[i+2]=a[0]^a[1]^xtime(a[2])^xtime(a[3])^a[3];
  s[i+3]=xtime(a[0])^a[0]^a[1]^a[2]^xtime(a[3]);
 }
}
function invMixColumns(s){
 for(let i=0;i<16;i+=4){
  let a=s.slice(i,i+4);
  s[i] = mul(a[0],0x0e)^mul(a[1],0x0b)^mul(a[2],0x0d)^mul(a[3],0x09);
  s[i+1] = mul(a[0],0x09)^mul(a[1],0x0e)^mul(a[2],0x0b)^mul(a[3],0x0d);
  s[i+2] = mul(a[0],0x0d)^mul(a[1],0x09)^mul(a[2],0x0e)^mul(a[3],0x0b);
  s[i+3] = mul(a[0],0x0b)^mul(a[1],0x0d)^mul(a[2],0x09)^mul(a[3],0x0e);
 }
}
function mul(a,b){ let p=0; for(let counter=0;counter<8;counter++){ if(b&1)p^=a; let hi=a&0x80; a=(a<<1)&0xFF; if(hi)a^=0x1b; b>>=1; } return p; }
function addRoundKey(s,k){for(let i=0;i<16;i++) s[i]^=k[i];}


function keyExpansion(key){
    let w=[];
    let html="<h3> AES Key Schedule (w0 -> w43)</h3>";

 
    for(let i=0;i<16;i++) w[i]=key[i];

    for(let i=0;i<4;i++){
        html+="w"+i+" = "+
        w.slice(i*4,(i+1)*4)
         .map(x=>x.toString(16).padStart(2,'0'))
         .join(" ")+"<br>";
    }
    for(let i=16;i<176;i+=4){
        let t=w.slice(i-4,i);
        if(i%16==0){
            t=[t[1],t[2],t[3],t[0]];       
            for(let j=0;j<4;j++) t[j]=sbox[t[j]];  
            t[0]^=rcon[(i/16)-1];         
        }

        for(let j=0;j<4;j++) w[i+j]=w[i+j-16]^t[j];

        let wi=i/4;
        html+="w"+wi+" = "+
        w.slice(i,i+4)
         .map(x=>x.toString(16).padStart(2,'0'))
         .join(" ")+"<br>";
    }

 
    keyScheduleHTML = html;
    let keys=[];
    for(let i=0;i<11;i++){
        keys.push(w.slice(i*16,(i+1)*16));
    }

    return keys;
}

function stateToTable(state){
    let html="<table border='1' cellspacing='0' cellpadding='5'>";
    for(let r=0;r<4;r++){ html+="<tr>"; for(let c=0;c<4;c++){ html+="<td>"+state[c*4+r].toString(16).padStart(2,'0')+"</td>"; } html+="</tr>"; }
    html+="</table>"; return html;
}


function encryptBlock(state,keys,outHtml){
    outHtml+="<b>Initial Plaintext State:</b><br>"+stateToTable(state)+"<br>";
    addRoundKey(state,keys[0]);
    outHtml+="<b>After AddRoundKey (Round 0):</b><br>"+stateToTable(state)+"<br>";

    for(let r=1;r<=9;r++){
        outHtml+="<hr><b>ROUND "+r+"</b><br>";
        subBytes(state); outHtml+="<b>After SubBytes:</b><br>"+stateToTable(state)+"<br>";
        shiftRows(state); outHtml+="<b>After ShiftRows:</b><br>"+stateToTable(state)+"<br>";
        mixColumns(state); outHtml+="<b>After MixColumns:</b><br>"+stateToTable(state)+"<br>";
        addRoundKey(state,keys[r]); outHtml+="<b>After AddRoundKey:</b><br>"+stateToTable(state)+"<br>";
    }

    outHtml+="<hr><b>FINAL ROUND</b><br>";
    subBytes(state); outHtml+="<b>After SubBytes:</b><br>"+stateToTable(state)+"<br>";
    shiftRows(state); outHtml+="<b>After ShiftRows:</b><br>"+stateToTable(state)+"<br>";
    addRoundKey(state,keys[10]);
    outHtml+="<b>Ciphertext State:</b><br>"+stateToTable(state)+"<br>";
    return outHtml;
}

function encryptAES_ECB(){

    let pt=document.getElementById("pt").value;
    let key=document.getElementById("key").value;
    if(key.length!=16){alert("Key must be 16 chars"); return;}

    pt=pkcs7Pad(pt);

    keyScheduleHTML="";
    let keys=keyExpansion([...key].map(c=>c.charCodeAt(0)));

    let outHtml=keyScheduleHTML;   
    let blocks=[];

    for(let i=0;i<pt.length;i+=16){
        let state=[...pt.slice(i,i+16)].map(c=>c.charCodeAt(0));
        outHtml=encryptBlock(state,keys,outHtml);
        blocks.push(state.map(x=>x.toString(16).padStart(2,'0')).join(' '));
    }

    outHtml+="<b>Ciphertext (Hex Blocks):</b><br>"+blocks.join("<br>");
    document.getElementById("out").innerHTML=outHtml;
}
function encryptAES_CBC(){

    let pt=document.getElementById("pt").value;
    let key=document.getElementById("key").value;
    let iv=document.getElementById("iv").value;

    if(key.length!=16||iv.length!=16){alert("Key and IV must be 16 chars"); return;}

    pt=pkcs7Pad(pt);

    keyScheduleHTML="";
    let keys=keyExpansion([...key].map(c=>c.charCodeAt(0)));

    let outHtml=keyScheduleHTML;   
    let prevIV=[...iv].map(c=>c.charCodeAt(0));
    let blocks=[];

    for(let i=0;i<pt.length;i+=16){
        let state=[...pt.slice(i,i+16)].map(c=>c.charCodeAt(0));

        for(let j=0;j<16;j++) state[j]^=prevIV[j];

        outHtml=encryptBlock(state,keys,outHtml);
        prevIV=state.slice();

        blocks.push(state.map(x=>x.toString(16).padStart(2,'0')).join(' '));
    }

    outHtml+="<b>Ciphertext (Hex Blocks):</b><br>"+blocks.join("<br>");
    document.getElementById("out").innerHTML=outHtml;
}


function decryptBlock(state, keys, outHtml) {
    outHtml += "<b>Initial Ciphertext State:</b><br>" + stateToTable(state) + "<br>";

    addRoundKey(state, keys[10]);
    outHtml += "<b>After AddRoundKey (Round 10):</b><br>" + stateToTable(state) + "<br>";

    for (let r = 9; r >= 1; r--) {
        outHtml += "<hr><b>ROUND " + r + "</b><br>";
        invShiftRows(state); outHtml += "<b>After InvShiftRows:</b><br>" + stateToTable(state) + "<br>";
        invSubBytes(state);  outHtml += "<b>After InvSubBytes:</b><br>"  + stateToTable(state) + "<br>";
        addRoundKey(state, keys[r]); outHtml += "<b>After AddRoundKey:</b><br>" + stateToTable(state) + "<br>";
        invMixColumns(state); outHtml += "<b>After InvMixColumns:</b><br>" + stateToTable(state) + "<br>";
    }

    outHtml += "<hr><b>FINAL ROUND</b><br>";
    invShiftRows(state); outHtml += "<b>After InvShiftRows:</b><br>" + stateToTable(state) + "<br>";
    invSubBytes(state);  outHtml += "<b>After InvSubBytes:</b><br>"  + stateToTable(state) + "<br>";
    addRoundKey(state, keys[0]);
    outHtml += "<b>Plaintext State:</b><br>" + stateToTable(state) + "<br>";

    return outHtml;
}



function decryptAES_ECB(){

    let hexInput = prompt("Enter Ciphertext (hex, space-separated blocks) for ECB:");
    if(!hexInput) return;

    let key = document.getElementById("key").value;
    if(key.length != 16){ alert("Key must be 16 chars"); return; }

    let keys = keyExpansion([...key].map(c=>c.charCodeAt(0)));
    let blocks = hexInput.trim().split(/\s+/g).map(b => parseInt(b,16));

    let outHtml = "";
    let decrypted = "";

    for(let i=0;i<blocks.length;i+=16){
        let state = blocks.slice(i,i+16);
        outHtml = decryptBlock(state, keys, outHtml);   
        decrypted += String.fromCharCode(...state);
    }

    decrypted = pkcs7Unpad(decrypted);
    outHtml += "<b>Decrypted Plaintext:</b><br>"+decrypted;
    document.getElementById("out").innerHTML = outHtml;
}


function decryptAES_CBC(){

    let hexInput = prompt("Enter Ciphertext (hex, space-separated blocks) for CBC:");
    if(!hexInput) return;

    let key = document.getElementById("key").value;
    let iv  = document.getElementById("iv").value;
    if(key.length!=16 || iv.length!=16){ alert("Key and IV must be 16 chars"); return; }

    let keys = keyExpansion([...key].map(c=>c.charCodeAt(0)));
    let blocks = hexInput.trim().split(/\s+/g).map(b => parseInt(b,16));

    let outHtml = "";
    let decrypted = "";
    let prevIV = [...iv].map(c=>c.charCodeAt(0));

    for(let i=0;i<blocks.length;i+=16){
        let state = blocks.slice(i,i+16);
        let tmp = state.slice();

        outHtml = decryptBlock(state, keys, outHtml);   

        for(let j=0;j<16;j++) state[j] ^= prevIV[j];
        prevIV = tmp.slice();

        decrypted += String.fromCharCode(...state);
    }

    decrypted = pkcs7Unpad(decrypted);
    outHtml += "<b>Decrypted Plaintext:</b><br>"+decrypted;
    document.getElementById("out").innerHTML = outHtml;
}
