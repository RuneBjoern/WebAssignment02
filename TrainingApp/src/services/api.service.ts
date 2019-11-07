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


const localUrl = 'http://localhost:5000/';
const workoutsUrl = localUrl + 'workouts';
const authUrl = localUrl + 'users/authenticate';

const httpOptions ={
  headers: new HttpHeaders({
    'content':"application/json",
  'content-type':"application/json",
    'Access-Control-Allow-Origin': '*',
    'x-access-token': ''
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  authUser(user: User): Observable<any>{
    console.log(user);    
    const auth = this.http.post(authUrl, user, httpOptions)
    .pipe(retry(3), catchError(this.handleError<User[]>('authUser', [])));
    httpOptions.headers.set('x-access-token', "");
    return auth;
  }

  getWorkout(): Observable<any>{
    return this.http.get<Workout>(workoutsUrl, httpOptions)
    .pipe(retry(3), catchError(this.handleError<User[]>('getWorkout', [])));
  }

  getExercises(): Observable<any>{
    return this.http.get<Exercise>(localUrl, httpOptions)
    .pipe(retry(3), catchError(this.handleError<User[]>('getWorkout', [])));
  }

  getUser(): Observable<any>{
    return this.http.get<User[]>(localUrl, httpOptions)
      .pipe(retry(3), catchError(this.handleError<User[]>('getUser', [])));
  }

  getUserById(id: any): Observable<any>{
    return this.http.get<User>(localUrl + id)
      .pipe(retry(3), catchError(this.handleError<User>('getUser')));
  }

  addUser(user: User): Observable<User>{
      return this.http.post<User>(localUrl, user, httpOptions)
        .pipe(catchError(this.handleError('addUser',user)));
  }

  updateUser(id: any, user: User): Observable<User>{
      return this.http.put<User>(localUrl + id, user, httpOptions)
        .pipe(catchError(this.handleError('updateUser', user)));
  }

  deleteUser(id: any): Observable<User>{
      return this.http.delete<User>(localUrl + id, httpOptions)
        .pipe(catchError(this.handleError('deleteUser', id)));
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
