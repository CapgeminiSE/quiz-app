import {Component} from 'angular2/core';
import {NgClass} from 'angular2/common'
import {Authentication} from '../services/auth.service';

@Component({
  selector: 'form-login',
  directives: [NgClass],
  template: `
    <form class="ui form">
      <div class="field">
        <input #input type="text" class=""/>
      </div>
      <button type="button"
        class="ui primary button"
        [ngClass]="{loading: busy}"
        (click)="onSubmit(input.value)">Login</button>
    </form>
  `
})

export class LoginComponent {
  busy: boolean

  constructor(public loginService: Authentication) {
    this.busy = false
  }

  onSubmit(password) {
    this.busy = true;
    this.loginService.login(password, ok => {
      console.log('logged in %s', ok)
      this.busy = false;
    })
  }

}
