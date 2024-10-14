import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './components/containers/map/map.component';
import { FormComponent } from './components/containers/form/form.component';

export type MarkerT = {
  name: string;
  lng: number;
  lat: number
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'map-app';
  markers: MarkerT[] = [];

  formSubmit(event: MarkerT[]) {
    this.markers = event;
  }
}
