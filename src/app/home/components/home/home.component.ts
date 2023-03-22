import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyAccountService } from 'src/app/shared/services/spotify-account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  code!: string;

  constructor(private route: ActivatedRoute, private spotifyAccountService: SpotifyAccountService) {

  }

  ngOnInit(): void {
    const state = this.route.snapshot.queryParams['state'];
    let savedState = localStorage.getItem('state');

    this.code = this.route.snapshot.queryParams['code'];

    if (state === savedState && this.code)
      this.requestAccessToken();
  }

  requestAccessToken () {
    this.spotifyAccountService.requestAccessToken(this.code).subscribe(
      results => console.log(results)
    );
  }

}
