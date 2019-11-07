import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ApiService } from "src/services/api.service";

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
    this.getExercises(this.params.workId);
  }

  getExercises(workoutId) {
    this.api.getExercises().subscribe(
      data => {
        data.data.workouts.forEach(w => {
          this.exc.push(w);
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
