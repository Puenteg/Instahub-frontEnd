import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Bedroom {
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
    this.http.get<Bedroom[]>('http://localhost:9000/api/home/data')
      .subscribe({
        next: (data) => {
          this.bedrooms = data;
          this.filteredBedrooms = data;
          this.categories = this.getUniqueCategories(data);
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error al cargar los datos. Por favor, intenta de nuevo más tarde.';
          this.loading = false;
        }
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
    this.filteredBedrooms = this.bedrooms.filter(bedroom => {
      const categoryMatch = this.selectedCategory === 'All' || bedroom.category === this.selectedCategory;
      const locationMatch = this.matchLocation(bedroom.location, this.searchLocation);
      const dateMatch = this.checkDateRange(bedroom.date);
      return categoryMatch && locationMatch && dateMatch;
    });

  }

  matchLocation(bedroomLocation: string, searchLocation: string): boolean {
    if (!searchLocation) return true;
    
    const normalizeString = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    return normalizeString(bedroomLocation).includes(normalizeString(searchLocation));
  }

  parseDate(dateString: string): Date | null {
    let parts = dateString.split('-');
    if (parts.length === 3) {
      return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }

    parts = dateString.split('/');
    if (parts.length === 3) {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }

    return null;
  }

  checkDateRange(bedroomDate: string): boolean {
    // Si no hay fecha de búsqueda, retorna true (todas las fechas son válidas)
    if (!this.searchDateFrom && !this.searchDateTo) return true;

    const bedroomDateObj = this.parseDate(bedroomDate);
    const fromDate = this.searchDateFrom ? this.parseDate(this.searchDateFrom) : null;
    const toDate = this.searchDateTo ? this.parseDate(this.searchDateTo) : null;

    // Si no se puede parsear la fecha de la habitación, no la incluimos
    if (!bedroomDateObj) return false;

    // Validar si la fecha de llegada está antes de la fecha disponible y la fecha de salida no supera la fecha disponible
    if (fromDate && toDate) {
      return fromDate <= bedroomDateObj && toDate <= bedroomDateObj;
    } else if (fromDate) {
      return fromDate <= bedroomDateObj;
    } else if (toDate) {
      return toDate <= bedroomDateObj;
    }

    return true;
  }

  onSearch(): void {
    this.applyFilters();
  }
}
