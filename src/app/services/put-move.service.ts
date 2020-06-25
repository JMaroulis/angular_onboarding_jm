import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const PUT_LAMBDA_URL = 'https://908n4m5n4c.execute-api.eu-west-2.amazonaws.com/v1/onboarding';

@Injectable()
export class PutMoveService{
  constructor(private http: HttpClient){}

  putNewMove(gamename: string, move: string){
    console.log(`Putting move '${move}' in game ${gamename} in the database table...`);

    return this.http.post(PUT_LAMBDA_URL, '', {
      params: {
        task: 'newmove',
        gamename: gamename,
        move: move
      },
      observe: 'response'
    });
  }

}
