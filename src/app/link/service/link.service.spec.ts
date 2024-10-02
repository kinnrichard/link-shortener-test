import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LinkService } from './link.service';
import { CreateLinkRequest } from '../model/create-link.model';

describe('LinkService', () => {
  let service: LinkService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LinkService],
    });

    service = TestBed.inject(LinkService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate short URL', () => {
    const mockResponse = { shortenUrl: 'https://sho.rt/abc123' };
    const request: CreateLinkRequest = { url: 'https://example.com' };

    service.generateShortUrl(request).subscribe((response) => {
      expect(response.shortenUrl).toBe(mockResponse.shortenUrl);
    });

    const req = httpTestingController.expectOne('https://localhost:7086/api/link/createshorturl');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
