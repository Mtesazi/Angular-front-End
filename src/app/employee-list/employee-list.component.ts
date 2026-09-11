import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => console.log(error)
    );
  }

  updateEmployee(id: number): void {
    this.router.navigate(['update-employee', id]);
  }

  employeeDetails(id: number): void {
    this.router.navigate(['employee-details', id]);
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        this.getEmployees();
      },
      (error) => console.log(error)
    );
  }
}