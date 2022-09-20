import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Subject, scan, startWith, BehaviorSubject, tap, shareReplay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private commentInsertedSubject = new Subject<Comment>();
  commentInsertedAction$ = this.commentInsertedSubject.asObservable();
  
  comments$ = this.http.get<Comment[]>(environment.BASE_URL + '/comments');

  commentsWithAdd$ = merge(
    this.comments$,
    this.commentInsertedAction$
  ).pipe(
      scan((acc, value) => 
        (value instanceof Array) ? [...value] : [...acc, value], [] as Comment[]),
        shareReplay(1)
  )

  getCommentsByPostId(postId: number) : Observable<Comment> {
    return this.http.get<Comment>(environment.BASE_URL + `/comments?postId=${postId}`);
  }


  // async getCommentsByPostId(postId: number) {
  //   const response = await fetch(environment.BASE_URL + `/comments?postId=${postId}`);
  //   const data = await response.json();
  //   return data;
  // }a

  addComment(comment: Comment) : Observable<Comment>{
    this.commentInsertedSubject.next(comment);
    return this.http.post<Comment>(environment.BASE_URL + '/comments', comment);
  }
}
