import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

const GET_LAMBDA_URL = 'https://908n4m5n4c.execute-api.eu-west-2.amazonaws.com/v1/onboarding';

@Injectable()
export class GetGameMovesService{
  constructor(private http: HttpClient){}

  public gameMoves = new BehaviorSubject(null);

  loadGameMoves(gamename: string, password: string): Observable<any> {
    console.log(`Getting ${gamename} from the database using password ${password}...`);

    // make the http request
    const httpresponse = this.http.get(GET_LAMBDA_URL, {
      params: {
        task: 'getgamemoves',
        gamename: gamename,
        password: password,
      },
      observe: 'response'
    });


    // store the game moves from the request in the service
    // TODO: Something about the existence of these 5 lines is causing the unit test to think there's 2 http requests.
    httpresponse.subscribe((response) => {
      if (response.body["GameMoves"]){
        this.gameMoves.next(response.body["GameMoves"]);
      }
    });

    console.log(httpresponse);
    return httpresponse;
  }

}
