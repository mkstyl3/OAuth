import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
declare const gapi: any;
declare const require: any;

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.css'],
  providers: [UserService]
})
export class LogRegComponent implements OnInit, AfterViewInit {

  private AVATAR = require('./assets/img/EA.jpg');

  constructor(private userService: UserService) {}
  /*
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '321865737574-u48uoors6jtdi1f81ai5l3k9albqbchm.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      () => {


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }



  ngAfterViewInit(){
    this.googleInit();
  }*/

  googleOAuthInit() {
    gapi.load('auth2', function() {
      this.auth2 = gapi.auth2.init({
        client_id: '321865737574-u48uoors6jtdi1f81ai5l3k9albqbchm.apps.googleusercontent.com',
        // Scopes to request in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.auth2.grantOfflineAccess().then(this.userService.googleSignInCallback$);
    });
    this.userService.googleOAuthInitService$();
  }

  hello() {
    this.userService.helloService$().subscribe(
      (data) => console.log(data));
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    gapi.load('auth2', function() {
      gapi.auth2.init({
        client_id: '321865737574-u48uoors6jtdi1f81ai5l3k9albqbchm.apps.googleusercontent.com',
        redirect_uri: 'postmessage'
      });
    });
  }

  async hello2() {
    const authResult = await gapi.auth2.getAuthInstance().grantOfflineAccess();
    this.userService.googleSignInCallback$(authResult).subscribe(
      (data) => console.log(data));
  }



}
