export async function createKey(secret: string): Promise<CryptoKey> {
    return await crypto.subtle.importKey(
        "raw", 
        new TextEncoder().encode(secret), 
        { name: "HMAC", hash: "SHA-256" },
        false, 
        ["verify"]
    );
}
