import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeleteGameService } from '../../services/delete-game.service';

describe('GetGameMovesService', () => {
  let service: DeleteGameService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeleteGameService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DeleteGameService);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should exist.', () => {
    expect(service).toBeTruthy();
  });

  it('Should return \'Status: Successfully deleted [gamename].\'.', () => {

    const PUT_LAMBDA_URL = 'https://908n4m5n4c.execute-api.eu-west-2.amazonaws.com/v1/onboarding';
    const mockData = { Status: 'Successfully deleted aaa.' };

    service.deleteGame('aaa', 'bbb').subscribe((response) => {
      expect(response.body['Status'] === 'Successfully deleted aaa.').toBeTrue();
    });

    const req = httpTestingController.expectOne(PUT_LAMBDA_URL + '?gamename=aaa&password=bbb');
    expect(req.request.method).toEqual('DELETE');

    req.flush(mockData);

  });

});
