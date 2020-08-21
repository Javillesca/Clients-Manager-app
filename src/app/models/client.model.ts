
export class ClientModel {
    id: string;
    name: string;
    contact: number;
    email: string;
    service: string;
    statusWork: boolean;

    constructor() {
        this.id = '';
        this.name = '';
        this.contact = null;
        this.email = '';
        this.service = '';
        this.statusWork = true;
    }
}
