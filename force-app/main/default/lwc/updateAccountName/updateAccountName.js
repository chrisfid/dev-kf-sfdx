/**
 * Created by kfidyka on 12.07.2022.
 */

import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class UpdateAccountName extends LightningElement {
    @api objectApiName;
    @api recordId;

    handleUpdate(event) {
       const evt = new ShowToastEvent({
                   title: 'Success!',
                   message: 'The record has just been updated',
                   variant: 'success',
                   mode: 'dismissable'
               });
        this.dispatchEvent(evt);
    }

    get headerTitle() {
        return 'Update Name field';
    }
}