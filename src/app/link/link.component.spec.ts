import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';
import { LinkService } from './service/link.service';
import { of, throwError } from 'rxjs';
import { CreateLinkRequest } from './model/create-link.model';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let mockLinkService: jasmine.SpyObj<LinkService>;

  beforeEach(async () => {
    mockLinkService = jasmine.createSpyObj('LinkService', ['generateShortUrl']);

    await TestBed.configureTestingModule({
      declarations: [LinkComponent],
      providers: [{ provide: LinkService, useValue: mockLinkService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a short URL successfully', () => {
    const mockResponse = { shortenUrl: 'https://sho.rt/abc123', message: '' };
    mockLinkService.generateShortUrl.and.returnValue(of(mockResponse));

    component.url = 'https://example.com';
    component.generateShortUrl();

    expect(mockLinkService.generateShortUrl).toHaveBeenCalledWith({ url: component.url });
    expect(component.shortenedUrl).toBe(mockResponse.shortenUrl);
    expect(component.message).toBe('URL shortened successfully');
  });

  it('should handle the message when the response contains one', () => {
    const mockResponse = { shortenUrl: '', message: 'This URL is already shortened.' };
    mockLinkService.generateShortUrl.and.returnValue(of(mockResponse));

    component.url = 'https://example.com';
    component.generateShortUrl();

    expect(component.shortenedUrl).toBe('');
    expect(component.message).toBe(mockResponse.message);
  });

  it('should handle errors when generating a short URL', () => {
    const errorResponse = 'Error generating short URL';
    mockLinkService.generateShortUrl.and.returnValue(throwError(() => new Error(errorResponse)));

    spyOn(console, 'error'); 
    component.url = 'https://example.com';
    component.generateShortUrl();

    expect(console.error).toHaveBeenCalledWith('Error generating short URL:', jasmine.any(Error));
  });
});
