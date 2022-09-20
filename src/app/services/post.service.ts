import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommentService } from './comment.service'
import { combineLatest, map, switchMap, tap, forkJoin, Observable } from 'rxjs'
import { Post } from '../models/Post';
import { AuthorService } from './author.service';
import { Author } from '../models/Author';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient, private commentService: CommentService, private authorService: AuthorService) { }

  posts$ = this.http.get<Post[]>(environment.BASE_URL + '/posts');

  postsWithComments$ = combineLatest(
    this.posts$,
    this.commentService.commentsWithAdd$,
  ).pipe(
    map(([posts, comments]) => 
      posts.map((post: Post) => ({
        ...post,
        comments: comments.filter(comment => comment.postId == post.id),
      } as Post))
    ),
  );

  getPostsByAuthorId(authorId: number) : Observable<Post[]> {
    return this.http.get<Post[]>(environment.BASE_URL + `/posts?authorId=${authorId}`)
  }
  
  getAll() : Observable<Post[]>{
    return this.posts$;
  }

  // async getPostsByAuthorId(authorId: number) {
  //   const response = await fetch(environment.BASE_URL + `/posts?authorId=${authorId}`);
  //   const data = await response.json();
  //   return data;
  // }
}
