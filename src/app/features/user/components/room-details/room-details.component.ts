import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BedroomService } from '../../../../core/services/bedroom.service';
import { HttpClient } from '@angular/common/http';

interface Bedroom {
  _id: any | string;
}

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  bedrooms: Bedroom[] = [];
  bedroom: any = {};
  selectedGuests: number = 1;
  selectedNights: number = 1;
  total: number = 0;
  error: string | null = null;
  filteredBedrooms: Bedroom[] = [];

  constructor(
    private route: ActivatedRoute,
    private bedroomService: BedroomService,
    private http: HttpClient
  ) { }

  fetchBedrooms(): void {
    this.error = null;
    this.http.get<Bedroom[]>('http://localhost:9000/api/home/data')
      .subscribe({
        next: (data) => {
          this.bedrooms = data;
          this.filteredBedrooms = data;
        },
        error: (error) => {
          this.error = 'Error al cargar los datos. Por favor, intenta de nuevo más tarde.';
        }
      });
  }
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

