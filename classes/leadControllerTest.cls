/**
 * Created by Admin on 05.05.2021.
 */

@IsTest
private class leadControllerTest {
    @TestSetup
    static void setup() {
        List<Lead> lead = new List<Lead>();

        Lead lead1 = new Lead(FirstName = 'test1', LastName = 'test1', Title = 'Test1',
                Phone = '123', Company = 'TestCompany');

        lead.add(lead1);

        insert lead;
    }

    @IsTest
    static void getLeadsTest() {

        Test.startTest();
        List<Lead> leads = leadController.getLeads();
        Test.stopTest();

        List<Lead> createdLeads = [
                SELECT Name, Title, Phone, Id
                FROM Lead
        ];
        for (Integer i = 0; i < leads.size(); i++) {
            System.assert(leads[i].Name == createdLeads[i].Name);
            System.assert(leads[i].Phone == createdLeads[i].Phone);
            System.assert(leads[i].Title == createdLeads[i].Title);
            System.assert(leads[i].Id == createdLeads[i].Id);

        }
    }
}