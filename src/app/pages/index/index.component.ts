import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  public url: string = '';

  constructor(private router: Router) {
  }

  onEnter(event: Event): void {
    console.log(event);
    if (!this.url) {
      return;
    }
    this.router.navigate(['browse'], { info: this.url });
  }

}
