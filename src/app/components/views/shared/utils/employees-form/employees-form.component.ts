import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employees.interface';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css'],
})
export class EmployeesFormComponent implements OnInit, AfterViewInit {
  @ViewChild('titulo') titulo: ElementRef = new ElementRef({});
  @Output() eventSave = new EventEmitter<IEmployee>();
  @Input() id: string = '';
  @Input() edit: boolean = false;

  employee: IEmployee = {} as IEmployee;
  employeeForm: FormGroup = new FormGroup({});
  title: string = 'New Employee';
  nameButton = 'add';
  reset = true;
  return = false;
  text: string = 'Hola';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _employeeService: EmployeesService
  ) {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    console.log(this.titulo);
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.edit == true) {
      this.getEmployee();
      this.title = 'Edit Employeer';
      this.nameButton = 'edit';
      this.reset = false;
      this.return = true;
    }
  }

  getEmployee() {
    this._employeeService.getEmployee$(this.id).subscribe((data) => {
      console.log(data);
      this.employeeForm.get('name')?.setValue(data.name);
      this.employeeForm.get('lastName')?.setValue(data.lastName);
      this.employeeForm.get('email')?.setValue(data.email);
      this.employeeForm.get('startDate')?.setValue(data.startDate);
    });
  }

  buildForm() {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      startDate: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.eventSave.emit(this.employeeForm.value);
    // this.router.navigate(['list']);
  }

  showWarning(controlName: string) {
    return (
      this.employeeForm.get(controlName)!.invalid &&
      this.employeeForm.get(controlName)!.touched
    );
  }

  resetForm() {
    this.employeeForm.reset();
  }

  get name(): AbstractControl | null {
    return this.employeeForm.get('name');
  }
  get lastName(): AbstractControl | null {
    return this.employeeForm.get('lastName');
  }
  get email(): AbstractControl | null {
    return this.employeeForm.get('email');
  }
  get startDate(): AbstractControl | null {
    return this.employeeForm.get('startDate');
  }
}
