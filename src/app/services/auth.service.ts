import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  privateKey: any;
  username: any;

  constructor(private http: Http) {

      }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/login', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    this.loadUsername();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/user/profile/' +this.username, {headers: headers})
      .map(res => res.json());
  }

  sendToken(transaction) {
    let headers = new Headers();
    this.loadKey();
    this.loadUsername();
    const tsx = {
      sender: this.username,
      privateKey: this.privateKey,
      receiver: transaction.receiver,
      amount: transaction.amount + ' IGT'
    }
    console.log(tsx);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/transaction/send', tsx, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user, username, privateKey) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('privateKey', privateKey);
    this.authToken = token;
    this.user = user;
    this.privateKey = privateKey;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loadKey() {
    const privatekey = localStorage.getItem('privateKey');
    this.privateKey = privatekey;
  }
  loadUsername(){
    const username = localStorage.getItem('username');
    this.username = username;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
