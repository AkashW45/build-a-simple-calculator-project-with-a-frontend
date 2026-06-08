describe('Calculator', () => {
  let calculator;
  let inputDisplay, resultDisplay;

  beforeAll(() => {
    // Prevent DOMContentLoaded from creating an unintended instance
    global.window.addEventListener = jest.fn();
    global.math = {
      evaluate: jest.fn()
    };
    // Provide minimal DOM mocks so the constructor can run without crashing
    document.getElementById = jest.fn();
    document.querySelectorAll = jest.fn().mockReturnValue([]);
    // Load the subject under test - Calculator is defined globally
    require('./app');
  });

  beforeEach(() => {
    // Fresh display elements for each test
    inputDisplay = { textContent: '' };
    resultDisplay = { textContent: '' };
    document.getElementById = jest.fn((id) => {
      if (id === 'input-display') return inputDisplay;
      if (id === 'result-display') return resultDisplay;
      return null;
    });
    document.querySelectorAll = jest.fn().mockReturnValue([]);
    calculator = new Calculator();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should evaluate a valid expression and update displays', () => {
    calculator.input = '2+3';
    math.evaluate.mockReturnValue(5);
    calculator.evaluate();
    expect(math.evaluate).toHaveBeenCalledWith('2+3');
    expect(calculator.result).toBe(5);
    expect(inputDisplay.textContent).toBe('2+3');
    expect(resultDisplay.textContent).toBe(5);
  });

  it('should handle empty input and reset result to 0', () => {
    calculator.input = '';
    calculator.evaluate();
    expect(math.evaluate).not.toHaveBeenCalled();
    expect(calculator.result).toBe(0);
    expect(resultDisplay.textContent).toBe(0);
    expect(inputDisplay.textContent).toBe('Enter expression');
  });

  it('should handle invalid expression and set result to "Invalid expression"', () => {
    calculator.input = '2++3';
    math.evaluate.mockImplementation(() => { throw new Error('parse error'); });
    calculator.evaluate();
    expect(math.evaluate).toHaveBeenCalledWith('2++3');
    expect(calculator.result).toBe('Invalid expression');
    expect(resultDisplay.textContent).toBe('Invalid expression');
  });

  it('should clear input and result when clear is called', () => {
    calculator.input = '42';
    calculator.result = 42;
    calculator.clear();
    expect(calculator.input).toBe('');
    expect(calculator.result).toBe(0);
    expect(inputDisplay.textContent).toBe('Enter expression');
    expect(resultDisplay.textContent).toBe(0);
  });

  it('should trim whitespace from input before evaluation', () => {
    calculator.input = '  4 + 5  ';
    math.evaluate.mockReturnValue(9);
    calculator.evaluate();
    expect(math.evaluate).toHaveBeenCalledWith('4 + 5');
    expect(calculator.result).toBe(9);
    expect(inputDisplay.textContent).toBe('  4 + 5  ');
    expect(resultDisplay.textContent).toBe(9);
  });

  it('should update display with default text when input is empty (updateDisplay called directly)', () => {
    calculator.input = '';
    calculator.result = 0;
    calculator.updateDisplay();
    expect(inputDisplay.textContent).toBe('Enter expression');
    expect(resultDisplay.textContent).toBe(0);
  });
});