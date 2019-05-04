import PromisedDatabaseController from './controllers/PromisedDatabaseController.js';
import DatabaseController from './controllers/DatabaseController.js';

const exampleObject = {
    name: 'Napoleon',
    price: 12.49,
    description: 'What a cake!',
};

const MAX_COUNT = 10000000;

function generateData(count) {
    const arr = new Array(count < MAX_COUNT ? count : MAX_COUNT);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = exampleObject;
    }
    return arr;
}

const dataLength = 1000;
const data = generateData(dataLength);

async function promiseTimeWrapper(promise, text) {
    const startTime = new Date();
    await promise;
    const endTime = new Date();
    console.log(text, endTime.valueOf() - startTime.valueOf())
}

const promisedDatabaseController = new PromisedDatabaseController();
const databaseController = new DatabaseController();

async function runApp() {
    console.log(`Going to handle ${dataLength} lines of data`)

    // Very slow - commented out
    /* await promiseTimeWrapper(Promise.all(data.map(x => databaseController.addOne(x))), 'iDB Slow: time in MS: ');
    await databaseController.clearAll(); */

    await promiseTimeWrapper(databaseController.addMultiple(data), 'iDB: time in MS: ');
    await databaseController.clearAll();

    await promiseTimeWrapper(databaseController.addMultipleFast(data), 'iDB Fast: time in MS: ');
    await databaseController.clearAll();

    // Very slow - commented out
    /* await promiseTimeWrapper(Promise.all(data.map(x => promisedDatabaseController.addOne(x))), 'Promised iDB Slow: time in MS: ');
    await promisedDatabaseController.clearAll(); */

    await promiseTimeWrapper(promisedDatabaseController.addMultiple(data), 'Promised iDB Fast: time in MS: ');
    await promisedDatabaseController.clearAll();
}

runApp();
