/**
 * The full alphabet A-Z, a-z, 0-9 in a contained string
 */
export const fullAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

/**
 * Generates a unsecure hash using Math.Random()  
 * _(DO NOT USE FOR SENSITIVE INFORMATION)_
 * 
 * @param start A starting string value
 * @param alphabet The string to grab random characters from
 * @param amt The amount of letters in the hash
 * 
 * @returns 
 */
export const generateUnsecureHash = (start: string = "", alphabet: string = fullAlphabet, amt: number = 16): string => {
    for (let i = 0; i < amt; i++) start += fullAlphabet[Math.floor(Math.random() * alphabet.length)]
    return start;
}