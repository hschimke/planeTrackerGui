function join(t, a, s) {
    function format(m) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);
    }
    return a.map(format).join(s);
}

export function getProperDateFormatForNow(): string {
    let a = [{ year: 'numeric' }, { month: '2-digit' }, { day: 'numeric' }];
    let s = join(new Date, a, '-');
    return s;
}