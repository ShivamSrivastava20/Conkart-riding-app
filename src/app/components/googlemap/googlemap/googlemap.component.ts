import { animation } from '@angular/animations';
import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
declare var google:any;
@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) mapElementRef!: ElementRef;
 
  center={ lat:12.9716 , lng:77.5946 };

  source={lat:13.0055,lng:77.5692};
  destination={lat:12.9121,lng:77.6446}
  
  googleMaps: any;
  map:any;
  marker:any;
  mapListener:any;
  markerListener:any;
  intersectionObserver:any;
  receivedData:any;
  private renderer=inject(Renderer2)
  constructor(private router:Router , private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      this.receivedData = params;
      console.log("/////////////////",this.receivedData)
     })
     this.loadMap();
  }
async loadMap()
{
  const { Map } = await google.maps.importLibrary("maps");
  const mapEl = this.mapElementRef.nativeElement ;
  const location=new google.maps.LatLng(this.center.lat,this.center.lng);
  const source_loc=new google.maps.LatLng( this.receivedData.source_latitude,this.receivedData.source_longitude);
  const destination_loc=new google.maps.LatLng(this.receivedData.destination_latitude,this.receivedData.destination_longitude);


  this.map=new Map(mapEl,
    {
      center:location,
      zoom : 14,
      mapId:'123456789',
    }
  )
this.addLocation(source_loc,destination_loc)
}
async addLocation(source_loc:any ,destination_loc:any )
{
  console.log("LOCATION : " , location)
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  this.marker=new AdvancedMarkerElement(
    {
      map:this.map,
      position:source_loc,
      gmpDraggable:true
    }
  )

  this.marker=new AdvancedMarkerElement(
    {
      map:this.map,
      position:destination_loc,
      gmpDraggable:true
    }
  )

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
