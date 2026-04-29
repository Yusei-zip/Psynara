import { TestFlow } from './test-flow.js';

document.addEventListener('DOMContentLoaded', () => {
    const testAppRoot = document.getElementById('test-app-root');
    if (testAppRoot) {
        const testFlow = new TestFlow('test-app-root');
        testFlow.init();
    }
});
