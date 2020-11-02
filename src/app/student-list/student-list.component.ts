import { DeleteStudentDialogComponent } from './../dialogs/delete/delete-student-dialog/delete-student-dialog.component';
import { EditStudentDialogComponent } from './../dialogs/edit/edit-student-dialog/edit-student-dialog.component';
import { AddStudentDialogComponent } from './../dialogs/add/add-student-dialog/add-student-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: Student[];
  dataSource: MatTableDataSource<Student>;

  constructor(private studentService: StudentService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStudents();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddStudentDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.refreshTable();
      }
    });
  }

  editItem(id: number, firstName: string, lastName: string, year: number, facultyId: number) {
    console.log(`id =  ${id} ; before dialog`);
    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      data: {id: id, firstName: firstName, lastName: lastName, year: year, facultyId: facultyId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`id =  ${id} ; after dialog`);
        console.log(result);
        let student = this.dataSource.data.find(x => x.id === id);
        Object.assign(student, result);
        this.refreshTable();
      }
    });
  }

  deleteItem(id: number, firstName: string, lastName: string, year: number, facultyName: string) {
    const dialogRef = this.dialog.open(DeleteStudentDialogComponent, {
      data: {id: id, firstName: firstName, lastName: lastName, year: year, facultyName: facultyName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const foundIndex = this.dataSource.data.findIndex(x => x.id === id);
        this.dataSource.data.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.dataSource.filter = '';
  }

  getStudents() {
    this.studentService.getStudentList().subscribe(data => {
      this.students = data;
      this.dataSource = new MatTableDataSource(this.students);
    });
  }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'year', 'facultyName', 'actions'];
}
