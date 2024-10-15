import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { Artwork } from './../../../shared/models/artwork';
import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-artwork-item',
  standalone: true,
  imports: [ MatCard, MatCardContent, CurrencyPipe, MatCardActions, MatButton, MatIcon ],
  templateUrl: './artwork-item.component.html',
  styleUrl: './artwork-item.component.scss'
})

export class ArtworkItemComponent {
  @Input() artwork?: Artwork;
}
