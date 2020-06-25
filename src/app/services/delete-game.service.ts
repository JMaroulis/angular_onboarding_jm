import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const DELETE_LAMBDA_URL = 'https://908n4m5n4c.execute-api.eu-west-2.amazonaws.com/v1/onboarding';

@Injectable()
export class DeleteGameService{
  constructor(private http: HttpClient){}

  deleteGame(gamename: string, password: string) {
    console.log(`Deleting ${gamename} from the database using password ${password}...`);

    return this.http.delete(DELETE_LAMBDA_URL, {
      params: {
        gamename: gamename,
        password: password,
      },
      observe: 'response'
    });
  }

}
