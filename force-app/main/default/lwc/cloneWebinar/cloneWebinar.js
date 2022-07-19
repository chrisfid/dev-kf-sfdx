import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { LightningElement, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { createRecord } from 'lightning/uiRecordApi';
import saveWebinar from '@salesforce/apex/WebinarListController.saveWebinar'
import WEBINAR_NAME from '@salesforce/schema/Webinar__c.Name';
import WEBINAR_TYPE from '@salesforce/schema/Webinar__c.Type__c';
import WEBINAR_COST from '@salesforce/schema/Webinar__c.Cost__c';
import WEBINAR_PPP from '@salesforce/schema/Webinar__c.Price_per_participant__c';

export default class CloneWebinars extends LightningElement {

    @api objectApiName;
    @api recordId;

    closeAction(){
      this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleSubmission(event) {
       console.log("handleSubmission 1");

       event.preventDefault();
       const fields = event.detail.fields;

       console.log("fields: " + JSON.stringify(fields));

        const recordInput = {
            sobjectType: this.objectApiName,
            [WEBINAR_NAME.fieldApiName]: fields["Name"],
            [WEBINAR_TYPE.fieldApiName]: fields["Type__c"],
            [WEBINAR_COST.fieldApiName]: fields["Cost__c"],
            [WEBINAR_PPP.fieldApiName] : fields["Price_per_Participant__c"]
        };

        console.log("recordInput: " + JSON.stringify(recordInput));

       saveWebinar({webinar: recordInput}).then(response => {
           console.log("handleSubmission 2");
           console.log("response: " + JSON.stringify(response));

           const event = new ShowToastEvent({
                       message: `Questionnaire created with Id: ${response.Id}`,
                       variant: 'success',
                   });
           this.dispatchEvent(event);

           console.log("webinar cloned with id: " + response.Id);

           this.closeAction();

       }).catch(error => {
           alert('Error: ' + JSON.stringify(error));
       });

       console.log('TEST');
    }
}