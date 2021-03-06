import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService,private router:Router) { }

  ngOnInit(){
    this.getTutorials();
  }

  getTutorials() {
    this.tutorialService.getAll()
      .subscribe(
        data => {this.tutorials = data;console.log(data); },
        error => {
          console.log(error);
        });
  }

 

  delete(id:number) {

    this.tutorialService.delete(id).subscribe (
        response =>{ this.getTutorials; console.log(id)}
    );
  }
  view(id:number) {

    this.tutorialService.get(id).subscribe (
        response =>{ this.getTutorials; console.log(id)}
    );
  }
  rederige(id:number){
    this.router.navigate(['details', id])
  }
  edit(id:number){
    this.router.navigate(['add',id])
  }




















  refreshList(): void {
    this.getTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;

    this.tutorialService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  navigateTo(){
    this.router.navigate(['add'])
  }



}
