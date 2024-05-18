import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  start_point:string;
  destination:string;
  total_drivers_marked:number
}

export interface AllHeaders {
  name: string;
  position: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Shivam' , start_point : 'Malleshwaram' ,destination : 'HSR' , total_drivers_marked:3 },
  { position: 2, name: 'Shivam' , start_point : 'Malleshwaram' ,destination : 'HSR' , total_drivers_marked:3 },
  { position: 3, name: 'Shivam' , start_point : 'Malleshwaram' ,destination : 'HSR' , total_drivers_marked:3 },
  { position: 4, name: 'Shivam' , start_point : 'Malleshwaram' ,destination : 'HSR' , total_drivers_marked:3 },
  { position: 5, name: 'Shivam' , start_point : 'Malleshwaram' ,destination : 'HSR' , total_drivers_marked:3 }
  // Add more elements as needed
];

const MAIN_HEADERS: AllHeaders[] = [ 
  { position: 1, name: 'Available Rides'},
  { position: 2, name: 'Total Commissions Earned'},
  { position: 3, name: 'Total Rides Completed'}
  // Add more elements as needed
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isEnableAvailRides:boolean=false;
  totalCommission:boolean=false;
  totalrides:boolean=false;

  displayedColumns: string[] = ['position', 'name' , 'start_point' , 'destination' , 'total_drivers_marked','accept','reject'];
  dataSource = ELEMENT_DATA;
  displayedHeaders:string[]=['position', 'name','view']
  headerSource=MAIN_HEADERS

  constructor() { }

  ngOnInit(): void {
  }
  onButtonClick(element:any,option:any)
  {
   if(option=='view' && element.name=='Available Rides'){ this.isEnableAvailRides=true; this.totalCommission=false; this.totalrides=false}
   if(option=='view' && element.name=='Total Commissions Earned'){ this.isEnableAvailRides=false; this.totalCommission=true; this.totalrides=false}
   if(option=='view' && element.name=='Total Rides Completed'){ this.isEnableAvailRides=false; this.totalCommission=false; this.totalrides=true}


    console.log("Element"  ,element);
    console.log("Option"  ,option);

  }

}


