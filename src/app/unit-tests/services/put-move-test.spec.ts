import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetGameMovesService } from '../../services/get-game-moves.service';
import { PutMoveService } from '../../services/put-move.service';

describe('GetGameMovesService', () => {
  let service: PutMoveService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PutMoveService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PutMoveService);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should exist.', () => {
    expect(service).toBeTruthy();
  });

  it('Should return \'Status: Successfully created move in [gamename].\'.', () => {

    const PUT_LAMBDA_URL = 'https://908n4m5n4c.execute-api.eu-west-2.amazonaws.com/v1/onboarding';
    const mockData = { Status: 'Successfully created move in aaa.' };

    service.putNewMove('aaa', 'example move').subscribe((response) => {
      expect(response.body['Status'] === 'Successfully created move in aaa.').toBeTrue();
    });

    const req = httpTestingController.expectOne(PUT_LAMBDA_URL + '?task=newmove&gamename=aaa&move=example%20move');
    expect(req.request.method).toEqual('POST');

    req.flush(mockData);

  });

});
