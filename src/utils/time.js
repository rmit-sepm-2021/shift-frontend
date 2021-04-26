export function getTimeOptions() {
    const opts = []
    for (let i = 0; i < 24; i++) {
        if (i < 10) {
            opts.push(`0${i}:00`)
            opts.push(`0${i}:30`)
        } else {
            opts.push(`${i}:00`)
            opts.push(`${i}:30`)
        }
    }
    return opts
}