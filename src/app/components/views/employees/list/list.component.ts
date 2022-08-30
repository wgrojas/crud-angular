import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employees.interface';
import { EmployeesService } from 'src/app/services/employees.service';
import { MessagesService } from 'src/app/services/messages.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  employees: IEmployee[] = [];

  @Output() eventSave = new EventEmitter<IEmployee>();

  constructor(
    private _employeesService: EmployeesService,
    private _messageService: MessagesService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this._employeesService.getEmployess$().subscribe((data) => {
      this.employees = data;
      // console.log(this.employees);
    });
  }

  edit(id: any) {
    // debugger
    // console.log(employee.id);
    this.router.navigate(['edit', id]);
  }

  delete(id: any) {
    Swal.fire({
      icon: 'question',
      title: 'Eliminar al empleado',
      html:'Estas seguro de eliminar al empleado',
      showCancelButton: true,
      confirmButtonText: 'OK',
      confirmButtonColor: '#44cb6c',
      background: '#c9daed',
    })
    .then((res) => {
      if (res.value) {
        this._employeesService
          .deleteEmployee(id)
          .then((res) => {
            console.log(res);
            this.spinner.hide();
            this._messageService.successMessage(
              'Empleado eliminado',
              'El empleado ha sido eliminado exitosamente'
            );
          })
          .catch((err) => {
            console.log(err);
            this.spinner.hide();
            this._messageService.errorMessage(
              'Error',
              'No fue posible eliminar al empleado',
              err.message
            );
          });
      }
    });
  }

  view(employee: IEmployee) {
    this.router.navigate(['details', employee.id]);
  }
}
