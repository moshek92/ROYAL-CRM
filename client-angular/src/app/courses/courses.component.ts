import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api.service';
import {Course, CourseSort, FilePath, sortColumn } from '../shared/types';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

    customers!: Array<Course>;
    //countries!: Array<Country>;
    searchFieldValue!: string;
    searchTerm!: string;
    tableSort!: CourseSort;
    showForm = false;
    showNotification = false;

    coursesForm = new FormGroup({
      Course: new FormControl('', {
            validators: Validators.required
        }),
        declaration:  new FormControl('', {
          validators: Validators.required
      }),
      Price: new FormControl('', {
            validators: Validators.required
        }),
      
    });
  course: any;
  courseForm: any;

    onSubmit() {
        if (!this.coursesForm.valid) {
            return;
        }

        this.apiService.addCourse(this.courseForm.value).subscribe({
            next: (data: Course) => {
                this.getCourses();
                this.showNotification = true;
            },
            error: (err: any) => console.error(err)
        })
    }
  getCustomers() {
    throw new Error('Method not implemented.');
  }

    notificationClosed(state: boolean) {
        this.showForm = false;
        this.courseForm.reset();
        this.showNotification = state;
    }

    toggleForm() {
        this.showForm = !this.showForm;
    }

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
      
        this.getCourses();

        this.tableSort = {
            column: 'name',
            dirAsc: true
        };
    }
 /*  getCourses() {
    throw new Error('Method not implemented.');
  } */

    getCourses() {
        this.apiService.getCoursesList().subscribe({
            next: (data: Array<Course>) => { this.customers = data },
            error: (err: any) => console.error(err),
            // complete: () => console.log(`complete`)
        })
    }

   

    CoursesTotal(): number {
        return this.course ? this.course.length : 0;
    }

    exportCoursesData() {
        this.apiService.exportCourse();
        subscribe({
            next: (data: FilePath) => {
                window.open(`${environment.serverUrl}/${data.name}`);
            },
            error: (err: any) => console.error(err),
        })
    }

    findCourse(event: KeyboardEvent) {
        const value = this.searchFieldValue;

        if (event.key === 'Enter' && value.length >= 3) {
            this.apiService.findCourse(value).subscribe({
                next: (data: Array<Course>) => { this.course = data },
                error: (err: any) => console.error(err),
            })
        }
    }

    clearSearch() {
        this.searchFieldValue = '';
        this.getCourses();
    }

    sortCourses(column: sortColumn) {
        if (this.tableSort.column === column) {
            this.tableSort.dirAsc = !this.tableSort.dirAsc;
        }
        else {
           // this.tableSort.column = column;
            this.tableSort.dirAsc = true;
        }

        const direction = this.tableSort.dirAsc ? 'ASC' : 'DESC';

        this.apiService.getSortedCourses(column, direction).subscribe({
            next: (data: Array<Course>) => { this.course = data },
            error: (err: any) => console.error(err)
        })
    }

    displaySort(column: sortColumn): string {
        if (this.tableSort.column === column) {
            return this.tableSort.dirAsc ? 'bi-chevron-up' : 'bi-chevron-down';
        }
        return 'bi-chevron-expand';
    }
}


function subscribe(_arg0: { next: (data: FilePath) => void; error: (err: any) => void; }) {
  throw new Error('Function not implemented.');
}

