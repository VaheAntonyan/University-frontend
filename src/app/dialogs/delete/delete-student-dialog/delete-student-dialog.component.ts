import { StudentService } from './../../../services/student.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-student-dialog',
  templateUrl: './delete-student-dialog.component.html',
  styleUrls: ['./delete-student-dialog.component.scss']
})
export class DeleteStudentDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteStudentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  confirmDelete() {
    this.studentService.deleteStudent(this.data.id)
      .subscribe( 
        data => this.dialogRef.close(data),
        error => console.log(error)
      );
  }
}
