/**
 * Created by Admin on 06.05.2021.
 */

public with sharing class contactIdNameController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [SELECT Id, Name FROM Contact];
    }
}