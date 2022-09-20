import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Author } from 'src/app/models/Author';
import { Post } from 'src/app/models/Post';
import { AuthorService } from 'src/app/services/author.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  authorId: number;
  author: Author
  posts: Post[]

  constructor(private activatedRoute: ActivatedRoute, private authorService: AuthorService, private postService: PostService) { 
    this.activatedRoute.params.subscribe(params => {
      this.authorId = params['id'];
    })
  }

  ngOnInit(): void {
    this.getAuthor();
    // this.getPosts();
  }

  getAuthor() {
    (this.authorService.getAuthorById(this.authorId)).subscribe((
      x => this.author = x
    ));
  }

  // async getPosts() {
  //   this.posts = await this.postService.getPostsByAuthorId(this.authorId);
  // }
}
