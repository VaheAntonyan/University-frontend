import { DeleteFacultyDialogComponent } from './../dialogs/delete/delete-faculty-dialog/delete-faculty-dialog.component';
import { AddFacultyDialogComponent } from './../dialogs/add/add-faculty-dialog/add-faculty-dialog.component';
import { FacultyService } from './../services/faculty.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Faculty } from '../models/faculty';
import { MatDialog } from '@angular/material/dialog';
import { EditFacultyDialogComponent } from '../dialogs/edit/edit-faculty-dialog/edit-faculty-dialog.component';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.scss']
})
export class FacultyListComponent implements OnInit {

  faculties: Faculty[];
  dataSource: MatTableDataSource<Faculty>;

  constructor(private facultyServise: FacultyService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFaculties();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddFacultyDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.refreshTable();
      }
    });
  }

  editItem(id: number, name: string) {
    const dialogRef = this.dialog.open(EditFacultyDialogComponent, {
      data: {id: id, name: name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let faculty = this.dataSource.data.find(x => x.id === id);
        Object.assign(faculty, result);
        this.refreshTable();
      }
    });
  }

  deleteItem(id: number, name: string) {
    const dialogRef = this.dialog.open(DeleteFacultyDialogComponent, {
      data: {id: id, name: name}
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

  getFaculties() {
    this.facultyServise.getFacultyList().subscribe(data => {
      this.faculties = data;
      this.dataSource = new MatTableDataSource(this.faculties);
    });
  }

  displayedColumns: string[] = ['id', 'name', 'actions'];
}
