import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { Artwork } from './../../../shared/models/artwork';
import { Component, inject, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artwork-item',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardActions, MatButton, MatIcon, DecimalPipe, RouterLink],
  templateUrl: './artwork-item.component.html',
  styleUrl: './artwork-item.component.scss'
})

export class ArtworkItemComponent {
  @Input() artwork?: Artwork;
}
