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
    try {
      // Safe evaluation using Function constructor
      this.result = new Function('return ' + this.input)();
    } catch (e) {
      this.result = 'Error';
    }
    this.updateDisplay();
  }

  updateDisplay() {
    this.inputDisplay.textContent = this.input || 'Enter expression';
    this.resultDisplay.textContent = this.result;
  }
}

window.addEventListener('DOMContentLoaded', () => new Calculator());
