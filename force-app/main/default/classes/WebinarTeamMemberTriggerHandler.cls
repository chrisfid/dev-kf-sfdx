/**
 * Created by kfidyka on 06.07.2022.
 */

public with sharing class WebinarTeamMemberTriggerHandler {
    public static void handleBeforeInsert(List<Webinar_Team_Member__c> newList) {
        assignContactsIfExternal(newList);
        eitherContactOrUser(newList);
        requireCommentIfRejected(newList);
//        uniqueRelatedValues(newList);
    }
    public static void handleBeforeUpdate(Map<Id, Webinar_Team_Member__c> newMap, Map<Id, Webinar_Team_Member__c> oldMap) {
        assignContactsIfExternal(newMap.values());
        eitherContactOrUser(newMap.values());
        requireCommentIfRejected(newMap.values());
//        uniqueRelatedValues(newMap.values());
    }

    private static void assignContactsIfExternal(List<Webinar_Team_Member__c> newList) {
        // Contacts can be only assigned to the webinar if the webinarType is ‘External’
        for (Webinar_Team_Member__c wtm : newList) {
            if (wtm.Related_Webinar__r.Type__c == 'External' && wtm.Related_Contact__c != null) {
                wtm.Related_Contact__c = null;
                wtm.addError('You can not assign contacts to external webinars!');
            }
        }
    }

    private static void eitherContactOrUser(List<Webinar_Team_Member__c> newList) {
        // Webinar Member can be Contact OR User – never both
        for (Webinar_Team_Member__c wtm : newList) {
            if (wtm.Related_Contact__c != null && wtm.Related_User__c != null) {
                wtm.addError('Webinar Member can be Contact or User – never both');
            }
        }
    }

    private static void requireCommentIfRejected(List<Webinar_Team_Member__c> newList) {
        // When Webinar Member has status Rejected the Comment field must be filled
        for (Webinar_Team_Member__c wtm : newList) {
            if (wtm.Status__c == 'Rejected' && wtm.Comments__c == null) {
                wtm.addError('When Webinar Member has status Rejected the Comment field must be filled');
            }
        }
    }

//    private static void uniqueRelatedValues(List<Webinar_Team_Member__c> newList) {
//        // Two Webinar Member records cannot be created with the same Related User / Contact and Related webinar values
//        List<Webinar_Team_Member__c> uniqueMembers = new List<Webinar_Team_Member__c>();
//        for (Webinar_Team_Member__c wtm : newList) {
//            for (Webinar_Team_Member__c um : uniqueMembers) {
//                if (wtm.Related_User__c == um.Related_User__c ||
//                        wtm.Related_Contact__c == um.Related_Contact__c ||
//                        wtm.Related_Webinar__c == um.Related_Webinar__c) {
//                    wtm.addError('Two Webinar Member records cannot be created with the same Related User / Contact and Related webinar values');
//                }
//                uniqueMembers.add(wtm);
//            }
//        }
//    }
}

//    private static void moreSeatsThanParticipants(List<Webinar_Team_Member__c> newList) {
//        // The number of participants cannot exceed the seat number
//        for (Webinar_Team_Member__c wtm : newList) {
//            if (wtm.Related_Webinar__r.Number_of_Participants__c > wtm.Related_Webinar__r.Total_Number_of_Seats__c) {
//                wtm.addError('The number of participants cannot exceed the seat number');
//            }
//        }
//    }

//    private static void eitherContactOrUser(List<Webinar_Team_Member__c> newList) {
//        for (Webinar_Team_Member__c webinarMember : newList) {
//            if (webinarMember.Related_Contact__c != null && webinarMember.Related_User__c != null) {
//                webinarMember.addError('Member can\'t be from Contact and User');
//            }
//        }
//    }
//    }

//    private static void contactOrUserVerification(List<Webinar_Team_Member__c> newList) {
//        for (Webinar_Team_Member__c member : newList) {
//            if (member.Related_Contact__c != null && member.Related_User__c != null) {
//                member.addError('Contact and User cannot be at the same time');
//            }
//        }
//    }
//
//    private static void numberOfSeatsLimit(List<Webinar__c> newList) {
//        for (Webinar__c w : newList) {
//            if (w.Number_of_Participants__c > w.Total_Number_of_Seats__c) {
//                w.addError('There cannot be more participants than available seats.');
//            }
//        }
//    }
//
//    private static void setPricePerParticipant(List<Webinar__c> newList) {
//        // Also take care of edge scenarios
//        for (Webinar__c w : newList) {
//            if (w.Price_per_participant__c != null && w.Total_Number_of_Seats__c != null) {
////                Error
//            }
//            w.Price_per_participant__c = w.Cost__c / w.Total_Number_of_Seats__c;
//        }
//    }
//
////    private static void newStatusChange(Map<Id, Webinar__c> oldMap, Map<Id, Webinar__c> newMap) {
////        for (Webinar__c w : newMap) {
////            if ((w.Status__c != oldMap.get(w.Id).Status__c) && (oldMap.get(w.Id).Status__c == 'New') && (w.Status__c != 'Canceled')) {
////                if (w.Approval_Status__c == 'Pending') {
////                    w.addError('You have to change approval status from Pending');
////                }
////            }
////        }
////    }
//
//    private static void newStatusChange(Map<Id, Webinar__c> newMap, Map<id, Webinar__c> oldMap) {
//        for (Webinar__c w : newMap.values()) {
//            if ((w.Status__c != oldMap.get(w.Id).Status__c) && oldMap.get(w.Id).Status__c == 'New' && w.Status__c != 'Canceled') {
//                if (w.Approval_Status__c == 'Pending') {
//                    w.addError('You have change approval status from pending');
//                }
//            }
//        }
//    }
//
//    private static void rejectedMember(List<Webinar_Team_Member__c> newList) {
//        for (Webinar_Team_Member__c m : newList) {
//            if (m.Status__c == 'Rejected' && String.isBlank(m.Comments__c)) {
//                m.addError('When Webinar Member has status Rejected, the comment field must be filled');
//            }
//        }
//    }
//
//    private static void noDuplicateRule(List<Webinar_Team_Member__c> newList) {
////        Set<Webinar_Team_Member__c> allMembers = new Set<Webinar_Team_Member__c>();
////        Map<Id, User> webinarMemberUser = new Map<Id, User>(newList);
////        Map<Id, Contact> webinarMemberContact = new Map<Id, User>(newList);
////        Map<Id, Webinar__c> webinarMemberWebinar = new Map<Id, User>(newList);
////
////        allMembers.addAll(newList);
////        for (Webinar_Team_Member__c w : newList) {
////            if ((allMembers.contains(w.Related_User__c) || allMembers.contains(w.Related_Contact__c)) {
////            }
////        }
//    }