import { LightningElement, api, wire, track } from 'lwc';
import {createRecord, getRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
export default class Questionnaire extends LightningElement {
@api objectApiName;
questionnaireAPIName = 'Questionnaire__c';
wouldRecommend = true;
@track error ;
@track name;
@wire(getRecord, {
recordId: USER_ID,
fields: [NAME_FIELD]
}) wireuser({
error,
data
}) {
if (error) {
this.error = error ;
} else if (data) {
this.name = data.fields.Name.value;
}
}
handleSubmit(event){
event.preventDefault(); // stop the form from submitting
const fields = event.detail.fields;
const recordInput = {apiName: this.questionnaireAPIName, fields};
createRecord(recordInput).then(response => {
const event = new ShowToastEvent({
message: `Questionnaire created with Id: ${response.id}`,
variant: 'success',
});
this.dispatchEvent(event);
}).catch(error => {
alert('Error: ' + JSON.stringify(error));
});
console.log('TEST');
}
setReviewVisibility(event) {
console.log(event.target.value);
this.wouldRecommend = event.target.value === 'No' ? false : true;
}
}