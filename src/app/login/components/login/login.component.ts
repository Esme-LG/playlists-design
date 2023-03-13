import { Component, OnInit } from '@angular/core';
import { SpotifyAccountService } from 'src/app/shared/services/spotify-account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit{

  constructor(private spotifyAccountService: SpotifyAccountService) {}

  ngOnInit(): void {
  }

  login() {
    document.location.href = this.spotifyAccountService.getAuthorizePage();
  }
}
