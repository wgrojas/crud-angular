import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from 'rxjs';
import { IEmployee } from '../interfaces/employees.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  EMPLOYEES_COLLECTION:string = "employees";

  constructor(private _fireStore: AngularFirestore
  ) { }
  
  getEmployess$(){
    return this._fireStore.collection<IEmployee>(this.EMPLOYEES_COLLECTION).snapshotChanges()
    .pipe(
      map(arreglo => arreglo.map(element => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data() as IEmployee
        }
      }))
    )
  }

  getEmployee$(id:string){
    return this._fireStore.collection<IEmployee>(this.EMPLOYEES_COLLECTION).doc(id).snapshotChanges()
      .pipe(
        map(element => {
          return {
            id: element.payload.id,
          ...element.payload.data() as IEmployee
          }
        })
      )
  }

  addEmployee(employee: IEmployee){
    return this._fireStore.collection<IEmployee>(this.EMPLOYEES_COLLECTION).add(employee);
  }
  
  editEmployee(id:any,employee:IEmployee){
    return this._fireStore.collection<IEmployee>(this.EMPLOYEES_COLLECTION).doc(id).update(employee);
  }

  deleteEmployee(id:string){
    return this._fireStore.collection<IEmployee>(this.EMPLOYEES_COLLECTION).doc(id).delete();
  }


}