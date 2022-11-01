export interface Flight {
    id?: number;
    origin: string; 
    destination: string; 
    flightnumber: number; 
    airlines?: any;
    depart: Date; 
    arrive: Date; 
    nonstop: boolean;
    airlinesId: number;
}
