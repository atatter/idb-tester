const EXAMPLE = {
    name: 'Napoleon',
    price: 12.49,
    description: 'What a cake!',
};

const MAX_COUNT = 10000000;

export function getMultiple(count) {
    const arr = new Array(count < MAX_COUNT ? count : MAX_COUNT);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = EXAMPLE;
    }
    return arr;
};

export async function promiseTimeWrapper(promise, text) {
    const startTime = new Date();
    await promise;
    const endTime = new Date();
    console.log(text, endTime.valueOf() - startTime.valueOf())
};
