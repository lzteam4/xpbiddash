//https://developers.google.com/instance-id/reference/server#create_relationship_maps_for_app_instances

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCloudMessagingService {

  baseUrl = "https://iid.googleapis.com/iid/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAALCpSHPQ:APA91bFkLW2CRQgjyUzdrHViXQL8ebrjhCyqKDLa7XQ85OMfndWWKK1XBtFfWi7lU0TGeONiG21QWYimDM3uALiFe0c8cVJSkwPMxWKZs2Irc4zxpvW8kQLwomTJskOyFrgZfS7ehXNx'
    })
  };

  constructor(private http: HttpClient,
    private userService: UserService, 
    private angularFireMessaging: AngularFireMessaging) { 

    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    );

  }

  getAppInstanceTopics(token: string) {
    return this.http.get(this.baseUrl + "info/" + token + "?details=true", this.httpOptions).pipe(
      map(response => {
        if (response.hasOwnProperty("rel")) {
          return Object.keys(response["rel"]["topics"]);
        }
        return [];
      }
      ));
  }

  getAppInstanceInformation(token: string) {
    return this.http.get(this.baseUrl + "info/" + token + "?details=true", this.httpOptions).pipe();
  }

  registerTokenToTopic(token: string, topicName: string) {
    return this.http.post(this.baseUrl + "v1/" + token + "/rel/topics/" + topicName, {}, this.httpOptions)
      .pipe();
  }

  registerTokensToTopic(tokens: string[], topicName: string) {
    return this.http.post(this.baseUrl + "v1:batchAdd", {
      to: "/topics/" + topicName,
      registration_tokens: tokens,
    }, this.httpOptions).pipe();
  }

  unRegisterTokenToTopic(token: string, topicName: string) {
    return this.http.post(this.baseUrl + "v1:batchRemove", {
      to: "/topics/" + topicName,
      registration_tokens: [token],
    }, this.httpOptions).pipe();
  }

  unRegisterTokensToTopic(tokens: string[], topicName: string) {
    return this.http.post(this.baseUrl + "v1:batchRemove", {
      to: "/topics/" + topicName,
      registration_tokens: tokens,
    }, this.httpOptions).pipe();
  }


  updateToken(token) {
    this.userService.updateToken(token).subscribe(userId => {
      console.log(userId);
    });
    console.log(token);
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.updateToken(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  getToken() {
    return this.angularFireMessaging.getToken.subscribe(
      (token) => {
        this.updateToken(token);
      },
      (err) => {
        console.error('Unable to get token.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
   return this.angularFireMessaging.messages.pipe();
  }
}
