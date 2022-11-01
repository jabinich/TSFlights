import { Injectable } from '@angular/core';
import { Flight } from './flight.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  // flights: Flight[] = [
  //   {origin: "Miami", destination: 'Chicago', flightNumber: 345, depart: new Date('2020-02-25T23:18:21.932Z'), arrive: new Date('2020-02-25T23:21:21.932Z'), nonstop: true}, 
  //   {origin: "New York", destination: 'Los Angeles', flightNumber: 432, depart: new Date('2020-05-25T23:18:00.932Z'), arrive: new Date('2020-05-25T23:23:21.932Z'), nonstop: false}
  // ];
  backendUrl: string;

  constructor(private http: HttpClient) { 
    this.backendUrl = "http://localhost:3000";
  }

  getFlights(orig: String, dest: String): Observable<Flight[]>{
    //('http://localhost:3000/flights/query/' + orig +'/' + dest);
    return this.http.get<Flight[]>(this.backendUrl + '/flights/query/' + orig +'/' + dest);
  }

  getAllFlights(): Observable<Flight[]>{
    return this.http.get<Flight[]>(this.backendUrl + '/flights');
  }

  getAllOrigins(): Observable<any> {
    return this.http.get<any>(this.backendUrl + '/flights/cities/origins');
  }

  getAllDestinations(): Observable<any> {
    return this.http.get<any>(this.backendUrl + '/flights/cities/destinations');
  }

  getAllAirlines(): Observable<any> {
    return this.http.get<any>(this.backendUrl + '/flights/airlines');
  }

  postFlight(flight: Flight) {
    return this.http.post(this.backendUrl + '/flights/', flight).subscribe(data =>{
    })
  }

  updateFlight(flight: Flight) {
    return this.http.patch(this.backendUrl + "/flights/" + flight.id + "/update",flight);
  }

  deleteFlight(id) {
    return this.http.post(this.backendUrl + "/flights/" + id + "/delete", null);
  }

}
