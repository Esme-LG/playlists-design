import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, throwError, catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Basic ' + btoa(environment.client_id + ':' + environment.client_secret),
  })
};

@Injectable({
  providedIn: 'root'
})
export class SpotifyAccountService {
  redirect_uri = 'http://localhost:4200/callback';
  state =  Math.random().toString(8).substring(2, 15) + Math.random().toString(8).substring(2, 15);
  scope = `
    ugc-image-upload
    user-read-playback-state
    user-modify-playback-state
    user-read-currently-playing
    playlist-read-private
    playlist-read-collaborative
    playlist-modify-private
    playlist-modify-public
    user-follow-modify
    user-top-read
    user-read-recently-played
    user-library-modify
    user-library-read
    user-read-email
    user-read-private`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAuthorizePage(): string{
    let params = new HttpParams();
    let options: { [ key:string ]: string } = {
      response_type:'code',
      client_id: environment.client_id,
      scope: this.scope,
      redirect_uri: this.redirect_uri,
      state: this.state
    }

    for (let key in options)
      params = params.set(key, options[key]);

      localStorage.setItem('state', this.state); // Save the state, it will be used later

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  requestAccessToken(code: string): Observable<any>{
    let params = new HttpParams();
    const options: { [ key:string ]: string } = {
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.redirect_uri,
    };

    for (let key in options)
      params = params.set(key, options[key]);

    return this.http.post(`https://accounts.spotify.com/api/token`, params, httpOptions);
  }

}
