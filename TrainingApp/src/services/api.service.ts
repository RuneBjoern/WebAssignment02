import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from 'src/app/user'
import { Observable, of } from 'rxjs';
import { retry, catchError} from 'rxjs/operators'; 
import { Workout } from 'src/app/workout';
import { Exercise } from 'src/app/exercise';

// Ref: API calls: https://www.djamware.com/post/5d8d7fc10daa6c77eed3b2f2/angular-8-tutorial-rest-api-and-httpclient-examples

// Change header settings, by adding:
// "httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');"
// befor 'return'-call in CRUD functions.


const localUrl = 'http://localhost:5000';
const workoutsUrl = localUrl + '/workouts';
const exercisesUrl = localUrl + '/exercises';
const userUrl = '/users';
const authUrl = localUrl + userUrl + '/authenticate';
const regUrl = localUrl + userUrl + '/register';

let httpHeader = new HttpHeaders({
  'content':"application/json",
  'content-type':"application/json",
  'Access-Control-Allow-Origin': '*'
})

let httpOptions ={
  headers: httpHeader
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  authUser(user: User): Observable<any>{
    return this.http.post(authUrl, user, httpOptions)
    .pipe(retry(3), catchError(this.handleError<User[]>('authUser', [])));
  }

  registerUser(user: User): Observable<any>{
    console.log(user)
    return this.http.post(regUrl, user, httpOptions)
    .pipe(retry(3), catchError(this.handleError<User[]>('registerUser', [])));
  }

  getWorkout(): Observable<any>{
    return this.http.get<Workout>(workoutsUrl, httpOptions)
    .pipe(retry(3), catchError(this.handleError<User[]>('getWorkout', [])));
  }

  postWorkout(workout: Workout): Observable<any>{
 
   
    let httpWithJWT = {
      headers: new HttpHeaders({
        'content':"application/json",
        'content-type':"application/json",
        'Access-Control-Allow-Origin': '*',
        'x-access-token': localStorage.getItem('JWT')
      })
    }

    return this.http.post(workoutsUrl, workout, httpWithJWT)
    .pipe(retry(3), catchError(this.handleError<User[]>('postWorkout', [])));
  
  }

  postExercise(exercise: Exercise): Observable<any>{
 
   
    let httpWithJWT = {
      headers: new HttpHeaders({
        'content':"application/json",
        'content-type':"application/json",
        'Access-Control-Allow-Origin': '*',
        'x-access-token': localStorage.getItem('JWT')
      })
    }

    return this.http.post(exercisesUrl, exercise, httpWithJWT)
    .pipe(retry(3), catchError(this.handleError<User[]>('postExercise', [])));
  
  }

  getExercises(workoutId) {
    return this.http.get<Exercise>(exercisesUrl + "/getByWorkout/" + workoutId, httpOptions)
    .pipe(retry(3), catchError(this.handleError<User[]>('getWorkout', [])));
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

private log(message: string){
  console.log(message);
}
}
