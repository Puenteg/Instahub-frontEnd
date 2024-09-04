import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

// Registra los componentes de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './raiting-dashboard.component.html',
  styleUrls: ['./raiting-dashboard.component.css']
})
export class RaitingDashboardComponent implements OnInit {
  hostRoomChart: any;
  userRegistrationChart: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadHostRoomStats();
    this.loadUserRegistrationStats();
  }

  loadHostRoomStats() {
    this.http.get('/api/host-room-stats').subscribe((data: any) => {
      const hosts = data.map((item: any) => item.host);
      const roomCounts = data.map((item: any) => item.roomCount);

      this.hostRoomChart = new Chart('hostRoomChart', {
        type: 'bar',
        data: {
          labels: hosts,
          datasets: [{
            label: 'Número de Habitaciones',
            data: roomCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  loadUserRegistrationStats() {
    this.http.get('/api/user-registration-stats').subscribe((data: any) => {
      const months = data.map((item: any) => item._id);
      const counts = data.map((item: any) => item.count);

      this.userRegistrationChart = new Chart('userRegistrationChart', {
        type: 'line',
        data: {
          labels: months,
          datasets: [{
            label: 'Registros de Usuarios',
            data: counts,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }
}
