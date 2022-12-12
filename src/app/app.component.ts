import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmployeeServicesService } from '../services/employee-services.service';
import { FormGroup, FormControl, Validators, FormBuilder,FormsModule,ReactiveFormsModule }  from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'theLightBulb';
  allEmployee : any;
  public employeeForm!: FormGroup;
  submitted = false;
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  constructor( private form: FormBuilder, public employeeService : EmployeeServicesService ){}

  ngOnInit(){
    this.getAllEmployee();
    this.createRegistrationFrom();
  }

  private createRegistrationFrom() {
    this.employeeForm = this.form.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      emailId:    ['', [Validators.required]],
      dept: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      empId: ['']
    });
  }
  
  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe(emp =>{
      var json = JSON.parse( emp );
      this.allEmployee = json.data;
    });
  }

  onSubmitEmployee() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      this.submitted = true;
      return;
    }
      if (!this.employeeForm.valid) {
        return;
      }
      var contectDetail= {
        id: this.employeeForm.value.empId,
        empdata: {
            "fname":  this.employeeForm.value.fname,
            "lname": this.employeeForm.value.lname,
            "emailId": this.employeeForm.value.emailId,
            "dept": this.employeeForm.value.dept,
            "dob" : this.employeeForm.value.dob,
          }}
          this.employeeService.updateEmployee(contectDetail).subscribe(empRes =>{
            this.closeBtn.nativeElement.click();
            this.getAllEmployee();
          });
}

  employeeProfile(id : any){
    let employeeDeta = this.allEmployee.find((val: { empId: any; }) =>val.empId  == id);
    this.employeeForm.setValue({empId:employeeDeta.empId,fname:employeeDeta.fname, lname:employeeDeta.lname, emailId:employeeDeta.emailId, dept:employeeDeta.dept, dob:employeeDeta.dob})
  }

  closeModel(){
    this.employeeForm.setValue({empId:"",fname:"", lname:"", emailId:"", dept:"", dob:""})
  }

}



