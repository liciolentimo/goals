import { Component, OnInit } from '@angular/core';
import {Goal} from '../goal';
import {Goals} from '../goals';
import {GoalService} from '../goals/goal.service';
import {AlertsService} from '../alert-service/alerts.service';
import {HttpClient} from '@angular/common/http';
import {Quote} from '../quote-class/quote';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  providers:[GoalService], //add the providers to the component
})
export class GoalComponent implements OnInit {

  goals:Goal[];
  alertService:AlertsService;
  quote:Quote;

//   goals = [
//     new Goal(1,'Watch Finding Nemo','Find an online version and watch merlin find his son',new Date(2018,3,14)),
//     new Goal(2,'Buy Cookies','I have to buy cookies for the parrot',new Date(2019,6,9)),
//     new Goal(3, 'Get new Phone Case','Diana has her birthday coming up soon',new Date(2019,1,12)),
//     new Goal(4, 'Get Dog Food','Pupper likes expensive sancks',new Date(2019,5,18)),
//     new Goal(5, 'Solve math homework','Damn Math',new Date(2019,2,14)),
//     new Goal(6, 'Plot my world domination plan','Cause I am an evil overlord',new Date(2018,3,14)),
// ]

addNewGoal(goal){
  let goalLength = this.goals.length;
  goal.id=goalLength+1;
  goal.completeDate = new Date(goal.completeDate)
  this.goals.push(goal)

}

deleteGoal(isComplete,index){
  if (isComplete){
    let toDelete=confirm(`Are you sure you want to delete ${this.goals[index].name}`)

    if(toDelete){
      this.goals.splice(index,1);
      this.alertService.alertMe("Goal has been deleted");
      }
      }
    }

toogleDetails(index){
  this.goals[index].showDescription = !this.goals[index].showDescription;
}

  constructor(goalService:GoalService,alertService:AlertsService,private http:HttpClient) {
    this.goals = goalService.getGoals();
    this.alertService = alertService;//make the service available to the class
   }

  ngOnInit() {
    interface ApiResponse{
      quote:string;
      author:string
  }
    this.http.get<ApiResponse>("https://talaikis.com/api/quotes/random/").subscribe(data=>{
      this.quote= new Quote(data.quote,data.author)
    },
    err=>{
      this.quote= new Quote("Never, never, never give up.","winston churchill")
      console.log("Error occured ")
  })
  }

}
