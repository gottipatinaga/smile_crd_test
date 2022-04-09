import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-filter',
  templateUrl: './patient-filter.component.html',
  styleUrls: ['./patient-filter.component.scss'],
})
export class PatientFilterComponent implements OnInit {
  @Output() onSubmitClick = new EventEmitter();
  filterForm: FormGroup;
  constructor() {}
  ngOnInit() {
    this.filterForm = new FormGroup({
      given: new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
      family: new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
    });
  }

  onSubmit() {
    if (
      !!this.filterForm.value &&
      (this.filterForm.value.given || this.filterForm.value.family)
    ) {
      this.onSubmitClick.emit(this.filterForm.value);
    }
  }

  onReset() {
    this.filterForm.reset();
    this.onSubmitClick.emit();
  }
}
