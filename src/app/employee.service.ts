import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly baseUrl = `${environment.apiUrl}/employees`;
  private readonly useMockApi = environment.useMockApi;
  private readonly storageKey = 'mock-employees';
  private mockEmployees: Employee[] = this.loadMockEmployees();

  constructor(private readonly httpClient: HttpClient) {}

  getEmployeesList(): Observable<Employee[]> {
    if (this.useMockApi) {
      return of([...this.mockEmployees]);
    }

    return this.httpClient.get<Employee[]>(this.baseUrl);
  }

  createEmployee(employee: Employee): Observable<object> {
    if (this.useMockApi) {
      const nextId = this.mockEmployees.length
        ? Math.max(...this.mockEmployees.map((item) => item.id)) + 1
        : 1;

      const createdEmployee: Employee = {
        ...employee,
        id: nextId
      };

      this.mockEmployees.push(createdEmployee);
      this.persistMockEmployees();
      return of(createdEmployee);
    }

    return this.httpClient.post(this.baseUrl, employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    if (this.useMockApi) {
      const employee = this.mockEmployees.find((item) => item.id === id) ?? new Employee();
      return of({ ...employee });
    }

    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<object> {
    if (this.useMockApi) {
      const index = this.mockEmployees.findIndex((item) => item.id === id);

      if (index !== -1) {
        this.mockEmployees[index] = {
          ...employee,
          id
        };
        this.persistMockEmployees();
      }

      return of({});
    }

    return this.httpClient.put(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<object> {
    if (this.useMockApi) {
      this.mockEmployees = this.mockEmployees.filter((item) => item.id !== id);
      this.persistMockEmployees();
      return of({});
    }

    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  private loadMockEmployees(): Employee[] {
    if (typeof localStorage === 'undefined') {
      return this.getDefaultEmployees();
    }

    const storedValue = localStorage.getItem(this.storageKey);
    if (!storedValue) {
      return this.getDefaultEmployees();
    }

    try {
      const parsed = JSON.parse(storedValue) as Employee[];
      if (!Array.isArray(parsed)) {
        return this.getDefaultEmployees();
      }

      return parsed;
    } catch {
      return this.getDefaultEmployees();
    }
  }

  private persistMockEmployees(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.mockEmployees));
  }

  private getDefaultEmployees(): Employee[] {
    return [
      {
        id: 1,
        firstName: 'Amina',
        lastName: 'Khan',
        address: '45 Palm Grove',
        emailId: 'amina.khan@example.com',
        telephone: '+27 82 111 2233'
      },
      {
        id: 2,
        firstName: 'Leo',
        lastName: 'Moyo',
        address: '12 River Street',
        emailId: 'leo.moyo@example.com',
        telephone: '+27 82 444 5566'
      }
    ];
  }
}
