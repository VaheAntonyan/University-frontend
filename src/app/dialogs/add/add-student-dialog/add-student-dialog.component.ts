import { StudentService } from './../../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Faculty } from 'src/app/models/faculty';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss']
})
export class AddStudentDialogComponent {

  private student : Student = new Student();
  faculties: Faculty[];
  constructor(public dialogRef: MatDialogRef<AddStudentDialogComponent>, private studentService: StudentService, private facultyService: FacultyService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.facultyService.getFacultyList().subscribe(data => {
      this.faculties = data;
    });
  }

  addStudentFormGroup = this.fb.group({
    firstNameFormControl: ['', Validators.required],
    lastNameFormControl: ['', Validators.required],
    yearFormControl: ['', Validators.required],
    facultyIdFormControl: ['', Validators.required]
  });

  get firstNameFormControl() {
    return this.addStudentFormGroup.get('firstNameFormControl')
  }

  get lastNameFormControl() {
    return this.addStudentFormGroup.get('lastNameFormControl')
  }

  get yearFormControl() {
    return this.addStudentFormGroup.get('yearFormControl')
  }

  get facultyIdFormControl() {
    return this.addStudentFormGroup.get('facultyIdFormControl')
  }

  onSaveClick() {
    this.updateStudentObj();
    this.saveStudent();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  updateStudentObj() {
    this.student.firstName = this.firstNameFormControl.value.trim();
    this.student.lastName = this.lastNameFormControl.value.trim();
    this.student.year = this.yearFormControl.value;
    this.student.faculty = this.faculties.find(faculty => faculty.id == this.facultyIdFormControl.value);
  }

  saveStudent() {
    this.studentService.createStudent(this.student)
      .subscribe( 
        data => this.dialogRef.close(data),
        error => console.log(error)
      );
  }
}
