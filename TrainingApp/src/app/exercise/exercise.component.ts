import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ApiService } from "src/services/api.service";
import { Router } from '@angular/router';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

@Component({
  selector: "app-exercise",
  templateUrl: "./exercise.component.html",
  styleUrls: ["./exercise.component.scss"]
})
export class ExerciseComponent implements OnInit {
  params: Params;
  constructor(private api: ApiService, private activatedRoute: ActivatedRoute,  private router: Router) {
    this.getRouteParams();
  }

  public exc = [];

  ngOnInit() {
    console.log(this.params.workId)
    this.getExercises(this.params.workId);
  }

  getExercises(workoutId) {
    this.api.getExercises(workoutId).subscribe(
      data => {
        this.exc = []
        data.data.exercises.forEach(e => {
          this.exc.push(e);
        });
        console.log(this.exc);
      },
      err => {
        console.log(err.message);
      },
      () => {
        console.log("Complete");
      }
    );
  }

  createExercise(formValue){
    this.api.postExercise({
      workoutId: this.params.workId,
      exercisename: formValue.eName,
      exercisedescription: formValue.eDesc,
      numberofsets: formValue.eSets,
      numberofreps: formValue.eReps
  }).subscribe();
    this.getExercises(this.params.workId);
  }

  

  getRouteParams() {
    // Route parameters
    this.activatedRoute.params.subscribe(p => {
      this.params = p;
    });
  }

  logout(){
    localStorage.removeItem('JWT');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
