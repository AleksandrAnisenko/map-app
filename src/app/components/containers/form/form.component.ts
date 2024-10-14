import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormGroup, FormsModule, FormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {
  
@Output() formSubmit = new EventEmitter();

markerForm = new FormGroup({
  markers: new FormArray([ new FormGroup({
    name: new FormControl(''),
    lng: new FormControl(''),
    lat: new FormControl(''),
  })])
  
})

get markers() {
  return this.markerForm.get('markers') as FormArray;
}

addInputControl() {
  this.markerForm.controls.markers.push(new FormGroup({
    name: new FormControl(''),
    lng: new FormControl(''),
    lat: new FormControl(''),
  }));
}

onSubmit() {
  console.log(this.markerForm.value);
  this.formSubmit.emit(this.markerForm.value.markers);
}

}
  
