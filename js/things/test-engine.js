export class TestEngine {
    constructor() {
        this.currentTest = null;
        this.answers = {}; // questionId -> selected option value
        this.currentQuestionIndex = 0;
    }

    startTest(test) {
        this.currentTest = test;
        this.answers = {};
        this.currentQuestionIndex = 0;
    }

    getCurrentQuestion() {
        if (!this.currentTest) return null;
        return this.currentTest.questions[this.currentQuestionIndex];
    }

    answerCurrentQuestion(value) {
        if (!this.currentTest) return;
        const q = this.getCurrentQuestion();
        this.answers[q.id] = value;
    }

    getSelectedValueForCurrent() {
        if (!this.currentTest) return null;
        const q = this.getCurrentQuestion();
        return this.answers[q.id] !== undefined ? this.answers[q.id] : null;
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.currentTest.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }

    isFinished() {
        if (!this.currentTest) return false;
        // Check if all questions have an answer
        for (const q of this.currentTest.questions) {
            if (this.answers[q.id] === undefined) return false;
        }
        return true;
    }

    calculateResult() {
        if (!this.currentTest || !this.isFinished()) return null;
        
        let totalScore = 0;
        for (const qId in this.answers) {
            totalScore += this.answers[qId];
        }

        const resultData = this.currentTest.evaluate(totalScore);
        
        // Optional: Save to localStorage
        this.saveHistory(this.currentTest.id, resultData);

        return {
            score: totalScore,
            ...resultData
        };
    }

    getProgress() {
        if (!this.currentTest) return 0;
        const total = this.currentTest.questions.length;
        const current = this.currentQuestionIndex + 1; // 1-based for display
        return { current, total, percentage: (current / total) * 100 };
    }

    saveHistory(testId, resultData) {
        try {
            const historyStr = localStorage.getItem('psynara_test_history');
            const history = historyStr ? JSON.parse(historyStr) : {};
            history[testId] = {
                date: new Date().toISOString(),
                result: resultData
            };
            localStorage.setItem('psynara_test_history', JSON.stringify(history));
        } catch (e) {
            console.warn('No se pudo guardar en localStorage', e);
        }
    }
}
