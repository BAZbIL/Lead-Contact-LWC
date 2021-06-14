/**
 * Created by Admin on 06.05.2021.
 */

@IsTest
private class contactIdNameControllerTest {
    @TestSetup
    static void setup() {
        List<Contact> contactTest = new List<Contact>();
        Contact contact1 = new Contact(FirstName = 'test1', LastName = 'test1', Phone = '123');

        contactTest.add(contact1);

        insert contactTest;
    }
    @IsTest
    static void getContactTest() {
        Test.startTest();
        List<Contact> contacts = contactIdNameController.getContacts();
        Test.stopTest();

        List<Contact> createdContacts = [SELECT Name, Id FROM Contact];
        for (Integer i = 0; i < contacts.size(); i++) {
            System.assert(contacts[i].Name == createdContacts[i].Name);
            System.assert(contacts[i].Id == createdContacts[i].Id);
        }
    }
}