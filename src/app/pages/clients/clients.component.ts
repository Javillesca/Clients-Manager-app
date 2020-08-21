import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { ClientModel } from '../../models/client.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: ClientModel[] = [];
  loading: boolean = false;

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.clientsService.getClients()
      .subscribe( reply => {
        this.clients = reply;
        this.loading = false;
      }
    );
  }

  deleteClient( client: ClientModel, i: number ): any  {
    Swal.fire({
      title: 'Confirmación',
      text: `¿Desea eliminar ${ client.name }?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(reply => {
      if(reply.value ) {
        this.clientsService.deleteClient(client.id).subscribe( reply => {
          this.clients.splice(i, 1 );
        });
      }
    });
  }

}
