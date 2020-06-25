import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

const GET_LAMBDA_URL = 'https://908n4m5n4c.execute-api.eu-west-2.amazonaws.com/v1/onboarding';

@Injectable()
export class GetGamesListService {
  constructor(private http: HttpClient) {}

  getGamesListFromLambda(): Observable<any> {
    return this.http.get(GET_LAMBDA_URL, {
      params: {
        task: 'getgamelist'
      },
      observe: 'response'
    });
  }

}
