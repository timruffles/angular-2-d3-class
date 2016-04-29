import { Component } from "angular2/core";
import { Chart } from "./Chart.component";
import { ChartControl } from "./ChartControl.component";


@Component({
   selector: "app",
    directives: [Chart, ChartControl],
   template: `
        <chart></chart>

        <chart-control
            (filtered)="setFilter($event)"
          [maxAge]="datasetMaxAge">
        </chart-control>


        <h1 [title]="myProperty"
            [style.color]="fontColor" 
            [style.font-size.px]="fontSize" 
             >{{ message }}</h1>
        <button (click)="changeSize(2)">+</button>
        <button (click)="changeSize(-2)">-</button>
    `,
})
export class App {
   message: string;
   myProperty: string;
   fontColor: string;
    fontSize: number = 12;
    datasetMaxAge: number = 144;
   
   
   // Don't do 'constructor(public x)' for Component constructors,
   // assign in body instead
   constructor() {
      this.message = "hello there";
      this.myProperty = "I will display on hover";
      this.fontColor = 'orange';
      
   }
    
    setFilter(event: any) {
      console.log(event);
    }
    
    changeSize(delta: number) {
        this.fontSize+= delta;
    }
}


