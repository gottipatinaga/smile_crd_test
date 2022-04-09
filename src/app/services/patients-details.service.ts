import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PatientsDetailsService {
  constructor(private http: HttpClient) {}

  getPatientsDetails(searchValue: { family: string; given: string } = null) {
    let params = new HttpParams();
    if (!!searchValue?.given) {
      params = params.append('given', searchValue.given);
    }
    if (!!searchValue?.family) {
      params = params.append('family', searchValue.family);
    }
    const URL = 'https://try.smilecdr.com/baseR4/Patient';
    return this.http.get<any>(URL, { params: params }).pipe(
      map((data) => {
        return data.entry.map((eachEntry: any) => {
          return {
            family: eachEntry.resource.name[0].family,
            givenName: eachEntry.resource.name[0].given.toString(),
            gender: eachEntry.resource.gender,
            birthDate: eachEntry.resource.birthDate,
            address: eachEntry.resource?.address?.length
              ? `${
                  eachEntry.resource?.address[0]?.line
                    ? eachEntry.resource?.address[0]?.line?.toString() + ', '
                    : ''
                }${
                  eachEntry.resource?.address[0]?.state
                    ? eachEntry.resource?.address[0]?.state + '. '
                    : ''
                }${
                  eachEntry.resource?.address[0]?.country
                    ? eachEntry.resource?.address[0]?.country
                    : ''
                }${
                  eachEntry.resource?.address[0]?.postalCode
                    ? eachEntry.resource?.address[0]?.postalCode
                    : ''
                }`
              : null,
            telecom: eachEntry.resource?.telecom?.length
              ? eachEntry.resource?.telecom
                  .filter((val: any) => val.system === 'phone')
                  .map((val: any) => val.value)[0]
              : null,
          };
        });
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
