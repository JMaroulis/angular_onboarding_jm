import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

const GET_LAMBDA_URL = 'https://908n4m5n4c.execute-api.eu-west-2.amazonaws.com/v1/onboarding';

@Injectable()
export class GetGameMovesService{
  constructor(private http: HttpClient){}

  public gameMoves = new BehaviorSubject(null);

  loadGameMoves(gamename: string, password: string) {
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
    httpresponse.subscribe((response) => {
      if(response.body["GameMoves"]){
        this.gameMoves = response.body["GameMoves"];
      }
    });

    httpresponse.subscribe((response) => this.gameMoves.next(response.body["GameMoves"]));

    return httpresponse;
  }

}
