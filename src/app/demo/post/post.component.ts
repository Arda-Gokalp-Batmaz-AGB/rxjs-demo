import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/Comment';
import { Post } from 'src/app/models/Post';
import { AuthorService } from 'src/app/services/author.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {

  constructor(private authorService: AuthorService, private commentService: CommentService, private userService: UserService, private http: HttpClient) {
   }

  @Input() post: Post;
  authorName: string;
  comments$
  commentText: string;
  currentUsername: string;


  ngOnInit(): void {
    this.getAuthor();
    this.getComments();
    // let t = this.comments$.subscribe((x) => console.log(x), console.log("subsriber trigered"));
    // console.log("test")
    this.userService.currentUser.subscribe(user => this.currentUsername = user);
  }

  getAuthor() {
    (this.authorService.getAuthorById(this.post.authorId)).subscribe((
      x => this.authorName  = x.name
    ));
  }

  getComments() {
    this.comments$ = this.commentService.getCommentsByPostId(this.post.id)
  }

  addComment() {
    console.log(this.currentUsername);
    if (!this.commentText) {
      alert('Comment can not be empty!')
      return;
    }

    if (!this.currentUsername) {
      alert('Username can not be empty!')
      return;
    }

    const comment = {
      body: this.commentText,
      username: this.currentUsername,
      postId: this.post.id
    }
    this.commentService.addComment(comment).subscribe(
      () => {
        this.commentText = '';
      }
    );
  }
}
