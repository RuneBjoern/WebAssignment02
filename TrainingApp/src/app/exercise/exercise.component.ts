import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ApiService } from "src/services/api.service";
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

@Component({
  selector: "app-exercise",
  templateUrl: "./exercise.component.html",
  styleUrls: ["./exercise.component.scss"]
})
export class ExerciseComponent implements OnInit {
  params: Params;
  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) {
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

  getRouteParams() {
    // Route parameters
    this.activatedRoute.params.subscribe(p => {
      this.params = p;
    });
  }
}
