/**
 * Created by kfidyka on 13.07.2022.
 */

import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';
import CONTACT_TITLE_FIELD from '@salesforce/schema/Contact.Title';
import CONTACT_PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import CONTACT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';

// wireGetRecordDynamicContact.js
import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    CONTACT_NAME_FIELD,
    CONTACT_TITLE_FIELD,
    CONTACT_PHONE_FIELD,
    CONTACT_EMAIL_FIELD
];

export default class WireGetRecordDynamicContact extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;

    get name() {
        return this.contact.data.fields.Name.value;
    }

    get title() {
        return this.contact.data.fields.Title.value;
    }

    get phone() {
        return this.contact.data.fields.Phone.value;
    }

    get email() {
        return this.contact.data.fields.Email.value;
    }
}