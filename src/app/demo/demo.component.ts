import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnInit {

  // posts: Post[];
  posts$ = this.postService.postsWithComments$
  // currentUser: string;
  currentUser$ = this.userService.currentUser;
  username: string;
  
  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    // this.getPosts();
    // this.posts$.subscribe(console.log)
    // this.userService.currentUser.subscribe(user => this.currentUser = user)
  }

  // async getPosts() {
  //   const posts = await this.postService.getAll();
  //   this.posts = posts;
  // }

  setUsername() {
    this.userService.setCurrentUser(this.username);
    this.username = "";
  }

  clearUser(){
    this.userService.clearUser();
  }
}
