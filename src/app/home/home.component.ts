import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationFormComponent } from '../components/registration-form/registration-form.component';
import { Student } from '../models/studen.model';
import { UserDataService } from '../services/user-data.service';

export interface PeriodicElement {
  index:Number,
  name: string;
  dob: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'dob', 'actions'];
  dataSource = [];
students:Array<Student> =[]
  constructor(
    public dialog: MatDialog,
    private studentService: UserDataService
  ) { }

  ngOnInit() {
    this.getStudentData();
  }

  getStudentData():void{
    this.dataSource = JSON.parse(localStorage.getItem('studentData'));
  }

  openAddContactForm(): void {
    const dialogRef = this.dialog.open(RegistrationFormComponent, {
      width: '500px',
      disableClose : true,
      autoFocus : true,
      data: {
        isContactEdit: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${JSON.stringify(result)}`);
      // this.dataSource.push(result);

    });
  }

}
