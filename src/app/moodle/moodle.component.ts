import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { API } from '../../api';

@Component({
  selector: 'app-moodle',
  templateUrl: './moodle.component.html',
  styleUrls: ['./moodle.component.css']
})
export class MoodleComponent implements OnInit {

  public usernameInput: string;
  public passwordInput: string;
  public token: string;
  public courses: any[] = [];
  public userid: number;
  public selCourse: any;

  constructor(
    public dataService: DataService
  ) { }

  ngOnInit() {
    if (localStorage.getItem(this.dataService.LS_MOODLE_TOKEN) !== null) {
      this.token = localStorage.getItem(this.dataService.LS_MOODLE_TOKEN);
      if (localStorage.getItem(this.dataService.LS_MOODLE_INFO) !== null) {
        const user: any = JSON.parse(localStorage.getItem(this.dataService.LS_MOODLE_INFO));
        this.userid = user.userid;
        this.getCourses();
      } else {
        this.getInfo();
      }
    }
  }

  login() {
    this.dataService.FireGET<any>(API.MoodleLogin, {
      username: this.usernameInput,
      password: this.passwordInput,
      service: 'moodle_mobile_app'
    }).subscribe(result => {
      localStorage.setItem(this.dataService.LS_MOODLE_TOKEN, result.token);
      this.token = result.token;
      this.getInfo();
    });
  }

  getInfo() {
    this.dataService.FireGET<any>(API.MoodleInfo, {
      wstoken: this.token,
      wsfunction: API.MoodleFunInfo,
      moodlewsrestformat: API.MoodleFormat
    }).subscribe(result => {
      localStorage.setItem(this.dataService.LS_MOODLE_INFO, JSON.stringify(result));
      this.userid = result.userid;
      this.getCourses();
    });
  }

  getCourses() {
    console.log(this.userid);
    this.getUserFun(API.MoodleFunCourses).subscribe(result => {
      this.courses = result;
    });
  }

  openCourse(course: any) {
    this.dataService.FireGET<any[]>(API.MoodleCourseFun, {
      wstoken: this.token,
      wsfunction: API.MoodleFunCourse,
      moodlewsrestformat: API.MoodleFormat,
      courseid: course.id
    }).subscribe(result => {
      this.selCourse = result;
    });
  }

  getUserFun(func: string) {
    return this.dataService.FireGET<any[]>(API.MoodleUserFun, {
      wstoken: this.token,
      wsfunction: func,
      moodlewsrestformat: API.MoodleFormat,
      userid: this.userid
    });
  }

}
