import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  id!: number;
  employee: Employee = new Employee();

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');

    if (!routeId) {
      this.router.navigate(['/employees']);
      return;
    }

    this.id = Number(routeId);

    this.employeeService.getEmployeeById(this.id).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => console.log(error)
    );
  }

  onSubmit(): void {
    if (!this.id) {
      return;
    }

    this.employeeService.updateEmployee(this.id, this.employee).subscribe(
      () => {
        this.goToEmployeeList();
      },
      (error) => console.log(error)
    );
  }

  goToEmployeeList(): void {
    this.router.navigate(['/employees']);
  }
}
