"use strict";

(function () {

    window.Trivia = window.Trivia || function Trivia(options) {

        const STATE = Object.assign({
            selector: '.app',
            title: 'Trivia',
            questions: [
                {q: 'Who broke the matrix?', a: ['Shaul', 'David', 'Shlomo', 'Neo'], c: 4},
                {q: 'Who ate all the jam?', a: ['Sarah', 'Rachel', 'Rivka', 'Zehava'], c: 4},
                {q: 'What has a tire and can\'t roll?', a: ['Car', 'Bus', 'Bike', 'A fat guy'], c: 4},
                {q: 'Why?', a: ['This is not a question', 'Don\'t know', 'a,b', 'Because i felt like it'], c: 4}
            ],
            neededForWin: 2,
        }, options, {
            results: []
        });


        const OPENING_VIEW = `<div class="wrapper wrapper-start">
                                <p class="title">Trivia</p>
                                <button>START</button>
                              </div>`;
        const GAME_VIEW = `<div class="wrapper wrapper-game">
                                <p class="question"></p>
                                <ul class="answers"></ul>
                                <span class="score"></span>
                            </div>`;
        const RESULTS_VIEW = `<div class="wrapper wrapper-results">
                                <p class="results"></p>
                                <p class="score"></p>
                                <div class="button-row">
                                    <button class="btn-restart">Restart</button>
                                    <button class="btn-end">End</button>
                                </div>
                              </div>`;


        function getCurrentScore() {
            return STATE.results.length === 0 ?
                0 :
                ((r, q) => {
                    let n = 0;
                    r.forEach((a, i) => {
                        if (a === q[i].c) n++;
                    });
                    return n;
                })(STATE.results, STATE.questions);
        }

        /**
         * @param {Element} element
         */
        function displayResults(element) {
            element.innerHTML = '';
            element.insertAdjacentHTML('afterbegin', RESULTS_VIEW);

            const score = getCurrentScore();

            let message, cssClass;
            if (score >= STATE.neededForWin) {
                message = `You are a winner !!!<br/>Your amazing score is :`;
                cssClass = 'winner';
            } else {
                message = `You are a loser !!!<br/>Your lame score is :`;
                cssClass = 'loser';
            }
            const resultsElement = element.querySelector('.results');
            resultsElement.innerHTML = message;
            resultsElement.classList.add(cssClass);

            const scoreElement = element.querySelector('.score');
            scoreElement.innerHTML = "" + score;
            scoreElement.classList.add(cssClass);

            element.querySelector('.btn-restart').addEventListener('click', () => drawGameView(element, 0));
            element.querySelector('.btn-end').addEventListener('click', () => drawOpeningScreen(element));

            STATE.results = [];


        }

        /**
         * @param {Element} element
         * @param {number} questionId
         */
        function drawGameView(element, questionId) {
            const question = STATE.questions[questionId];
            element.innerHTML = '';
            element.insertAdjacentHTML('afterbegin', GAME_VIEW);
            element.querySelector('.question').innerHTML = `(${questionId + 1}/${STATE.questions.length}) ${question.q}`;
            element.querySelector('.answers').insertAdjacentHTML('afterbegin', question.a.map(a => `<li>${a}</li>`).join(''));
            element.querySelectorAll('.answers li').forEach((li, i) => {
                li.addEventListener('click', () => {
                    STATE.results.push(i + 1);
                    if (STATE.questions[questionId + 1]) {
                        drawGameView(element, questionId + 1);
                    } else {
                        displayResults(element);
                    }
                })
            });
            element.querySelector('.score').innerHTML = `Score : ${getCurrentScore()}`;
        }

        /**
         * @param {Element} element
         */
        function drawOpeningScreen(element) {
            if (!element.classList.contains('trivia')) {
                element.classList.add('trivia');
            }
            element.innerHTML = '';
            element.insertAdjacentHTML('afterbegin', OPENING_VIEW);

            element.querySelector('.title').innerText = STATE.title;
            element.querySelector('button')
                .addEventListener('click', () => drawGameView(element, 0));
        }


        document.querySelectorAll(STATE.selector)
            .forEach(element => drawOpeningScreen(element));

    }

})();
