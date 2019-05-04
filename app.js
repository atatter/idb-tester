import PromisedDatabaseController from './controllers/PromisedDatabaseController.js';
import DatabaseController from './controllers/DatabaseController.js';
import { getMultiple, promiseTimeWrapper } from './helpers.js';

const dataLength = 1000;
const data = getMultiple(dataLength);

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
