import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  // directionsService:any;
  // directionsRenderer:any;
  receivedData:any;
  constructor(private router:Router , private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      this.receivedData = params;
     })
    this.initMap();
  }

  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(37.7749, -122.4194), // Set your desired location
      zoom: 8
    };
console.log("MMMMMMMMMMMMMAAAAAAAAAAA" , this.mapContainer);
    // Ensure the map container exists before initializing the map
    if (this.mapContainer) {
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    } else {
      console.error('Map container element is not available.');
    }
    google.maps.event.addListener(this.map,"click",(event) =>
      {
       this.map.setOptions({
          scrollwheel:true
        })
      } )
      let directionsService=new google.maps.DirectionsService();
      let directionsRenderer=new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(this.map);

      // let request =
      // {
      //   origin:this.receivedData.source,
      //   destination:this.receivedData.destination,
      //   travelMode:google.maps.TravelMode.DRIVING
      // }
      const request: google.maps.DirectionsRequest = {
        origin: { lat: 41.85, lng: -87.65 }, // Example origin
        destination: { lat: 41.85, lng: -87.65 }, // Example destination
        travelMode: google.maps.TravelMode.DRIVING, // Use the appropriate travel mode enum value
      };

      console.log("RRRRRRRRRRRRRRRRRR" , request);

      directionsService.route(request,(result:any,status:any) =>
    {
      console.log("RES : " ,result)
      if(status=='OK')
        {
          directionsRenderer.setDirections(result);
        }
    })


  }
  moveToDashboard()
  {
    this.router.navigate(['/dashboard']);
  }
  //   const mapOptions = {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8
  //   };
  //   const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
  //   google.maps.event.addListener(map,"click",(event) =>
  // {
  //   map.setOptions({
  //     scrollwheel:true
  //   })
  // } )
  }
