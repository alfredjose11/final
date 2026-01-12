import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Spiro } from '../spiro.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class Card implements OnInit {
  products: any[] = [];

  constructor(private spiro: Spiro) {}

  ngOnInit(): void {
    this.spiro.getProducts().subscribe((res: any) => {
      this.products = res?.products ?? [];
      console.log('products', this.products);
    });
  }
}
