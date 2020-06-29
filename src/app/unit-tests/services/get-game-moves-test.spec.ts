import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetGameMovesService } from '../../services/get-game-moves.service';

describe('GetGameMovesService', () => {
  let service: GetGameMovesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetGameMovesService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GetGameMovesService);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getGameMovesFromLambda should return 4 moves from game "aaa".', () => {

    const GET_LAMBDA_URL = 'https://908n4m5n4c.execute-api.eu-west-2.amazonaws.com/v1/onboarding';
    const mockData = {gamemoves: [1, 2, 3, 4]};

    service.loadGameMoves('aaa', 'aaa').subscribe((response) => {
      expect(response.body["gamemoves"].length === 4).toBeTrue();
    });

    const req = httpTestingController.expectOne(GET_LAMBDA_URL + '?task=getgamemoves&gamename=aaa&password=aaa');
    console.log(req.request);
    expect(req.request.method).toEqual('GET');

    req.flush(mockData);

  });

});
