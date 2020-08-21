import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClientModel } from '../models/client.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {


  constructor( private http: HttpClient ) { }

  private url = environment.url;



  createClient(client: ClientModel ): any {

    return this.http.post(`${ this.url }/clients.json`, client)
      .pipe(
        map( (resp: any) => {
          client.id = resp.name;
          return client;
        })
      );

  }

  updateClient(client: any): any {

    const clientTemp = {
      ...client
    };

    delete clientTemp.id;

    return this.http.put(`${ this.url}/clients/${client.id}.json`, clientTemp).pipe(
      map( (resp: any) => {
        client.id = resp.name;
        return client;
      })
    );
  }

  getClients(): any {

    return this.http.get(`${ this.url}/clients.json`)
              .pipe( map( reply => this.createArry(reply)));

  }

  getClient(id: string): any {

    return this.http.get(`${ this.url }/clients/${id}.json`);

  }

  private createArry( clientsObj: object): ClientModel[] {

    const clients: ClientModel[] = [];

    if ( clientsObj === null ) { return []; }
    Object.keys(clientsObj).forEach(key => {
      const client: ClientModel = clientsObj[key];
      client.id = key;
      clients.push(client);
    });
    return clients;
  }

  deleteClient(id: string ): any {

    return this.http.delete(`${ this.url }/clients/${id}.json`);

  }
}
