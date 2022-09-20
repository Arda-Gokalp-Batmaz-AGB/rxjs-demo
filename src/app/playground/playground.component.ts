import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, concat, debounceTime, scan, withLatestFrom, distinctUntilChanged, filter, take, from, fromEvent, interval, map, merge, Observable, of, throwError, bufferTime, bufferCount, forkJoin, combineLatest, mergeMap, concatMap, switchMap, Subject, AsyncSubject, BehaviorSubject, ReplaySubject, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {
  myObservable$;
  myPromise;
  mySubscription;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    //OBSERVABLE CREATION
    const fromValues$ = of(1, 2, 3);

    const fromCollections$ = from([1, 2 ,3]);

    const fromPromise$ = from(fetch(environment.BASE_URL + '/posts'));

    const fromEvent$ = fromEvent(document.documentElement, 'mousemove');

    const fromConstructor = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
    })


    fromValues$.subscribe(x => console.log(x));

    fromCollections$.subscribe(console.log);

    fromPromise$.subscribe(async (x) => {
      x = await x.json()
      console.log(x);
    })

    console.log("qwe")
    fromEvent$.subscribe(console.log);


    return;

    //SYNC AND ASYNC OBSERVABLES
    const observableSync$ = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
    });

    // console.log('before subscribing to sync observable');
    // observableSync$.subscribe(console.log)
    // console.log('after subscribing to sync observable');

    const observableAsync$ = new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
      }, 0)
    });

    // console.log('before subscribing to async observable');
    // observableAsync$.subscribe(console.log)
    // console.log('after subscribing to async observable');




    //SUBSCRIPTIONS
    const observable1$ = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(new Error('something went wrong'))
      subscriber.complete();
    })

    // const subscription = observable1$.subscribe({
    //   next: event => console.log(event),
    //   error: error => console.log(error),
    //   complete: () => console.log('complete')
    // })

    // const subscriptionShortHand = observable1$.subscribe(next => console.log(next))





    //SUBSCRIBING MULTIPLE TIMES
    const randomNumber$ = new Observable(subscriber => {
      subscriber.next(Math.random());
    })

    // randomNumber$.subscribe(console.log);
    // randomNumber$.subscribe(console.log);



    //UNSUBSCRIPTION
    const source$ = interval(500);

    // const subscription = source$.subscribe(console.log);

    // setTimeout(() => {
    //   subscription.unsubscribe();
    // }, 5000);


    //PIPE, MAP AND FILTER
    const numbers$ = of(1, 2, 3, 4, 5, 6, 7);

    // console.log('Only Filter');
    // numbers$.pipe(
    //   filter(number => number < 3)
    // ).subscribe(console.log);

    // console.log('Only Map');
    // numbers$.pipe(
    //   map(number => number * 2)
    // ).subscribe(console.log);

    // console.log('Map with Filter');
    // numbers$.pipe(
    //   map(number => number * 2),
    //   filter(number => number > 3)
    // ).subscribe(console.log);



    //COMBINATION OF SOURCES
    // concat(
    //   of(1,2,3).pipe(map(i => 'from first ' + i)),
    //   interval(1000).pipe(map(i => 'from second ' + i))
    // ).subscribe(console.log)

    // merge(
    //   interval(500).pipe(map(i => 'from first ' + i)),
    //   interval(1000).pipe(map(i => 'from second ' + i))
    // ).subscribe(console.log)



    // // THROW ERROR
    // const source = throwError('This is an error');
    // source.pipe(catchError(val => of('Error caught: ' + val))).subscribe(console.log)


    //DEBOUNCE TIME
    // const clicks = fromEvent(document.documentElement, 'click');
    // const result = clicks.pipe(debounceTime(1000));
    // result.subscribe(x => console.log(x));



    //DISTINCTUNTILCHANGED
    const sourceDistinct$ = of(1,1,2,2,3,4,5);

    // sourceDistinct$.pipe(distinctUntilChanged()).subscribe(console.log);


    //TAKE
    const sourceTake$ = of(1,2,3,4,5,6);

    // sourceTake$.pipe(take(1)).subscribe(console.log);



    //BUFFER TIME
    const sourceBufferTime$ = interval(500);

    // sourceBufferTime$.pipe(bufferCount(5)).subscribe(console.log);
    // sourceBufferTime$.pipe(bufferTime(1000)).subscribe(console.log);

    // const forkJoinedObservables$ = forkJoin(
    //   of(1, 2, 3),
    //   of(4, 5, 6)
    // ).subscribe(console.log);

    // const combineLatestObservable$ = combineLatest(
    //   interval(1000).pipe(map(i => `From first ${i}`)),
    //   interval(500).pipe(map(i => `From second ${i}`))
    // ).subscribe(console.log); 

    // const firstSource = interval(5000);
    // const secondSource = interval(1000);
    // const example = firstSource.pipe(
    //   withLatestFrom(secondSource),
    //   map(([first, second]) => {
    //     return `First Source (5s): ${first} Second Source (1s): ${second}`;
    //   })
    // );
    // const subscribe = example.subscribe(val => console.log(val));


    //SCAN OPERATOR

    // const source = of(1, 2, 3);
    // // basic scan example, sum over time starting with zero
    // const example = source.pipe(scan((acc, curr) => acc + curr, 0));
    // // log accumulated values
    // // output: 1,3,6
    // const subscribe = example.subscribe(val => console.log(val));


    //HIGHER ORDER MAPPINGS
    const higherOrderSource$ = of(1,2);

      // higherOrderSource$.pipe(
      //     map(number => this.http.get(environment.BASE_URL + '/posts/' + number))
      //   ).subscribe(data => data.subscribe(console.log));

      // higherOrderSource$.pipe(
      //     mergeMap(number => this.http.get(environment.BASE_URL + '/posts/' + number))
      //   ).subscribe(console.log)
      // higherOrderSource$.pipe(
      //     concatMap(number => this.http.get(environment.BASE_URL + '/posts/' + number))
      //   ).subscribe(console.log)
      // higherOrderSource$.pipe(
      //     switchMap(number => this.http.get(environment.BASE_URL + '/posts/' + number))
      //   ).subscribe(console.log)



    //SUBJECTS
    const observable3$ = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
    });

    // observable3$.subscribe(console.log);

    // const subject$ = new Subject();
    // subject$.next(1);
    // subject$.next(2);
    // subject$.subscribe(console.log);
    // subject$.next(3);
    // subject$.subscribe(console.log)
    // subject$.next(Math.random());



    //ASYNC SUBJECT
    // const asyncSubject$ = new AsyncSubject();
    // asyncSubject$.subscribe(console.log);
    // asyncSubject$.subscribe(console.log);

    // asyncSubject$.next(1);
    // asyncSubject$.next(2);
    // asyncSubject$.next(3);
    // asyncSubject$.next(4);
    // asyncSubject$.next(5);
    // asyncSubject$.complete();



    //BEHAVIOR SUBJECT
    // const behaviorSubject$ = new BehaviorSubject(0);

    // behaviorSubject$.subscribe((val) => console.log(`from first ${val}`))
    
    // behaviorSubject$.next(1);
    // behaviorSubject$.next(2);
    // behaviorSubject$.next(3);
    // behaviorSubject$.next(4);

    // behaviorSubject$.subscribe((val) => console.log(`from second ${val}`))


    //REPLAY SUBJECT
    // const replaySubject$ = new ReplaySubject(1);

    // replaySubject$.next(1);
    // replaySubject$.next(2);
    // replaySubject$.next(3);
    // replaySubject$.next(4);

    // replaySubject$.subscribe(console.log);
   
  }

  
//OBSERVABLE VS PROMISES
create() {
  this.myObservable$ = new Observable(subscriber => {
    console.log('Observable has been created!');
    // subscriber.next('Observable emitted value')
    setInterval(() => {subscriber.next('Observable emitted after a second!')}, 3000)
  });

  this.myPromise = new Promise(resolve => {
    console.log('Promise has been created!');
    resolve('Promise has emitted');
    // setInterval(() => {resolve('Promise emitted after a second!')}, 1000)
  })
}

execute() {
  this.mySubscription = this.myObservable$.subscribe(console.log);

  this.myPromise.then(console.log);
}

cancel() {
  this.mySubscription.unsubscribe();
}

}
