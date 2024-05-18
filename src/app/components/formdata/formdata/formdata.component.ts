import { Component, OnInit ,Input} from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators,  AbstractControl } from '@angular/forms';
import Validation from '../../../utils/validation';


@Component({
  selector: 'app-formdata',
  templateUrl: './formdata.component.html',
  styleUrls: ['./formdata.component.css']
})
export class FormdataComponent implements OnInit {
  @Input() componentName!: string;
  register_bool:boolean=false;
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
  constructor(private formBuilder: FormBuilder) {} 
  ngOnInit(): void {
  console.log("Component Name : " ,this.componentName)
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

  onRegisterSubmit(): void {
    this.submitted = true;

    if (this.register_form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.register_form.value, null, 2));
  }

  onLoginSubmit():void{
    this.submitted = true;

    if (this.login_form.invalid) {
      return;
    }

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
}

