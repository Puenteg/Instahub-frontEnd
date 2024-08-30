import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calificar-por-estrella',
  templateUrl: './calificar-por-estrella.component.html',
  styleUrl: './calificar-por-estrella.component.css'
})
export class CalificarPorEstrellaComponent {

  @Input() rating: number = 0;
  @Input() isFocuseable: boolean = true;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  starsArray: boolean[] = new Array(5);

  selectRating(i: number) {
    this.ratingChange.emit(5 - i);
  }
  constructor() {}

  ngOnInit() {}

}
