// src/app/room-list/room-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../../core/services/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})

export class RoomListComponent implements OnInit {
  rooms: any[] = [];
  hostId: string = ''; // Inicializa con una cadena vacía

  constructor(private roomService: RoomService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Verifica que `hostId` no sea `null` y proporciona un valor predeterminado
    this.hostId = this.route.snapshot.paramMap.get('hostId') || '';
    this.loadRooms();
  }

  loadRooms(): void {
    if (this.hostId) { // Verifica que `hostId` tenga un valor válido
      this.roomService.getAllBedroomsByHost(this.hostId).subscribe(
        data => {
          this.rooms = data;
        },
        error => {
          console.error('Error fetching rooms', error);
        }
      );
    } else {
      console.error('Host ID is not available');
    }
  }

  // Método para eliminar habitaciones
  deleteRoom(roomId: string): void {
    this.roomService.deleteBedroom(roomId).subscribe(
      () => {
        this.loadRooms(); // Recarga la lista de habitaciones después de eliminar
      },
      error => {
        console.error('Error deleting room', error);
      }
    );
  }
}

