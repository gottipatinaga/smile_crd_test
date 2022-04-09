import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

export interface IpatientDetails {
  family: string;
  givenName: string;
  gender: string;
  birthDate: string;
  address: any;
  telecom: string;
}

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.scss'],
})
export class PatientTableComponent
  implements OnInit, OnChanges, AfterContentInit
{
  @Input() patientDetails$: Observable<any>;
  patientDetails;
  dataSource: any;
  queryDate: Date;
  errorPatientDetails: any;
  displayedColumns: string[] = [
    'family',
    'givenName',
    'gender',
    'birthDate',
    'telecom',
    'address',
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  ngAfterContentInit(): void {
    if (this.sort) {
      const sortState: Sort = { active: 'family', direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['patientDetails'].currentValue) {
    //   this.dataSource = new MatTableDataSource(
    //     changes['patientDetails'].currentValue
    //   );
    //   this.sortData();
    //   this.queryDate = new Date();
    // }
  }

  ngOnInit(): void {
    this.patientDetails$.subscribe({
      next: (patientDetails) => {
        this.dataSource = new MatTableDataSource(patientDetails);
        this.errorPatientDetails = null;
        this.sortData();
        this.queryDate = new Date();
      },
      error: (error) => {
        this.errorPatientDetails = error;
      },
    });
  }

  ngAfterViewInit() {}

  sortData() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'date': {
            let newDate = new Date(item.date);
            return newDate;
          }
          default: {
            return item[property];
          }
        }
      };
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
