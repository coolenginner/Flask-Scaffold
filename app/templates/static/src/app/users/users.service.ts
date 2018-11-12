import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';
import { User } from '../users/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private token:any = localStorage.getItem('id_token');

  private httpOptions:any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.token
    })
  }

  private handleError(error: HttpErrorResponse) {
    
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      return throwError(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    
    // return an observable with a user-facing error message
   // return throwError( 
    //  'Something bad happened; please try again later.');
  };
  constructor(private http: HttpClient) { }


  getLists(): Observable<any> {

   

    return this.http.get(`/api/v1/users.json`, this.httpOptions)
    
      .pipe(
        
        
        catchError(this.handleError)
      )
    
  }

  add(user: any): Observable<any> {

    
    return this.http.post<User>(`/api/v1/signup.json`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)          
        
        )
    

  
}

login(user: any): Observable<any> {

    
  return this.http.post<User>(`/api/v1/login.json`, user)
    .pipe(
      catchError(this.handleError)          
      
      )
  


}

getUser(id:number): Observable<any> {

  let url = '/api/v1/users/' +id + '.json';

  return this.http.get<User>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)          
      
      )
  


}


  edit(user: any, id:number): Observable<any> {

    let url = '/api/v1/users/' +id + '.json';
      
    return this.http.patch<User>(url, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)          
        
        )
    


  }

    delete( id:number): Observable<any> {

      let url = '/api/v1/users/' +id + '.json';
        
      return this.http.delete<User>(url, this.httpOptions)
        .pipe(
          catchError(this.handleError)          
          
          )
      


    }
}





