import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rxjs-demo';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const username = localStorage.getItem('user') as string;
    if (username) {
      this.userService.setCurrentUser(username);
    }
  }
}
