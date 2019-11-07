import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/user'
import { Observable, of } from 'rxjs';
import { retry, catchError} from 'rxjs/operators'; 

//Ref: API calls: https://www.djamware.com/post/5d8d7fc10daa6c77eed3b2f2/angular-8-tutorial-rest-api-and-httpclient-examples

const localUrl = 'assets/data/user.json';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/xml',
    'Authorization': 'jwt-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  // Change header settings befor "return" with: "httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');"
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
