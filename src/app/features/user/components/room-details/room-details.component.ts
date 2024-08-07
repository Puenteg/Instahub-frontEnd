import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../../../core/services/home.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit{
  bedroom: any;
  
  constructor(private route: ActivatedRoute, private homeService: HomeService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.homeService.getBedroomDetails(id).subscribe(data => {
        this.bedroom = data;
      });
    }
  }

}
