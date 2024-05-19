import { Component, OnInit ,Input} from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators,  AbstractControl } from '@angular/forms';
import Validation from '../../../utils/validation';
import { AuthService } from '../../../services/auth.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formdata',
  templateUrl: './formdata.component.html',
  styleUrls: ['./formdata.component.css']
})
export class FormdataComponent implements OnInit {
  @Input() componentName!: string;
  register_bool:boolean=false;
  subscriptions : Subscription[] = [] ;

////////////////////////////////////////////////////////////////////

  register_form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });

  login_form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder ,public authService:AuthService , private router:Router) {} 
  ngOnInit(){
  if(this.componentName=='register') this.register_bool=true;
  else this.register_bool=false;
    this.register_form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
    ////////////////////////////////////////////////
    this.login_form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.register_form.controls;
  }
  onRegisterSubmit() {
    this.submitted = true;

    if (this.register_form.invalid) {
      return;
    }
    let params=
    {
      fullname: this.register_form?.value?.fullname,
      username: this.register_form?.value?.username,
      email:this.register_form?.value?.email,
      password: this.register_form?.value?.password,
      confirmPassword: this.register_form?.value?.confirmPassword,
      acceptTerms: this.register_form?.value?.acceptTerms
    }
    this.subscriptions.push(this.authService.getUserDetails(params).subscribe((response: any) => {
      this.onRegisterReset();
      this.router.navigate(['/login']);
      alert(response.message)
       
      // this.showSuccess();
      // handle the response here
    }));
  }
  onLoginSubmit(){
    this.submitted = true;

    if (this.login_form.invalid) {
      return;
    }

    let params={
      email:this.login_form?.value?.email,
      password: this.login_form?.value?.password,
    }
    this.subscriptions.push(this.authService.loginUser(params).subscribe((response: any) => {
      console.log("RESPONSE  : " ,response)
      if(response.token)
        {
          localStorage.setItem('token',response.token);
        }
       this.onLoginReset();
       if(response.status=='success') this.router.navigate(['/dashboard']);
       else this.router.navigate(['/login']);  
      alert(response.message)

    }));
    console.log(JSON.stringify(this.login_form.value, null, 2));
  }
  onRegisterReset(): void {
    this.submitted = false;
    this.register_form.reset();
  }
  onLoginReset():void{
    this.submitted = false;
    this.login_form.reset();
  }
  onRegister()
  {
    this.router.navigate(['/register']);
  }
  onLogin()
  {
    this.router.navigate(['/login']);
  }
}

