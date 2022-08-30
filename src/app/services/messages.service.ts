import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  successMessage(title:string, message:string){
    Swal.fire({
      title: title,
      html:message,
      icon: 'success',
      confirmButtonText: "OK",
      confirmButtonColor: '#44cb6c',
      background:'#c9daed'
    })
  }

   questionMessage(title:string, message:string){
    Swal.fire({
      title: title,
      html:message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: '#44cb6c',
      background:'#c9daed'
    })
  }

  errorMessage(title:string, message:string, error:string){
    Swal.fire({
      title: title,
      html: `${message} <br> <b>${error}</b>` ,
      icon: 'error',
      confirmButtonText: "OK",
      confirmButtonColor: '#d52020',
      background:'#c9daed'
    })
  }
}