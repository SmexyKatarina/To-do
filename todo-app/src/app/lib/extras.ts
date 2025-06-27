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

/**
 * Get an ``{}`` containing the css styling for a specific position
 * @param placement A number 0-8 to get a position in reading order, starting at 0 (Top-Left) to 8 (Bottom-Right)
 * @returns 
 */
export const getHTMLPosition = (placement: number = 0): { [paramName: string]: string } => {
    return [
        { top: "0", left: "0"}, { top: "0", left: "50%"}, { top: "0", right: "0" }, 
        { top: "50%", left: "0"}, { top: "50%", left: "50%" }, { top: "50%", right: "0" }, 
        { bottom: "0", left: "0" }, { bottom: "0", left: "50%" }, { bottom: "0", right: "0" }
    ][placement];
}