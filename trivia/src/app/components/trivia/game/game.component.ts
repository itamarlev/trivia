import {Component, Input, OnInit} from '@angular/core';
import {StateService, Question, State} from '../../../services/state.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  questionId = 0;
  score = 0;

  constructor(private stateService: StateService, private route: Router, private location: Location) {
    this._STATE = stateService.getState();
  }

  _STATE: State;

  get STATE(): State {
    return this._STATE;
  }

  get answers(): string[] {
    return this._question.a;
  }

  // tslint:disable-next-line:variable-name
  _question: Question;

  get question() {
    return this._question.q;
  }

  getAnswers() {
    return this._question.a;
  }


  ngOnInit(): void {
    this.initQuestion();
  }

  private initQuestion(): boolean {
    if(this.STATE.questions.length > this.questionId) {
      this._question = this.STATE.questions[this.questionId] as Question;
      return true;
    }
    return false;
  }

  processAnswer(answer: string) {
    this.stateService.addResult(this.answers.indexOf(answer) + 1);
    this.questionId++;
    if (this._question.c === this.answers.indexOf(answer) + 1) {
      this.score++;
      this.stateService.setScore(this.score);
    }
    this.initQuestion() ? this.route.navigate([this.location.path()]) :
                          this.route.navigate(['/results']);
  }

  getScore(): number {
    return this.score;
  }
}
