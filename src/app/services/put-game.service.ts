import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const PUT_LAMBDA_URL = 'https://908n4m5n4c.execute-api.eu-west-2.amazonaws.com/v1/onboarding';

@Injectable()
export class PutGameService{
  constructor(private http: HttpClient){}

  putNewGame(newgame){
    console.log('Putting a game in the database table...');

    return this.http.post(PUT_LAMBDA_URL, '', {
      params: {
        task: 'newgame',
        gamename: newgame.gamename,
        password: newgame.password,
        player1name: newgame.player1,
        player2name: newgame.player2
      },
      observe: 'response'
    });
  }

}
