import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // garante que não ficou requisição pendente
  });

  it('should fetch all movies', () => {
    const mockMovies = [
      { year: 1980, title: 'Test Movie', studios: 'Test Studio', winner: true }
    ];

    service.getAllMovies().subscribe((movies) => {
      expect(movies.length).toBe(1);
      expect(movies[0].title).toBe('Test Movie');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/movies');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should fetch intervals', () => {
    const mockIntervals = { min: [], max: [] };

    service.getIntervals().subscribe((res) => {
      expect(res).toEqual(mockIntervals);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/movies/intervals');
    expect(req.request.method).toBe('GET');
    req.flush(mockIntervals);
  });

  it('should fetch years with multiple winners', () => {
    const mockYears = [{ year: 1980, winnerCount: 2 }];

    service.getYearsWithMultipleWinners().subscribe((res) => {
      expect(res[0].year).toBe(1980);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/movies/years-with-multiple-winners');
    expect(req.request.method).toBe('GET');
    req.flush(mockYears);
  });

  it('should fetch studios with win count', () => {
    const mockStudios = [{ studio: 'Test Studio', winCount: 5 }];

    service.getStudiosWithWinCount().subscribe((res) => {
      expect(res[0].studio).toBe('Test Studio');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/movies/studios-with-win-count');
    expect(req.request.method).toBe('GET');
    req.flush(mockStudios);
  });

  it('should fetch winners by year', () => {
    const mockMovies = [{ year: 1980, title: 'Winner Movie', studios: 'StudioX', winner: true }];

    service.getWinnersByYear(1980).subscribe((res) => {
      expect(res[0].title).toBe('Winner Movie');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/movies/winners-by-year/1980');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });
});
