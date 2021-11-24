import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  columns: string[];

  constructor(private formBuilder: FormBuilder) {
    this.columns = ["Name", "Address", "Salary", "IsActive", "Delete"];
  }

  ngOnInit(): void {
    this.createForm();
  }

  get tableRowArray(): FormArray {
    return this.employeeForm.get('tableRowArray') as FormArray;
  }

  addNewRow(): void {
    this.tableRowArray.push(this.createTableRow());
  }

  onDeleteRow(rowIndex:number): void {
    this.tableRowArray.removeAt(rowIndex);
  }

  /**
   * Initializes the Form & by default adds an empty row to the PRIMENG TABLE
   */
  private createForm(): void {
    this.employeeForm = this.formBuilder.group({
      tableRowArray: this.formBuilder.array([
        this.createTableRow()
      ])
    });
  }

  /**
   * Returns the FormGroup as a Table Row
   */
  private createTableRow(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(null, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }),
      address: new FormControl(null, { validators: [Validators.required, Validators.maxLength(500)] }),
      salary: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^\d{1,6}(?:\.\d{0,2})?$/), Validators.minLength(3), Validators.maxLength(50)] }),
      isActive: new FormControl({ value: true, disabled: true })
    });
  }

}
