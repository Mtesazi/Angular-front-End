import { Component,OnInit  } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  employee : Employee = new Employee();
  constructor(private employeeService : EmployeeService, private router: Router){}

  onSubmit(){
    
   }
}
