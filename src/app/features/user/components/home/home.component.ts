// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// interface Bedroom {
//   title: string;
//   description: string;
//   host: string;
//   location: string;
//   price: number;
//   image: string;
//   date: string;
//   category: string;
// }

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
// })
// export class HomeComponent implements OnInit {
//   bedrooms: Bedroom[] = [];
//   categories: string[] = [];
//   searchLocation: string = '';
//   searchDateFrom: string = '';
//   searchDateTo: string = '';
//   filteredBedrooms: Bedroom[] = [];
//   loading = false;
//   error: string | null = null;
//   selectedCategory: string = 'All';
//   todayString: string = '';

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.todayString = this.getTodayString();
//     this.fetchBedrooms();
//   }

//   fetchBedrooms(): void {
//     this.loading = true;
//     this.error = null;
//     this.http.get<Bedroom[]>('http://localhost:9000/api/home/data').subscribe({
//       next: (data) => {
//         this.bedrooms = data;
//         this.filteredBedrooms = data;
//         this.categories = this.getUniqueCategories(data);
//         this.loading = false;
//       },
//       error: (error) => {
//         this.error =
//           'Error al cargar los datos. Por favor, intenta de nuevo más tarde.';
//         this.loading = false;
//       },
//     });
//   }

//   getUniqueCategories(bedrooms: Bedroom[]): string[] {
//     const categorySet = new Set(bedrooms.map((bedroom) => bedroom.category));
//     return Array.from(categorySet);
//   }

//   filterByCategory(category: string): void {
//     this.selectedCategory = category;
//     this.applyFilters();
//   }

//   applyFilters(): void {
//     this.filteredBedrooms = this.bedrooms.filter((bedroom) => {
//       const categoryMatch =
//         this.selectedCategory === 'All' ||
//         bedroom.category === this.selectedCategory;
//       const locationMatch = this.matchLocation(
//         bedroom.location,
//         this.searchLocation
//       );
//       const dateMatch = this.checkDateRange(bedroom.date);
//       return categoryMatch && locationMatch && dateMatch;
//     });
//   }

//   matchLocation(bedroomLocation: string, searchLocation: string): boolean {
//     if (!searchLocation) return true;

//     const normalizeString = (str: string) =>
//       str
//         .toLowerCase()
//         .normalize('NFD')
//         .replace(/[\u0300-\u036f]/g, '');

//     return normalizeString(bedroomLocation).includes(
//       normalizeString(searchLocation)
//     );
//   }

//   parseDate(dateString: string): Date | null {
//     if (!dateString) {
//       return null;
//     }
  
//     let parts = dateString.split('-');
//     if (parts.length === 3) {
//       return new Date(
//         parseInt(parts[0]),
//         parseInt(parts[1]) - 1,
//         parseInt(parts[2])
//       );
//     }
  
//     parts = dateString.split('/');
//     if (parts.length === 3) {
//       return new Date(
//         parseInt(parts[2]),
//         parseInt(parts[1]) - 1,
//         parseInt(parts[0])
//       );
//     }
  
//     return null;
//   }
  

//   checkDateRange(bedroomDate: string): boolean {
//     if (!bedroomDate) return false;

//     if (!this.searchDateFrom && !this.searchDateTo) return true;

//     const bedroomDateObj = this.parseDate(bedroomDate);
//     const fromDate = this.searchDateFrom
//       ? this.parseDate(this.searchDateFrom)
//       : null;
//     const toDate = this.searchDateTo ? this.parseDate(this.searchDateTo) : null;
//     const today = new Date();

//     if (!bedroomDateObj) return false;

//     if (fromDate && toDate) {
//       return (
//         fromDate <= bedroomDateObj &&
//         toDate <= bedroomDateObj &&
//         fromDate >= today &&
//         toDate >= today
//       );
//     } else if (fromDate) {
//       return fromDate <= bedroomDateObj && fromDate >= today;
//     } else if (toDate) {
//       return toDate <= bedroomDateObj && toDate >= today;
//     }

//     return true;
//   }

//   getTodayString(): string {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = (today.getMonth() + 1).toString().padStart(2, '0');
//     const day = today.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

//   validateDateRange(): boolean {
//     const fromDate = this.searchDateFrom
//       ? this.parseDate(this.searchDateFrom)
//       : null;
//     const toDate = this.searchDateTo ? this.parseDate(this.searchDateTo) : null;

//     if (fromDate && toDate) {
//       return fromDate <= toDate;
//     }

//     return true;
//   }

//   onSearch(): void {
//     if (!this.validateDateRange()) {
//       alert('La fecha de salida no puede ser anterior a la fecha de entrada.');
//       return;
//     }

//     this.applyFilters();
//   }
// }
