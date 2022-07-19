import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api.service';
import { Course, FilePath, Product } from '../shared/types';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

    courses!: Array<Course>;

    constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

 
  getCourses() {
    throw new Error('Method not implemented.');
  }

    getCourse() {
       //this.apiService.getCoursesList().subscribe({
       //    next: (data: Array<Product>) => { this.courses = data },
       //     error: (err: any) => console.error(err),
       //})
    }

    imagePath(image: string | null): string {
        return !image ? '' : `../../assets/images/${image}`;
    }

    exportCourseData() {
        //this.apiService.exportCourses().subscribe({
         // next: (data: FilePath) => {
          //      window.open(`${environment.serverUrl}/${data.name}`);
          // },
           // error: (err: any) => console.error(err),
       //})
    }

    CoursesTotal(): number {
        return this.courses ? this.courses.length : 0;
    }

}
