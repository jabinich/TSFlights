import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../flights.service';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  flights: Flight[] = [];
  selectedOrigin: string = "";
  selectedDestination: string = "";
  filteredOriginList: any[];
  filteredDestinationList: any[];

  constructor(private flightService: FlightsService) { 

  }

  ngOnInit(): void {
    this.flightService.getAllOrigins().subscribe(data =>{
      this.filteredOriginList = data; 
    })

    this.flightService.getAllDestinations().subscribe(data =>{
      this.filteredDestinationList = data; 
    })
  }

  query(): void {
    const origin = this.selectedOrigin;
    const destination = this.selectedDestination;
   
    this.flightService.getFlights(origin, destination).subscribe(data =>{
      this.flights = data; 
    })
  }

  getFlights(){
    
  }

}
