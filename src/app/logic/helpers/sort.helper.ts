
let _variable = '';
let _reverse: boolean;

export function swapElement(array, indexA, indexB) {
    const tmp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = tmp;
}

export function customSort<T>(array: T[], variable: string, reverse: boolean = false): T[] {
    _variable = variable;
    _reverse = reverse;

    array.sort(compare);

    return array;
}

function compare(a: any, b: any) {
    if (!a[_variable]) {
        return 0;
    }

    const objectA = a[_variable];
    const objectB = b[_variable];

    let comparison = 0;
    if (objectA > objectB) {
        _reverse ? comparison = -1 : comparison = 1;
    } else if (objectA < objectB) {
        _reverse ? comparison = 1 : comparison = -1;
    }
    return comparison;
}
