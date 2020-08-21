import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { ClientModel } from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  formClient: FormGroup;

  client: ClientModel = new ClientModel();
  id: string;
  constructor(private fb: FormBuilder,
              private cs: ClientsService,
              private route: ActivatedRoute ) {

    console.log('========== Client - constructor ==========');

    this._initFormClient();

   }

  ngOnInit(): void {

    console.log('========== Client - ngOnInit ==========');

    this.id = this.route.snapshot.paramMap.get('id');

    if ( this.id !== 'nuevo') {
      this.cs.getClient(this.id).subscribe( (reply: ClientModel ) => {
        this.client = reply;
        this.client.id = this.id;
        this._loadFormClient(this.client);
      });
    }
  }

  get invalidName(): any {
    return this.formClient.get('name').invalid && this.formClient.get('name').touched;
  }

  get invalidContact(): any {
    return this.formClient.get('contact').invalid && this.formClient.get('contact').touched;
  }

  get invalidEmail(): any {
    return this.formClient.get('email').invalid && this.formClient.get('email').touched;
  }

  get invalidService(): any {
    return this.formClient.get('service').invalid && this.formClient.get('service').touched;
  }

  private _initFormClient(): any {

    console.log('========== Client - _initFormClient ==========');

    this.formClient = this.fb.group(
      {
        id: [this.client.id],
        name: [this.client.name, [Validators.required]],
        contact: [this.client.contact, [Validators.required]],
        email: [this.client.email, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        service: [this.client.service],
        statusWork: [this.client.statusWork]
      }
    );
  }

  private _loadFormClient( client: ClientModel): any {

    console.log('========== Client - _loadFormClient ==========');

    this.formClient.reset({
      id: [client.id],
      name: [client.name],
      contact: [client.contact],
      email: [client.email],
      service: [client.service],
      statusWork: [client.statusWork]
    });
  }

  changeStatus(): any {

    console.log('========== Client - changeStatus ==========');

    if ( this.client.statusWork === true ) {
      this.client.statusWork = false;
      this.formClient.get('statusWork').setValue(false);
    } else {
       this.client.statusWork = true;
       this.formClient.get('statusWork').setValue(true);
    }
  }

  saveData( form: NgForm ): any {

    console.log('========== Client - saveData ==========');

    if ( this.formClient.invalid ) {

      return Object.values(this.formClient.controls).forEach(control => {
        if ( control instanceof FormGroup ) {
          Object.values(control.controls).forEach(c =>  c.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    Swal.fire({
      title: 'Guardando',
      text: 'Guardando información ',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let petition: Observable<any>;

    if ( this.formClient.get('id').value ) {
      petition = this.cs.updateClient(form.form.value);

    } else {
      petition = this.cs.createClient(form.value);
    }

    petition.subscribe(reply => {
      Swal.fire({
        title: reply.name,
        text: 'Cliente guardado correctamente',
        icon: 'success',
        allowOutsideClick: false
      });

      this._loadFormClient(reply);
    });
  }

}
