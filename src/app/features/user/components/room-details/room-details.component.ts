// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BedroomService } from '../../../../core/services/bedroom.service';

// @Component({
//   selector: 'app-room-details',
//   templateUrl: './room-details.component.html',
//   styleUrls: ['./room-details.component.css']
// })
// export class RoomDetailsComponent implements OnInit {
//   bedroom: any = {};
//   selectedGuests: number = 1;
//   selectedNights: number = 1;
//   total: number = 0;
  
//   constructor(
//     private route: ActivatedRoute,
//     private bedroomService: BedroomService
//   ) {}

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.bedroomService.getBedroomDetails(id).subscribe(
//         data => {
//           this.bedroom = data;
//         },
//         error => {
//           console.error('Error fetching bedroom details:', error);
//         }
//       );
//     }
//   }
//     // Definición del método calculateTotal
//     calculateTotal(): number {
//       if (this.bedroom && this.bedroom.price) {
//         return this.bedroom.price * this.selectedNights;
//       }
//       return 0;
//     }

    

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BedroomService } from '../../../../core/services/bedroom.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  bedroom: any = {};
  selectedGuests: number = 1;
  selectedNights: number = 1;
  total: number = 0;
  
  constructor(
    private route: ActivatedRoute,
    private bedroomService: BedroomService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bedroomService.getBedroomDetails(id).subscribe(
        data => {
          this.bedroom = data;
        },
        error => {
          console.error('Error fetching bedroom details:', error);
        }
      );
    }
  }

  // Definición del método calculateTotal
  calculateTotal(): number {
    if (this.bedroom && this.bedroom.price) {
      return this.bedroom.price * this.selectedNights;
    }
    return 0;
  }
}
