import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
      const locationMatch = !this.searchLocation || bedroom.location.toLowerCase().includes(this.searchLocation.toLowerCase());
      const dateMatch = this.checkDateRange(bedroom.date);
      return categoryMatch && locationMatch && dateMatch;
    });
  }

  checkDateRange(bedroomDate: string): boolean {
    if (!this.searchDateFrom && !this.searchDateTo) return true;
    
    const bedroomDateObj = new Date(bedroomDate);
    const fromDate = this.searchDateFrom ? new Date(this.searchDateFrom) : null;
    const toDate = this.searchDateTo ? new Date(this.searchDateTo) : null;

    if (fromDate && toDate) {
      return bedroomDateObj >= fromDate && bedroomDateObj <= toDate;
    } else if (fromDate) {
      return bedroomDateObj >= fromDate;
    } else if (toDate) {
      return bedroomDateObj <= toDate;
    }

    return true;
  }

  onSearch(): void {
    this.applyFilters();
  }
  
}