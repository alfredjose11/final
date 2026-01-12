import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Spiro } from '../spiro.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-listview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-listview.html',
  styleUrls: ['./single-listview.css']
})
export class SingleListview implements OnInit, OnDestroy {
  @Input() singleProduct!: any;
  selectedImage: string | null = null;
  private subscription!: Subscription;

  trackByFn(index: number, item: string): number {
    return index;
  }

  constructor(private route: ActivatedRoute, private spiro: Spiro) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subscription = this.spiro.getSingleProduct(id).subscribe((data: any) => {
        this.singleProduct = data;
        console.log('single product', data);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
