import { Injectable } from '@angular/core';
import { Student } from '../models/studen.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
studentData: Array<Student> = [];
  constructor(
  ) { }

  //Save Student Data
  storeData(data):void{
    this.studentData.push(data);
    localStorage.setItem('studentData', JSON.stringify(this.studentData));
  }

  //Get Sudent Data
  getData(){
    return this.studentData;
  }

   //Delete Student Data
   deleteData(index):void{
    this.studentData.splice(index,1);
  }

}
