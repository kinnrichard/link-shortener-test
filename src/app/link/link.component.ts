import { Component } from '@angular/core';
import { LinkService } from './service/link.service';
import { CreateLinkRequest } from './model/create-link.model';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {
  url: string = '';
  shortenedUrl: string | null = null;
  message: string = '';

  constructor(private service: LinkService) {}

  generateShortUrl(): void {
    console.log('Generating short URL for:', this.url);

    const request: CreateLinkRequest = { url: this.url };

    this.service.generateShortUrl(request).subscribe({
      next: (response) => {
        if (response.message) {
          this.message = response.message;
          console.log(this.message);
        } else {
          this.message = 'URL shortened successfully';
          console.log(this.message);
        }
        this.shortenedUrl = response.shortenUrl;
      },
      error: (error) => {
        console.error('Error generating short URL:', error);
      }
    });
}

  
}
