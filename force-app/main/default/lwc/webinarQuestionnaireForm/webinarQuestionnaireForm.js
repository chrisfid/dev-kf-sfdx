import { LightningElement, api, wire, track } from 'lwc';
import {createRecord, getRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import USER_ID from '@salesforce/user/Id';
//import QID from '@salesforce/schema/Questionnaire__c.Id';
import NAME_FIELD from '@salesforce/schema/User.FirstName';
import { NavigationMixin } from 'lightning/navigation';




export default class Questionnaire extends NavigationMixin(LightningElement) {
    // variables
    @api objectApiName;
    questionnaireAPIName = 'Webinar_Questionnaire__c';
    name;
    headerText;
    questionnaireId;

    @api recordId;
    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD]
    }) wireuser({error, data}) {
        if (error) {
            this.error = error ;
        } else if (data) {
            this.name = data.fields.FirstName.value;
            this.headerText = "Hi, " + this.name + "! Share your feedback with us.";
        }
    }
    showData = false;
    hideWebinar = true;

    // handle web.quest. form submission, create questionnaire
    // and push it to SF
    handleSubmit(event){
       event.preventDefault();       // stop the form from submitting

       const fields = event.detail.fields;
       fields['Webinar__c'] = this.recordId;

       const recordInput = {apiName: this.questionnaireAPIName, fields};
       createRecord(recordInput).then(response => {
           this.questionnaireId = response.id;
           const evt = new ShowToastEvent({
               message: `Questionnaire created with Id: ${this.questionnaireId}`,
               variant: 'success',
           });
           this.navigateNext();
           this.dispatchEvent(evt);
           }).catch(error => {
               alert('Error: ' + JSON.stringify(error));
           });
       }

        navigateNext() {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.questionnaireId,
                    objectApiName: 'Questionnaire__c',
                    actionName: 'view'
                },
            });
        }
//    // handle Rejection Reason visibility
//    handleCheckbox(event) {
////        console.log("username: " + username.data);
//        console.log("handleCheckbox: " + event.target.value);
//        this.showData = event.target.value;
//    }
}