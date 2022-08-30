import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employees.interface';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  
  employee:IEmployee={} as IEmployee
  id:string=''


  constructor(
    private activatedRoute: ActivatedRoute,
    private _employeeService:EmployeesService,
    private router:Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
    })
  }
  ngOnInit(): void {
    this.getEmployee()
   

    }

  getEmployee(){
    this._employeeService.getEmployee$(this.id).subscribe(data=>{
      console.log(data)
      this.employee=data

    })
  }

 

  }


