import { Component, OnInit } from '@angular/core';
import { FetchRidesService } from '../../../services/fetch-rides.service'
import { Subscription } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
export interface PeriodicElement {
  name: string;
  position: number;
  source:string;
  destination:string;
  mobile:string;
  source_latitude: number;
  destination_latitude:number;
  source_longitude: number;
  destination_longitude: number;
  price:number;
  distance:number;
  email:string;
  riders_accepted:number;
  expired:string;
}

export interface AllHeaders {
  name: string;
  position: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
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
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  subscriptions: Subscription[] = [];
  isEnableAvailRides: boolean = false;
  totalCommission: boolean = false;
  totalrides: boolean = false;
  _openMap: boolean =false;
  count:any;
  price:any;

  displayedColumns: string[] = [
    'position',
    'name',
    'mobile',
    'source',
    'destination',
    'price',
    'distance',
    'map',
    'riders_accepted',
    'accept',
    'reject',
    'expired'
  ];
  dataSource = ELEMENT_DATA;
  displayedHeaders: string[] = ['position', 'name', 'view'];
  headerSource = MAIN_HEADERS;

  header_message:any;
  loggedInUser={
    email:''
  }
  

  constructor(public fetchRidesService: FetchRidesService , public authService:AuthService , public router :Router) {}

  ngOnInit(): void {
    if(!localStorage.getItem('token')) this.router.navigate(['login']);
    else{
      let payload={
        token:localStorage.getItem('token')
      }
      this.subscriptions.push(this.authService.checkjwt(payload).subscribe((response: any) => {
        this.loggedInUser.email=response?.loggedInUser_email
        console.log("RESOOOOOOOOO" , response)
        if (response?.status == 'failed') this.router.navigate(['login']);
    }))
    }
  }
  
  onButtonClick(element: any, option: any) {
    let params = {};
    if (option == 'view' && element.name == 'Available Rides') {
      const ELEMENT_DATA: PeriodicElement[] = [
      ];
      this.dataSource = ELEMENT_DATA;
      this.subscriptions.push(
        this.fetchRidesService.fetchRides(params).subscribe((response: any) => {
          console.log("------------------------------ ++++++++++++++++++++++ " , response);
          response.result.forEach((ele: any, index: any) => {
            console.log("ELE ************************** :  " ,ele.driver_email_ids)
            if(ele?.status!='Completed')
              {
            const newElement: PeriodicElement = {
              name: ele.name,
              position: index + 1,
              mobile: ele.mobile,
              source: ele.source,
              destination: ele.destination,
              source_latitude: ele?.source_latitude,
              destination_latitude: ele?.destination_latitude,
              source_longitude: ele?.source_longitude,
              destination_longitude: ele?.destination_longitude,
              price: ele?.price,
              distance: ele?.distance,
              email:ele?.email,
              riders_accepted:ele?.driver_email_ids?ele?.driver_email_ids.length:0,
              expired:ele.expired?'Yes':'No'
            };
            ELEMENT_DATA.push(newElement);
            console.log('ELEMENT : ', ELEMENT_DATA);
         } });

          this.dataSource = ELEMENT_DATA;
          this.isEnableAvailRides = true;
          this.totalCommission = false;
          this.totalrides = false;
           })
      );
      this.header_message= "Available Rides" ;

    }
    else if (option == 'accept') {
      const ELEMENT_DATA: PeriodicElement[] = [
      ];
      this.dataSource = ELEMENT_DATA;
      const newElement: PeriodicElement = {
        name: element.name,
        position: 1,
        mobile: element.mobile,
        source: element.source,
        destination: element.destination,
        source_latitude: element?.source_latitude,
        destination_latitude: element?.destination_latitude,
        source_longitude: element?.source_longitude,
        destination_longitude: element?.destination_longitude,
        price: element?.price,
        distance: element?.distance,
        email:element?.email,
        riders_accepted:element?.driver_email_ids?element?.driver_email_ids.length:0,
        expired:element.expired?'Yes':'No'


      };
      ELEMENT_DATA.push(newElement);
      this.header_message= "Accepted Rides" ;
      element.status='Accepted';
      element.driver_email_id= this.loggedInUser.email;
      this.fetchRidesService.updateRides(element).subscribe((response: any) => {})
      alert("Ride Accepted !! ")
    }
    else if (option == 'reject') {
      const ELEMENT_DATA: PeriodicElement[] = [
      ];
      this.dataSource = ELEMENT_DATA;
      const newElement: PeriodicElement = {
        name: element.name,
        position: 1,
        mobile: element.mobile,
        source: element.source,
        destination: element.destination,
        source_latitude: element?.source_latitude,
        destination_latitude: element?.destination_latitude,
        source_longitude: element?.source_longitude,
        destination_longitude: element?.destination_longitude,
        price: element?.price,
        distance: element?.distance,
        email:element?.email,
        riders_accepted:element?.driver_email_ids?element?.driver_email_ids.length:0,
        expired:element.expired?'Yes':'No'
      };
      ELEMENT_DATA.push(newElement);
      this.header_message= "Rejected Rides" ;
      element.status='Rejected';
      element.driver_email_id= this.loggedInUser.email;
      this.fetchRidesService.updateRides(element).subscribe((response: any) => {})
      alert("Ride Rejected !! ")
    }
    if (option == 'view' && element.name == 'Total Commissions Earned') {
      this.price=0;
      this.fetchRidesService.fetchRides(params).subscribe((response: any) => {
        response.result.forEach((ele: any, index: any) => {
          if (ele.status == 'Completed') {
            this.price+=ele.price;
    }})})
      this.isEnableAvailRides = false;
      this.totalCommission = true;
      this.totalrides = false;
    }
    if (option == 'view' && element.name == 'Total Rides Completed') {
       this.count=0;
      this.fetchRidesService.fetchRides(params).subscribe((response: any) => {
        response.result.forEach((ele: any, index: any) => {
          if (ele.status == 'Completed') {
            this.count++;
    }})})
      this.isEnableAvailRides = false;
      this.totalCommission = false;
      this.totalrides = true;
    }

    console.log('Element', element);
    console.log('Option', option);
  }
  openMap(payload:any)
  {
     let params = {
    source_latitude: payload?.source_latitude,
    destination_latitude: payload?.destination_latitude,
    source_longitude: payload?.source_longitude,
    destination_longitude: payload?.destination_longitude
    };
    this.router.navigate(['/googlemap'], { queryParams: params });
  }
}


