import {getTestBed, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetGameMovesService } from '../../services/get-game-moves.service';
import {GetGamesListService} from '../../services/get-games-list.service';
import {PutGameService} from '../../services/put-game.service';

describe('GetGameMovesService', () => {
  let service: PutGameService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PutGameService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PutGameService);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should exist.', () => {
    expect(service).toBeTruthy();
  });

  it('Should find the basic game list.', () => {

    const PUT_LAMBDA_URL = 'https://908n4m5n4c.execute-api.eu-west-2.amazonaws.com/v1/onboarding';
    const mockData = { Status: 'Successfully created aaa.' };

    const newgame = {
      gamename: 'aaa',
      password: 'bbb',
      player1: 'ccc',
      player2: 'ddd'
    };

    service.putNewGame(newgame).subscribe((response) => {
      expect(response.body['Status'] === 'Successfully created aaa.').toBeTrue();
    });

    const req = httpTestingController.expectOne(PUT_LAMBDA_URL + '?task=newgame&gamename=aaa&password=bbb&player1name=ccc&player2name=ddd');
    expect(req.request.method).toEqual('POST');

    req.flush(mockData);

  });

});
