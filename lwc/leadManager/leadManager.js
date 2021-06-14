/**
 * Created by Admin on 29.04.2021.
 */

import {LightningElement, wire, api, track} from 'lwc';
import getLeads from '@salesforce/apex/leadController.getLeads';
import {refreshApex} from '@salesforce/apex';
import {updateRecord} from 'lightning/uiRecordApi'
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import TITLE_FIELD from '@salesforce/schema/Lead.Title';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';
import ID_FIELD from '@salesforce/schema/Lead.Id';
import {NavigationMixin} from "lightning/navigation";

const COLS = [
    {
        label: 'Name',
        type: 'button',
        typeAttributes: {label: {fieldName: 'Name'}, name: 'navigate_lead', variant: 'base'}
    },
    {label: 'Title', fieldName: 'Title', type: 'text', editable: true},
    {label: 'Phone', fieldName: 'Phone', type: 'text', editable: true}
];

export default class LeadManager extends NavigationMixin(LightningElement) {
    @track error;
    @api recordId;
    @track columns = COLS;
    @track draftValues = [];
    @track rowOffset = 0;
    @track selectedRow;
    @track record = {};
    @track data = [];

    @wire(getLeads)
    lead;

    navigateToPage(event) {
        if (event.detail.action.name === 'navigate_lead') {
            this.record = event.detail.row;
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.record.Id,
                    actionName: 'view',
                },
            });
        }
    }

    leadEditSave(event) {
        const fields = {};
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[TITLE_FIELD.fieldApiName] = event.detail.draftValues[0].Title;
        fields[PHONE_FIELD.fieldApiName] = event.detail.draftValues[0].Phone;

        const recordInput = {fields};

        updateRecord(recordInput)
            .then(() => {
                this.template.querySelector("lightning-datatable").draftValues = [];
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Lead updated',
                        variant: 'success'
                    })
                );

                return refreshApex(this.lead).then(() => {
                    this.draftValues = [];
                });

            }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or reloading record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }


}