// import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { BedroomService } from '../../services/bedroom.service';
// import { Observable, of } from 'rxjs'; // Asegúrate de importar Observable y of
// import { catchError } from 'rxjs/operators'; // Asegúrate de importar catchError

// @Component({
//   selector: 'app-bedroom-details',
//   templateUrl: './room-details.component.html',
//   styleUrls: ['./room-details.component.scss']
// })
// export class BedroomDetailsComponent implements OnInit {
//   bedroom: any; // Puedes definir un tipo específico si lo conoces
//   errorMessage: string = '';
  
//   @ViewChild('descriptionModal') descriptionModal!: TemplateRef<any>;

//   slideConfig = {
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     dots: true,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 3000
//   };

//   constructor(
//     private bedroomService: BedroomService,
//     private dialog: MatDialog
//   ) {}

//   ngOnInit() {
//     this.loadBedroomDetails();
//   }

//   loadBedroomDetails() {
//     // Aquí se espera que el método getBedroomDetails devuelva un Observable
//     this.bedroomService.getBedroomDetails().pipe(
//       catchError(error => {
//         this.errorMessage = 'Error loading bedroom details. Please try again.';
//         console.error('Error:', error);
//         return of(null); // Devuelve un Observable vacío para manejar el error
//       })
//     ).subscribe(
//       (data: any) => {
//         this.bedroom = data;
//       },
//       (error: any) => {
//         console.error('Error:', error); // Maneja cualquier error de la suscripción
//       }
//     );
//   }

//   openDescriptionModal() {
//     this.dialog.open(this.descriptionModal);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BedroomService } from '../../services/bedroom.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  bedroom: any;

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
    calculateTotal(price: number, quantity: number): number {
      return price * quantity;
    }
}


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HomeService } from '../../../../core/services/home.service';

// @Component({
//   selector: 'app-room-details',
//   templateUrl: './room-details.component.html',
//   styleUrl: './room-details.component.css'
// })
// export class RoomDetailsComponent implements OnInit{
//   bedroom: any;
  
//   constructor(private route: ActivatedRoute, private homeService: HomeService) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.homeService.getBedroomDetails(id).subscribe(data => {
//         this.bedroom = data;
//       });
//     }
//   }

// }
