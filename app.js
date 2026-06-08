class Calculator {
  constructor() {
    this.input = '';
    this.result = 0;
    this.inputDisplay = document.getElementById('input-display');
    this.resultDisplay = document.getElementById('result-display');
    this.init();
  }

  init() {
    document.querySelectorAll('.btn:not(#clear):not(#equals)').forEach(btn => {
      btn.addEventListener('click', () => this.appendValue(btn.dataset.value));
    });
    document.getElementById('clear').addEventListener('click', () => this.clear());
    document.getElementById('equals').addEventListener('click', () => this.evaluate());
  }

  appendValue(value) {
    this.input += value;
    this.updateDisplay();
  }

  clear() {
    this.input = '';
    this.result = 0;
    this.updateDisplay();
  }

  evaluate() {
    const trimmedInput = this.input.trim();
    if (!trimmedInput) {
      this.result = 0;
      this.updateDisplay();
      return;
    }
    try {
      // Use math.js for reliable evaluation with operator precedence
      this.result = math.evaluate(trimmedInput);
    } catch (e) {
      this.result = 'Invalid expression';
    }
    this.updateDisplay();
  }

  updateDisplay() {
    this.inputDisplay.textContent = this.input || 'Enter expression';
    this.resultDisplay.textContent = this.result;
  }
}

window.addEventListener('DOMContentLoaded', () => new Calculator());
