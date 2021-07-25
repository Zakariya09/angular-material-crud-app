import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/studen.model';
import {MatDialog} from '@angular/material/dialog';
import { UserDataService } from 'src/app/services/user-data.service';
export interface DialogData extends Student {
  isEdit?: boolean;
}
interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  studentForm: FormGroup;
  isSubmitted = false;

  isEdit = false;
  types: Gender[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
    {value: 'other', viewValue: 'Other'}
  ];

  dataSource: Array<Student> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<RegistrationFormComponent>,
    private studentService: UserDataService
    ) { }

    ngOnInit() {
      this.studentForm = this.fb.group({
        firstName:['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
        middleName:['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
        lastName:['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        dob:['', Validators.required],
        gender:['', Validators.required],
        contactNo:['', Validators.required],
        motherToungue:['', Validators.required],
        religion:['', Validators.required],
        fatherName:['', Validators.required],
        annualIncome:['', Validators.required]
      });
    }

    get f() {
      return this.studentForm.controls;
    }

    onSubmit():void{
      this.isSubmitted = true;
      if (this.studentForm.invalid) return;
      this.studentService.storeData(this.studentForm.value);
      this.getStudentData();
      this.dataSource = this.studentForm.value;
      console.log('this.studentForm.value');
      console.log(this.studentForm.value);

      this.dialogRef.close(this.studentForm.value);
    }

    getStudentData():void{
      this.dataSource = this.studentService.getData();
    }

  }
