async function generateKeys() {
    const keys = await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
    );
    return keys;
}

async function encryptMessage(publicKey, message) {
    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(message);
    const encryptedMessage = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        encodedMessage
    );
    return encryptedMessage;
}

async function decryptMessage(privateKey, encryptedMessage) {
    const decryptedMessage = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        encryptedMessage
    );
    const decoder = new TextDecoder();
    return decoder.decode(decryptedMessage);
}

// Demonstration
async function demoEncryption() {
    const message = "Hello, EcoLife Solutions!";
    const keys = await generateKeys();
    
    console.log("Original Message:", message);
    
    const encryptedMessage = await encryptMessage(keys.publicKey, message);
    console.log("Encrypted Message (Byte Array):", new Uint8Array(encryptedMessage));

    const decryptedMessage = await decryptMessage(keys.privateKey, encryptedMessage);
    console.log("Decrypted Message:", decryptedMessage);
}

// Run the demo when the page loads
document.addEventListener("DOMContentLoaded", demoEncryption);
