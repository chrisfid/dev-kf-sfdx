/**
 * Created by kfidyka on 12.07.2022.
 */

// All annotations have to be imported from 'lwc'
import { LightningElement, api, track, wire } from 'lwc';
// Unlike Aura and VFP, LWC does not use single Apex controller. Instead you can use every @AuraEnabled method
import selectContactsWithoutCasesByAccountId from '@salesforce/apex/SEL_Contacts.selectContactsWithoutCasesByAccountId';
// Import standard SF module
import { refreshApex } from '@salesforce/apex';

const actions = [
    { label: 'Create Case', name: 'create_case' }
];

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];

export default class DemoRelatedContactsList extends LightningElement {

    // If top-level component contains public 'recordId' property it will be populated with current record Id
    @api recordId;
    // @track and @api properties are tracked in HTML
    chosenContactId;
    // Attributes used in Lightning App Builder have to be public
    @api recordsLimit;

    // HTML has access only to attributes inside the default class
    columns = columns;

    // That's it. All you have to do is wire method to a property and you have access to server data
    @wire(selectContactsWithoutCasesByAccountId, {accountId: '$recordId', recordsLimit: '$recordsLimit'})
    contacts;

    // Child component event handler
    handleCaseCreated(event) {
        // Remember to always use 'this' before class properties.
        this.chosenContactId = null;
        refreshApex(this.contacts);
    }

    // Row action handler
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'create_case':
                // Use 'this' to call methods from same class. No need for 'helper' anymore
                this.createCase(row);
                break;
            default:
        }
    }

    createCase(contact) {
        this.chosenContactId = contact.Id;
    }

}