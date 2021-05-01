export function firstWordUpperCase(str) {
    return str.toLowerCase().replace(/(\s|^)[a-z]/g, function (char) {
        return char.toUpperCase();
    });
}

export function getNameAbbr(name) {
    if (!name) {
        name = ''
    }
    const arr = name.split(" ");
    let Abbr = '';
    for (const i of arr) {
        Abbr += i[0]
    }
    return Abbr
}
