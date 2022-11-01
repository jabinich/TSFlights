import { Component, OnInit } from '@angular/core';
import { Flight } from '../flight.model';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  loading = true;

  // origin: string; 
  // destination: string; 
  // flightnumber: number; 
  // airlineid: number=0;
  //depart: Date; 
  //arrive: Date; 
  //nonstop: boolean;
  
  flightList: Flight[];
  filteredAirlinesList: any[];

  newFlight: Flight = {
    origin: null,
    destination: null,
    flightnumber: null,
    depart: null, 
    arrive: null, 
    nonstop: false,
    airlinesId: null
  };


  constructor(private flightService: FlightsService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.loading = true;
    this.flightService.getAllFlights().subscribe(data =>{
      this.flightList = data;
      this.loading = false;
    })

    this.flightService.getAllAirlines().subscribe(data =>{
      this.filteredAirlinesList = data;
    })

    this.resetNewFlight();
  }

  resetNewFlight(){
    this.newFlight.origin = null;
    this.newFlight.destination = null;
    this.newFlight.flightnumber = null;
    this.newFlight.depart = null;
    this.newFlight.arrive = null;
    this.newFlight.nonstop = null;
    this.newFlight.airlinesId = null;
  }

  /* toggleNonStop(): void {
    this.nonstop = !this.nonstop;
  } */

  sendFlight(){
    /* const flight: Flight = {
      origin: this.origin, 
      destination: this.destination,
      flightnumber: this.flightnumber,
      airlinesId: this.airlineid,
      depart: this.depart,
      arrive: this.arrive,
      nonstop: this.nonstop
    } */

    this.flightService.postFlight(this.newFlight).subscribe(data => {
      console.log("data is ", data);
      if(data){
        this.refresh();
      }
    });
  }

  update(flight: Flight){
    delete flight.airlines; //we don't need to update this

    this.flightService.updateFlight(flight).subscribe(data =>{
      console.log("data is", data);
      if(data && data["affected"]){
        this.refresh();
      }
    });
  }

  delete(flight: Flight){
    if (window.confirm('are you sure you want to delete this flight? ')){
      this.flightService.deleteFlight(flight.id as number).subscribe(data =>{
        console.log("data is", data);
        if(data && data["affected"]){
          this.refresh();
        }

      });
    }
  } 

}
