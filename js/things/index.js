import { testAnsiedad } from './tests/ansiedad.js';
import { testEstres } from './tests/estres.js';
import { testAutoestima } from './tests/autoestima.js';
import { testDepresion } from './tests/depresion.js';

export const testRegistry = [
    testAnsiedad,
    testEstres,
    testAutoestima,
    testDepresion
];

export function getTestById(id) {
    return testRegistry.find(test => test.id === id);
}
