import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api.service';
import { course} from '../shared/types';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

    courses!: Array<course>;

    constructor(private apiService: ApiService) { }

  ngOnInit(): void {
   this.getCourses();
  }

 
  getCourses() {
    throw new Error('Method not implemented.');
  }

    /* getCourses() {
       this.apiService.getCoursesList();.subscribe({
        next: (data: Array<course>) => { this.courses = data },
        error: (err: any) => console.error(err),
    })
    } */

    imagePath(image: string | null): string {
        return !image ? '' : `../../assets/images/${image}`;
    }

    exportCoursesData() {
      this.apiService.exportCourse();/* .subscribe({
        next: (data: FilePath) => {
            window.open(`${environment.serverUrl}/${data.name}`);
        },
        error: (err: any) => console.error(err),
    }) */
    }

    CoursesTotal(): number {
        return this.courses ? this.courses.length : 0;
    }

}
