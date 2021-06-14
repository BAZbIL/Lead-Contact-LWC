/**
 * Created by Admin on 29.04.2021.
 */

public with sharing class leadController {
    @AuraEnabled(cacheable=true)
    public static List<Lead> getLeads() {
        return [SELECT Id, Name, Title, Phone FROM Lead];
    }

}