import {getTestBed, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetGameMovesService } from '../../services/get-game-moves.service';
import {GetGamesListService} from '../../services/get-games-list.service';

describe('GetGameMovesService', () => {
  let service: GetGameMovesService;
  let service2: GetGamesListService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetGameMovesService, GetGamesListService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GetGameMovesService);
    service2 = TestBed.inject(GetGamesListService);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should exist.', () => {
    expect(service).toBeTruthy();
  });

  it('Should find the basic game list.', () => {

    const GET_LAMBDA_URL = 'https://908n4m5n4c.execute-api.eu-west-2.amazonaws.com/v1/onboarding';
    const mockData = { gamelist: [
        {
        gamename: 'aaa',
        player1: 'bbb',
        player2: 'ccc'
        },
        {
          gamename: 'ddd',
          player1: 'eee',
          player2: 'fff'
        }]
    };

    service2.getGamesListFromLambda().subscribe((response) => {
      const game1 = response.body["gamelist"][0];
      expect(game1.gamename === 'aaa').toBeTrue();
      expect(game1.player1 === 'bbb').toBeTrue();
      expect(game1.player2 === 'ccc').toBeTrue();

      const game2 = response.body["gamelist"][1];
      expect(game2.gamename === 'ddd').toBeTrue();
      expect(game2.player1 === 'eee').toBeTrue();
      expect(game2.player2 === 'fff').toBeTrue();
    });

    const req = httpTestingController.expectOne(GET_LAMBDA_URL + '?task=getgamelist');
    expect(req.request.method).toEqual('GET');

    req.flush(mockData);

  });

});
