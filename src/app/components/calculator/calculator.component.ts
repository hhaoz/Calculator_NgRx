import { Component } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { State } from '../../reducers';
import * as CalculatorActions from '../../actions/calculator.action';
import { selectCurrentNumber } from '../../selectors/calculator.selector';
import {operate} from "rxjs/internal/util/lift";

@Component({
  selector: 'app-calculator',
  standalone: true,
    imports: [
        AsyncPipe,
        CommonModule
    ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  currentNumber$: Observable<string>;

  constructor(private store: Store<State>) {
    this.currentNumber$ = store.select(selectCurrentNumber);
  }

  addNumber(number: string) {
    this.store.dispatch(CalculatorActions.addNumber({ number }));
  }

  clear() {
    this.store.dispatch(CalculatorActions.clear());
  }

  // clear one number
  clearOne() {
    this.store.dispatch(CalculatorActions.clearOne());
  }

  add() {
    this.store.dispatch(CalculatorActions.add());
  }

  subtract() {
    this.store.dispatch(CalculatorActions.subtract());
  }

  multiply() {
    this.store.dispatch(CalculatorActions.multiply());
  }

  divide() {
    this.store.dispatch(CalculatorActions.divide());
  }

  percent() {
    this.store.dispatch(CalculatorActions.percent());
  }

  calculate() {
    this.store.dispatch(CalculatorActions.calculate());
  }

  protected readonly operate = operate;
}
