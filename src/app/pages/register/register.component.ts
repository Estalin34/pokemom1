import { Component } from '@angular/core';
import{NzFormModule} from 'ng-zorro-antd/form';
import{NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import{NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import { FormGroup, FormBuilder,Validators,ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { RegisterService } from '../../services/user/register/register.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import {NzSelectModule} from 'ng-zorro-antd/select';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NzFormModule,NzInputModule,NzButtonModule,NzCheckboxModule,NzIconModule,ReactiveFormsModule,RouterLink,NzSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 form: FormGroup;
  constructor(private fb: FormBuilder , private registerService: RegisterService) {
    this.form = this.fb.group({
     email: ["", [Validators.required , Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [this.confirmValidator]],
      nickname: ["", [Validators.required]],
      phoneNumber : ["", [Validators.required]],
      agree: [false],
      photoURL : [""],
      role: ["Empleado"]
    });
  }
  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.form.controls['confirmPassword'].updateValueAndValidity());

  }

  confirmValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => { 
    if (!control.value) { 
        return { required: true }; 
    } else if (control.value !== this.form.controls['password'].value) { 
        return { confirm: true, error: true }; 
    } 
    return {}; 
};
 
onCLickRegister(): void { 
  if(this.form.invalid) return;
  this.registerService.createRegister(this.form.value,this.form.value)
  .then((response) => {
    console.log(response);

  })
  .catch(error => console.log(error));

} 
onClickRegisterGoogle(): void {
  this.registerService.createRegisterWithGoogle()
  .then((response) => {
    console.log(response);  
  })
  .catch(error => console.log(error));
}
}
