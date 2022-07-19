import {LightningElement, api,wire} from 'lwc';
import {getRecord} from "lightning/uiRecordApi";
import NAME_FIELD from '@salesforce/schema/Account.Name'

export default class RecordCreate extends LightningElement
{

@api objectApiName;
@api recordId;

@wire(getRecord, { recordId:'$recordId', fields: [NAME_FIELD,NAME_FIELD] })
account;

}