import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Faculty } from 'src/app/models/faculty';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-add-faculty-dialog',
  templateUrl: './add-faculty-dialog.component.html',
  styleUrls: ['./add-faculty-dialog.component.scss']
})
export class AddFacultyDialogComponent {

  private faculty : Faculty = new Faculty();
  constructor(public dialogRef: MatDialogRef<AddFacultyDialogComponent>, private facultyService: FacultyService, private fb: FormBuilder) { }
  
  get nameFormControl() {
    return this.addFacultyFormGroup.get('nameFormControl')
  }

  addFacultyFormGroup = this.fb.group({
    nameFormControl: ['', Validators.required]
  });

  onSaveClick() {
    this.updateFacultyObj();
    this.saveFaculty();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  updateFacultyObj() {
    this.faculty.name = this.nameFormControl.value.trim();
  }

  saveFaculty() {
    this.facultyService.createFaculty(this.faculty)
      .subscribe( 
        data => this.dialogRef.close(data),
        error => console.log(error)
      );
  }
}
