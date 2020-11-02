import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentListComponent } from './student-list/student-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { TabNavBarComponent } from './tab-nav-bar/tab-nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddFacultyDialogComponent } from './dialogs/add/add-faculty-dialog/add-faculty-dialog.component';
import { EditFacultyDialogComponent } from './dialogs/edit/edit-faculty-dialog/edit-faculty-dialog.component';
import { DeleteFacultyDialogComponent } from './dialogs/delete/delete-faculty-dialog/delete-faculty-dialog.component';
import { AddStudentDialogComponent } from './dialogs/add/add-student-dialog/add-student-dialog.component';
import { DeleteStudentDialogComponent } from './dialogs/delete/delete-student-dialog/delete-student-dialog.component';
import { EditStudentDialogComponent } from './dialogs/edit/edit-student-dialog/edit-student-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    FacultyListComponent,
    TabNavBarComponent,
    AddFacultyDialogComponent,
    EditFacultyDialogComponent,
    DeleteFacultyDialogComponent,
    AddStudentDialogComponent,
    DeleteStudentDialogComponent,
    EditStudentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [ { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
