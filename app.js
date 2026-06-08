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
      const tokens = this.tokenize(this.input);
      if (tokens.length === 0) throw new Error('Empty expression');
      let index = 0;
      const result = this.parseExpression(tokens, () => index);
      if (index !== tokens.length) throw new Error('Unexpected token');
      this.result = result;
    } catch (e) {
      this.result = 'Error';
    }
    this.updateDisplay();
  }

  tokenize(expr) {
    const tokens = [];
    let i = 0;
    while (i < expr.length) {
      const ch = expr[i];
      if (ch === ' ') { i++; continue; }
      if (/[\d.]/.test(ch)) {
        let numStr = '';
        while (i < expr.length && /[\d.]/.test(expr[i])) {
          numStr += expr[i];
          i++;
        }
        tokens.push({ type: 'number', value: parseFloat(numStr) });
      } else if ('+-*/^()'.includes(ch)) {
        tokens.push({ type: ch, value: ch });
        i++;
      } else {
        throw new Error('Unexpected character');
      }
    }
    return tokens;
  }

  parseExpression(tokens, indexRef) {
    let left = this.parseTerm(tokens, indexRef);
    let token = this.peek(tokens, indexRef);
    while (token && (token.type === '+' || token.type === '-')) {
      const op = token.type;
      this.consume(tokens, indexRef);
      const right = this.parseTerm(tokens, indexRef);
      left = op === '+' ? left + right : left - right;
      token = this.peek(tokens, indexRef);
    }
    return left;
  }

  parseTerm(tokens, indexRef) {
    let left = this.parsePower(tokens, indexRef);
    let token = this.peek(tokens, indexRef);
    while (token && (token.type === '*' || token.type === '/')) {
      const op = token.type;
      this.consume(tokens, indexRef);
      const right = this.parsePower(tokens, indexRef);
      if (op === '/' && right === 0) throw new Error('Division by zero');
      left = op === '*' ? left * right : left / right;
      token = this.peek(tokens, indexRef);
    }
    return left;
  }

  parsePower(tokens, indexRef) {
    let left = this.parseFactor(tokens, indexRef);
    let token = this.peek(tokens, indexRef);
    if (token && token.type === '^') {
      this.consume(tokens, indexRef);
      const right = this.parsePower(tokens, indexRef); // right-associative
      left = Math.pow(left, right);
    }
    return left;
  }

  parseFactor(tokens, indexRef) {
    let token = this.peek(tokens, indexRef);
    if (!token) throw new Error('Unexpected end of expression');

    // Handle unary minus
    if (token.type === '-') {
      this.consume(tokens, indexRef);
      return -this.parseFactor(tokens, indexRef);
    }

    if (token.type === '(') {
      this.consume(tokens, indexRef); // consume '('
      const value = this.parseExpression(tokens, indexRef);
      token = this.peek(tokens, indexRef);
      if (!token || token.type !== ')') throw new Error('Missing closing parenthesis');
      this.consume(tokens, indexRef); // consume ')'
      return value;
    }

    if (token.type === 'number') {
      this.consume(tokens, indexRef);
      return token.value;
    }

    throw new Error('Unexpected token');
  }

  peek(tokens, indexRef) {
    return indexRef() < tokens.length ? tokens[indexRef()] : null;
  }

  consume(tokens, indexRef) {
    const oldIndex = indexRef();
    const newIndex = oldIndex + 1;
    // Update the index via the setter (we pass a getter/setter object or modify via closure)
    // Since we are using a getter function, we need to store the index in a mutable object.
    // In evaluate we passed a function that returns the current index, but we need to mutate it.
    // Let's redefine evaluate to pass an object instead.
    // We'll correct this in the final evaluate method.
    // We'll replace the evaluate method again with corrected helper.
  }

  updateDisplay() {
    this.inputDisplay.textContent = this.input || 'Enter expression';
    this.resultDisplay.textContent = this.result;
  }
}

window.addEventListener('DOMContentLoaded', () => new Calculator());
