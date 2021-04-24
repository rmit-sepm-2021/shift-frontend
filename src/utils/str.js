export function firstWordUpperCase(str) {
    return str.toLowerCase().replace(/(\s|^)[a-z]/g, function (char) {
        return char.toUpperCase();
    });
}