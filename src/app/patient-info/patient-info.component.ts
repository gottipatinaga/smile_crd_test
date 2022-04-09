import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientsDetailsService } from '../services/patients-details.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss'],
})
export class PatientInfoComponent implements OnInit {
  patientsDetails$: Observable<any>;
  constructor(
    private readonly patientsDetailsService: PatientsDetailsService
  ) {}

  ngOnInit(): void {
    this.patientsDetails$ = this.patientsDetailsService.getPatientsDetails();
  }
  onFilter(event) {
    this.patientsDetails$ =
      this.patientsDetailsService.getPatientsDetails(event);
  }
}
