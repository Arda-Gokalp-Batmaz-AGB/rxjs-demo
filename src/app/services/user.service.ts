import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser = this.currentUserSource.asObservable();

  constructor() { }

  setCurrentUser(username: string) {
    localStorage.setItem('user', username);
    this.currentUserSource.next(username);
  }

  clearUser() {
    localStorage.clear();
    this.currentUserSource.next(null);
  }
}
