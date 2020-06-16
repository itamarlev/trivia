import {Injectable} from '@angular/core';

export interface State {
  selector: string;
  title: string;
  questions: {}[];
  neededForWin: number;
  results: number[];
  score: number;
  extraConfigurations: {};
}

export interface Question {
  q: string;
  a: string[];
  c: number;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  STATE;
  DEFAULTS: State = {
    selector: '.app',
    title: 'Trivia',
    questions: [
      {q: 'Who broke the matrix?', a: ['Shaul', 'David', 'Shlomo', 'Neo'], c: 4},
      {q: 'Who ate all the jam?', a: ['Sarah', 'Rachel', 'Rivka', 'Zehava'], c: 4},
      {q: 'What has a tire and can\'t roll?', a: ['Car', 'Bus', 'Bike', 'A fat guy'], c: 4},
      {q: 'Why?', a: ['This is not a question', 'Don\'t know', 'a,b', 'Because i felt like it'], c: 4}
    ],
    neededForWin: 2,
    results: [],
    score: 0,
    extraConfigurations: {}
  };

  constructor() {
  }

  getState() {
    return this.STATE;
  }

  initState(options?) {
    this.STATE = Object.assign(this.DEFAULTS, options, {results: [], score: 0});
    return this.STATE;
  }

  setTitle(title: string) {
    this.STATE.title = title;
  }

  setSelector(selector: string) {
    this.STATE.selector = selector;
  }

  addQuestion(question: Question) {
    this.STATE.questions.push(question);
  }

  setNeedForWin(needForWin: number) {
    this.STATE.neededForWin = needForWin;
  }

  addResult(result: number) {
    this.STATE.results.push(result);
  }

  setScore(score: number) {
    this.STATE.score = score;
  }

  clearResults() {
    this.STATE.results = [];
    this.STATE.score = 0;
  }
}
