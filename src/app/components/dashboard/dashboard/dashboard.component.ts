import { Component, OnInit } from '@angular/core';
import { FetchRidesService } from '../../../services/fetch-rides.service'
import { Subscription } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
export interface PeriodicElement {
  name: string;
  position: number;
  source:string;
  destination:string;
  mobile:string
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

  displayedColumns: string[] = [
    'position',
    'name',
    'mobile',
    'source',
    'destination',
    'map',
    'accept',
    'reject',
  ];
  dataSource = ELEMENT_DATA;
  displayedHeaders: string[] = ['position', 'name', 'view'];
  headerSource = MAIN_HEADERS;

  constructor(public fetchRidesService: FetchRidesService , public router :Router) {}

  ngOnInit(): void {
    // this.subscriptions.push(this.authService.loginUser(params).subscribe((response: any) => {
    //   console.log("RESPONSE  : " ,response)
    // }))
  }
  onButtonClick(element: any, option: any) {
    if (option == 'view' && element.name == 'Available Rides') {
      const ELEMENT_DATA: PeriodicElement[] = [
      ];
      this.dataSource = ELEMENT_DATA;
      let params = {};
      this.subscriptions.push(
        this.fetchRidesService.fetchRides(params).subscribe((response: any) => {
          console.log('REEEEEEEEEE', response.result);
          response.result.forEach((ele: any, index: any) => {
            console.log('response : ', response);
            const newElement: PeriodicElement = {
              name: ele.name,
              position: index + 1,
              mobile: ele.mobile,
              source: ele.source,
              destination: ele.destination,
            };
            ELEMENT_DATA.push(newElement);
            console.log('ELEMENT : ', ELEMENT_DATA);
          });

          this.dataSource = ELEMENT_DATA;
          this.isEnableAvailRides = true;
          this.totalCommission = false;
          this.totalrides = false;
          console.log('Response : 67 ------------------ ', this.dataSource);
        })
      );
    }
    if (option == 'view' && element.name == 'Total Commissions Earned') {
      this.isEnableAvailRides = false;
      this.totalCommission = true;
      this.totalrides = false;
    }
    if (option == 'view' && element.name == 'Total Rides Completed') {
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
      source: payload?.source,
      destination: payload?.destination,
    };
    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     data: params
    //   }
    // };
    console.log("Payload : ++++++++++++++++++ ", payload)
    this.router.navigate(['/googlemap'], { queryParams: params });
  }
}


