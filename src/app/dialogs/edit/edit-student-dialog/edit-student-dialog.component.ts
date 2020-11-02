import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Faculty } from 'src/app/models/faculty';
import { Student } from 'src/app/models/student';
import { FacultyService } from 'src/app/services/faculty.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss']
})
export class EditStudentDialogComponent implements OnInit {

  private student : Student = new Student();
  faculties: Faculty[];
  constructor(public dialogRef: MatDialogRef<EditStudentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService, private facultyService: FacultyService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.facultyService.getFacultyList().subscribe(data => {
      this.faculties = data;
    });
  }

  editStudentFormGroup = this.fb.group({
    firstNameFormControl: [`${this.data.firstName}`, Validators.required],
    lastNameFormControl: [`${this.data.lastName}`, Validators.required],
    yearFormControl: [`${this.data.year}`, Validators.required],
    facultyIdFormControl: [`${this.data.facultyId}`, Validators.required],
  });

  get firstNameFormControl() {
    return this.editStudentFormGroup.get('firstNameFormControl')
  }

  get lastNameFormControl() {
    return this.editStudentFormGroup.get('lastNameFormControl')
  }

  get yearFormControl() {
    return this.editStudentFormGroup.get('yearFormControl')
  }

  get facultyIdFormControl() {
    return this.editStudentFormGroup.get('facultyIdFormControl')
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
    this.studentService.updateStudent(this.data.id, this.student)
      .subscribe( 
        data => this.dialogRef.close(data),
        error => console.log(error)
      );
  }

}
