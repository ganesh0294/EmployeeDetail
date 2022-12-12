import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmployeeServicesService {
  private url= environment.API_URL

  constructor(public http : HttpClient) { }

  getAllEmployee(){
    return this.http.get(this.url+'/employees', {responseType: 'text'});
  }

  updateEmployee(empDetail:any){
    return this.http.put(this.url+`/employees/${empDetail.id}`, empDetail.empdata, {responseType: 'text'});
  }
}
