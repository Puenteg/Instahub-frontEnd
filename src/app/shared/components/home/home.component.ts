import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';


interface Bedroom {
_id: any|string;
  title: string;
  description: string;
  host: string;
  location: string;
  price: number;
  image: string;
  date: string;
  category: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bedrooms: Bedroom[] = [];
  categories: string[] = [];
  searchLocation: string = '';
  searchDateFrom: string = '';
  searchDateTo: string = '';
  filteredBedrooms: Bedroom[] = [];
  loading = false;
  error: string | null = null;
  selectedCategory: string = 'All';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBedrooms();
  }


  fetchBedrooms(): void {
    this.loading = true;
    this.error = null;
    this.http.get<Bedroom[]>('http://localhost:9000/api/home/data').subscribe({
      next: (data) => {
        this.bedrooms = data.map(m => {
          if(m._id === '66d7fb99d603044e1d11bcd5') {
            m.image = `data:image/png;base64,${m.image}`
          }
          return m;
        });
        this.filteredBedrooms = data
        this.categories = this.getUniqueCategories(this.bedrooms);
        this.loading = false;
        data.forEach(f=> {
          // this.fetchImages(f._id);
        })
      },
      error: (error) => {
        this.error =
          'Error al cargar los datos. Por favor, intenta de nuevo más tarde.';
        this.loading = false;
      },
    });
  }

  fetchImages(id: string): void {
    this.http.get<Bedroom>('http://localhost:9000/api/home/data/' + id).pipe(take(1)).subscribe({
      next: (data) => {
        const bedRoom = this.bedrooms.find(f => f._id = id);
        if(bedRoom) {
          bedRoom.image = data.image
        }
      },
      error: (error) => {
      },
    });
  }

  getUniqueCategories(bedrooms: Bedroom[]): string[] {
    const categorySet = new Set(bedrooms.map(bedroom => bedroom.category));
    return Array.from(categorySet);
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredBedrooms = this.bedrooms.filter((bedroom) => {
      const categoryMatch =
        this.selectedCategory === 'All' ||
        bedroom.category === this.selectedCategory;
      const locationMatch =
        !this.searchLocation ||
        bedroom.location.toLowerCase().includes(
          this.searchLocation.toLowerCase()
        );
      const dateMatch = this.checkDateRange(bedroom.date);
      return categoryMatch && locationMatch && dateMatch;
    });
  }

  checkDateRange(bedroomDate: string): boolean {
    const bedroomDateObj = new Date(bedroomDate);
    const fromDate = this.searchDateFrom ? new Date(this.searchDateFrom) : null;
    const toDate = this.searchDateTo ? new Date(this.searchDateTo) : null;
    const today = new Date();
  
    // Ajustamos la hora a 00:00:00 para comparar solo la fecha
    today.setHours(0, 0, 0, 0);
    bedroomDateObj.setHours(0, 0, 0, 0);
  
    // Validaciones para asegurar que las fechas estén dentro del rango
    if (fromDate && fromDate < today) {
      alert('La fecha de entrada no puede estar en el pasado.');
      return false;
    }
  
    if (fromDate && toDate && fromDate > toDate) {
      alert('La fecha de salida no puede ser anterior a la fecha de entrada.');
      return false;
    }
  
    if (toDate && toDate < today) {
      alert('La fecha de salida no puede estar en el pasado.');
      return false;
    }
  
    // La habitación estará disponible si la fecha de entrada es anterior o igual a la fecha de disponibilidad
    // y la fecha de salida es igual o posterior a la fecha de entrada.
    if (fromDate && toDate) {
      return fromDate <= bedroomDateObj || toDate >= bedroomDateObj;
    } else if (fromDate) {
      return fromDate <= bedroomDateObj;
    } else if (toDate) {
      return toDate >= bedroomDateObj;
    }
  
    return true;
  }
  

  // onSearch(): void {
  //   this.applyFilters();
  // }
  
  onSearch(): void {
    const fromDate = this.searchDateFrom ? new Date(this.searchDateFrom) : null;
    const toDate = this.searchDateTo ? new Date(this.searchDateTo) : null;
    const today = new Date();
  
    // Set time to 00:00:00 to compare only the date
    today.setHours(0, 0, 0, 0);
  
    if (fromDate && fromDate < today) {
      alert('La fecha de entrada no puede estar en el pasado.');
      return;
    }
  
    if (fromDate && toDate && fromDate > toDate) {
      alert('La fecha de salida no puede ser anterior a la fecha de entrada.');
      return;
    }
  
    if (toDate && toDate < today) {
      alert('La fecha de salida no puede estar en el pasado.');
      return;
    }
  
    // Si todo es válido, aplicamos los filtros
    this.applyFilters();
  }
}