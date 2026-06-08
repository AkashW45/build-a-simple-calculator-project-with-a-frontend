const Calculator = require('./app');

describe('Calculator', () => {
  let calculator;
  let inputDisplay;
  let resultDisplay;

  beforeEach(() => {
    // Mock DOM elements
    inputDisplay = { textContent: '' };
    resultDisplay = { textContent: '' };
    const buttonMock = { addEventListener: jest.fn() };
    document.getElementById = jest.fn((id) => {
      if (id === 'input-display') return inputDisplay;
      if (id === 'result-display') return resultDisplay;
      if (id === 'clear') return buttonMock;
      if (id === 'equals') return buttonMock;
      return null;
    });
    document.querySelectorAll = jest.fn(() => []);
    calculator = new Calculator();
  });

  test('should evaluate expression with parentheses and precedence', () => {
    calculator.input = '(1+2)*(3+4)';
    calculator.evaluate();
    expect(calculator.result).toBe(21);
    expect(resultDisplay.textContent).toBe(21);
    expect(inputDisplay.textContent).toBe('(1+2)*(3+4)');
  });

  test('should evaluate exponentiation correctly', () => {
    calculator.input = '2^3';
    calculator.evaluate();
    expect(calculator.result).toBe(8);
    expect(resultDisplay.textContent).toBe(8);

    calculator.input = '2^3^2';
    calculator.evaluate();
    expect(calculator.result).toBe(512);
  });

  test('should handle unary minus', () => {
    calculator.input = '-5+3';
    calculator.evaluate();
    expect(calculator.result).toBe(-2);

    calculator.input = '3*-2';
    calculator.evaluate();
    expect(calculator.result).toBe(-6);
  });

  test('should return error for empty expression', () => {
    calculator.input = '';
    calculator.evaluate();
    expect(calculator.result).toBe('Error');
    expect(inputDisplay.textContent).toBe('Enter expression');
    expect(resultDisplay.textContent).toBe('Error');
  });

  test('should return error for division by zero', () => {
    calculator.input = '10/0';
    calculator.evaluate();
    expect(calculator.result).toBe('Error');
    expect(resultDisplay.textContent).toBe('Error');
  });

  test('should return error for missing closing parenthesis', () => {
    calculator.input = '2*(3+4';
    calculator.evaluate();
    expect(calculator.result).toBe('Error');
    expect(resultDisplay.textContent).toBe('Error');
  });
});