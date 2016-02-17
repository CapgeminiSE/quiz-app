import {Component} from 'angular2/core';
import {LoginComponent} from './components/login-form.component';

@Component({
    selector: 'quiz-app',
    directives: [LoginComponent],
    template: `
    <h1 align="center">Capgemini QuizApp</h1>
    <form-login></form-login>
    `
})

export class AppComponent { }
