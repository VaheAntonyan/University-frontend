import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacultyService } from 'src/app/services/faculty.service';
import { EditFacultyDialogComponent } from '../../edit/edit-faculty-dialog/edit-faculty-dialog.component';

@Component({
  selector: 'app-delete-faculty-dialog',
  templateUrl: './delete-faculty-dialog.component.html',
  styleUrls: ['./delete-faculty-dialog.component.scss']
})
export class DeleteFacultyDialogComponent {
  constructor(public dialogRef: MatDialogRef<EditFacultyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private facultyService: FacultyService) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  confirmDelete() {
    this.facultyService.deleteFaculty(this.data.id)
      .subscribe( 
        data => this.dialogRef.close(data),
        error => console.log(error)
      );
  }
}
