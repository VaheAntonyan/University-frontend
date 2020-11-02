import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Faculty } from 'src/app/models/faculty';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-edit-faculty-dialog',
  templateUrl: './edit-faculty-dialog.component.html',
  styleUrls: ['./edit-faculty-dialog.component.scss']
})
export class EditFacultyDialogComponent {

  private faculty : Faculty = new Faculty();
  constructor(public dialogRef: MatDialogRef<EditFacultyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private facultyService: FacultyService, private fb: FormBuilder) { }
 
  editFacultyFormGroup = this.fb.group({
    nameFormControl: [`${this.data.name}`, Validators.required]
  });

  get nameFormControl() {
    return this.editFacultyFormGroup.get('nameFormControl')
  }

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
    this.facultyService.updateFaculty(this.data.id, this.faculty)
      .subscribe( 
        data => this.dialogRef.close(data),
        error => console.log(error)
      );
  }
}
