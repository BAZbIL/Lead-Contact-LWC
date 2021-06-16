import {LightningElement, track, wire} from 'lwc';
import getContacts from '@salesforce/apex/contactIdNameController.getContacts';

const COLS = [
    {label: 'IdName', fieldName: 'IdName', editable: false},
    {label: 'Name', fieldName: 'NameUrl', type: 'url', typeAttributes: {label: {fieldName: 'Name'}, target: '_self'}}
];

export default class ContactIdName extends LightningElement {
    @track columns = COLS;
    @track data = [];

    @wire(getContacts)

    contactGetData({error, data}) {
        if (data) {
            let currentData = [];
            data.forEach((row) => {
                let rowData = {};
                rowData.IdName = row.Id + row.Name;
                rowData.Name = row.Name;
                rowData.NameUrl = '/' + row.Id;
                currentData.push(rowData);
            });
            this.data = currentData;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

}