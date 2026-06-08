const fs = require('fs');
const path = require('path');

// Setup DOM environment
beforeAll(() => {
  // Mock window.addEventListener to capture DOMContentLoaded handler
  let domReadyHandler;
  const originalAddEventListener = window.addEventListener;
  window.addEventListener = (event, handler) => {
    if (event === 'DOMContentLoaded') {
      domReadyHandler = handler;
    } else {
      originalAddEventListener.call(window, event, handler);
    }
  };

  // Create minimal HTML structure required by Calculator
  document.body.innerHTML = `
    <div id="input-display"></div>
    <div id="result-display"></div>
    <button class="btn" data-value="1">1</button>
    <button class="btn" data-value="2">2</button>
    <button class="btn" data-value="+">+</button>
    <button class="btn" data-value="-">-</button>
    <button class="btn" data-value="*">*</button>
    <button class="btn" data-value="/">/</button>
    <button id="clear">C</button>
    <button id="equals">=</button>
  `;

  // Require the source file (this will register the DOMContentLoaded listener)
  require('./app.js');

  // Simulate DOMContentLoaded to trigger Calculator initialization
  if (domReadyHandler) {
    domReadyHandler();
  }

  // Restore original addEventListener after capture
  window.addEventListener = originalAddEventListener;
});

// Helper to simulate button click by data-value
function clickButton(value) {
  const button = document.querySelector(`.btn[data-value="${value}"]`);
  if (button) button.click();
}

// Helper to click clear / equals
function clickClear() {
  document.getElementById('clear').click();
}

function clickEquals() {
  document.getElementById('equals').click();
}

beforeEach(() => {
  // Reset state before each test via clear button
  clickClear();
});

test('should append value and update input display on button click', () => {
  clickButton('1');
  expect(document.getElementById('input-display').textContent).toBe('1');

  clickButton('+');
  expect(document.getElementById('input-display').textContent).toBe('1+');

  clickButton('2');
  expect(document.getElementById('input-display').textContent).toBe('1+2');
});

test('should show "Enter expression" when input is empty', () => {
  expect(document.getElementById('input-display').textContent).toBe('Enter expression');
  // After appending something, then clearing, should show again
  clickButton('5');
  clickClear();
  expect(document.getElementById('input-display').textContent).toBe('Enter expression');
});

test('should evaluate expression and show result', () => {
  clickButton('1');
  clickButton('+');
  clickButton('2');
  clickEquals();
  expect(document.getElementById('result-display').textContent).toBe('3');
  // Input display should still show expression
  expect(document.getElementById('input-display').textContent).toBe('1+2');
});

test('should show "Error" on invalid expression', () => {
  clickButton('1');
  clickButton('/');
  clickButton('0'); // division by zero returns Infinity, not error; let's use incomplete expression
  clickClear();

  // Incomplete expression
  clickButton('5');
  clickButton('+');
  clickEquals();
  expect(document.getElementById('result-display').textContent).toBe('Error');
  expect(document.getElementById('input-display').textContent).toBe('5+');
});

test('should clear input and result', () => {
  clickButton('9');
  clickButton('-');
  clickButton('3');
  clickClear();
  expect(document.getElementById('input-display').textContent).toBe('Enter expression');
  expect(document.getElementById('result-display').textContent).toBe('0');
});