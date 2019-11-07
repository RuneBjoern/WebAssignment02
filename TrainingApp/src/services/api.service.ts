import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user'
import { Observable, of } from 'rxjs';
import { retry, catchError} from 'rxjs/operators'; 



const localUrl = 'assets/data/user.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get<User[]>(localUrl, {observe: 'response'});
  }

  getUserById(id: any): Observable<any>{
    return this.http.get<User>(localUrl + id).pipe(retry(3), catchError(this.handleError<User>('getUser')));
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
