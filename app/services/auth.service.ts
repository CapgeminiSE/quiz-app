import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class Authentication {
  token: string;
  _observable: any;

  constructor(@Inject(Http) public http: Http) {
    this.http = http;
    this.token = localStorage.getItem('token');
  }

  login(password: String, callback: Function) {
    return this.http.post('/login', JSON.stringify({
      password: password
      }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .map(res => res.json())
      .subscribe(
        data => {
          if (data.accepted) {
            this.token = data.token
          } else {
            this.token = null
          }
          callback(!!this.token)
        },
        err => console.log(err)
      );

      /*
      .subscribe((res : any) => {
        console.log(res);
        let data = res.json();
        if (data.ok) {
          this.token = data.token;
          localStorage.setItem('token', this.token);
          return Observable.of('token');
        } else {
          return Observable.throw('auth failure');
        }
      });
      */
  }

  /*
  logout() {
     * If we had a lgout api, we would have done something like this

    return this.http.get(this.config.serverUrl + '/auth/logout', {
      headers: new Headers({
        'x-security-token': this.token
      })
    })
    .map((res : any) => {
      this.token = undefined;
      localStorage.removeItem('token');
    });

    this.token = undefined;
    localStorage.removeItem('token');

    return Observable.of(true);
  }
  */
}
