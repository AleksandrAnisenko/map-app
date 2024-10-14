import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from "leaflet";
import "leaflet-routing-machine";
import { MarkerT } from '../../../app.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})

export class MapComponent implements OnChanges{
  @Input() markers!:MarkerT[];
  map!: L.Map;
  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      })
    ],
    zoom: 12,
    center: L.latLng(59.9386, 30.3141)
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['markers'].firstChange) {
      const waypoints = this.markers.map(marker => L.latLng(marker.lat, marker.lng))
      const planOptions = { addWaypoints: false, draggableWaypoints: false};
    const plan = new L.Routing.Plan(waypoints, planOptions);
    L.Routing.control({
      show: false,
      plan,
    }).addTo(this.map);
    this.initMarkers();
    }
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }

  initMarkers() {
    const markers = this.markers.map(marker => {
      return {
        position: {lat: marker.lat, lng: marker.lng},
        draggable: false,
        name: marker.name
      }
    })

    for (let index = 0; index < markers.length; index++) {
      const data = markers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${data.name}</b> <br> <b>${data.position.lat} <br> ${data.position.lng}</b>`);
      this.map.panTo(data.position);
    }
  }

  generateMarker(data: any, index: number) {
    return L.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

}