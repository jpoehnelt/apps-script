function createCalendarEvent() {
  var calendar = CalendarApp.getDefaultCalendar();
  var eventTitle = 'Meeting with Team';
  var eventDescription = 'Discuss project updates and next steps.';
  var eventLocation = 'Conference Room A';
  var startTime = new Date('2023-10-30T10:00:00');
  var endTime = new Date('2023-10-30T11:00:00');
  var guests = 'guest1@example.com, guest2@example.com';

  var event = calendar.createEvent(eventTitle, startTime, endTime, {
    description: eventDescription,
    location: eventLocation,
    guests: guests,
    sendInvites: true
  });

  Logger.log('Event created: ' + event.getId());
}