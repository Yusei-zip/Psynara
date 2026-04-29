import { testRegistry, getTestById } from './index.js';
import { TestEngine } from './test-engine.js';
import { TestRender } from './test-render.js';

export class TestFlow {
    constructor(rootId) {
        this.engine = new TestEngine();
        this.render = new TestRender(rootId);
    }

    init() {
        this.showList();
    }

    showList() {
        this.render.renderList(testRegistry, (testId) => this.startTest(testId));
    }

    startTest(testId) {
        const test = getTestById(testId);
        if (test) {
            this.engine.startTest(test);
            this.showCurrentQuestion();
        }
    }

    showCurrentQuestion() {
        const q = this.engine.getCurrentQuestion();
        const progress = this.engine.getProgress();
        const selectedValue = this.engine.getSelectedValueForCurrent();
        
        this.render.renderQuestionView(
            this.engine.currentTest.title,
            q,
            progress,
            selectedValue,
            (value) => this.engine.answerCurrentQuestion(value),
            () => this.handleNext(),
            () => this.showList() // Back goes to list
        );
    }

    handleNext() {
        if (this.engine.nextQuestion()) {
            this.showCurrentQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        const result = this.engine.calculateResult();
        if (result) {
            this.render.renderResult(
                this.engine.currentTest.title,
                result,
                () => this.startTest(this.engine.currentTest.id), // Restart not implemented in UI, but could be
                () => this.showList()
            );
        }
    }
}
