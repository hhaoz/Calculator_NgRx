import { Action, createReducer, on} from '@ngrx/store';
import * as CalculatorActions from '../actions/calculator.action';

export interface CalculatorState {
  currentNumber: string;
  firstOperand: number | null;
  operator: string | null;
  waitForSecondNumber: boolean;
}

export const initialState: CalculatorState = {
  currentNumber: '0',
  firstOperand: null,
  operator: null,
  waitForSecondNumber: false,
};

const _calculatorReducer = createReducer(
  initialState,

  // Handle adding numbers
  on(CalculatorActions.addNumber, (state, {number}) => ({
    ...state,
    currentNumber: state.waitForSecondNumber ? number : (state.currentNumber === '0' ? number : state.currentNumber + number),
    waitForSecondNumber: false,
  })),

  // Handle operations
  on(CalculatorActions.add, (state) => ({
    ...state,
    operator: '+',
    firstOperand: parseFloat(state.currentNumber),
    waitForSecondNumber: true,
  })),
  on(CalculatorActions.subtract, (state) => ({
    ...state,
    operator: '-',
    firstOperand: parseFloat(state.currentNumber),
    waitForSecondNumber: true,
  })),
  on(CalculatorActions.multiply, (state) => ({
    ...state,
    operator: '*',
    firstOperand: parseFloat(state.currentNumber),
    waitForSecondNumber: true,
  })),
  on(CalculatorActions.divide, (state) => ({
    ...state,
    operator: '/',
    firstOperand: parseFloat(state.currentNumber),
    waitForSecondNumber: true,
  })),
  on(CalculatorActions.percent, (state) => ({
    ...state,
    currentNumber: (parseFloat(state.currentNumber) / 100).toString(),
  })),

  // Handle the calculation
  on(CalculatorActions.calculate, (state) => {
    if (state.firstOperand !== null && state.operator) {
      const secondOperand = parseFloat(state.currentNumber);
      let result: number;

      switch (state.operator) {
        case '+':
          result = state.firstOperand + secondOperand;
          break;
        case '-':
          result = state.firstOperand - secondOperand;
          break;
        case '*':
          result = state.firstOperand * secondOperand;
          break;
        case '/':
          result = state.firstOperand / secondOperand;
          break;
        default:
          return state;
      }

      return {
        ...state,
        currentNumber: result.toString(),
        firstOperand: null,
        operator: null,
        waitForSecondNumber: false,
      };
    }
    return state;
  }),

  // Handle clear
  on(CalculatorActions.clear, () => initialState),

  // Handle clear one number
  on(CalculatorActions.clearOne, (state) => ({
    ...state,
    currentNumber: state.currentNumber.length === 1 ? '0' : state.currentNumber.slice(0, -1) || '0',
  }))
);

export function calculatorReducer(state: CalculatorState | undefined, action: Action<string>) {
  return _calculatorReducer(state, action);
}
