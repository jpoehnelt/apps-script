function createCalendarEventWithInvites() {
  // Get the calendar
  var calendar = CalendarApp.getDefaultCalendar();
  
  // Define event details
  var eventTitle = 'Team Meeting';
  var eventDescription = 'Weekly team sync-up';
  var startTime = new Date(); // Current time
  startTime.setHours(startTime.getHours() + 1); // Set to 1 hour from now
  var endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration
  
  // List of guest email addresses
  var guests = [
    'team-member1@company.com', 
    'team-member2@company.com', 
    'team-member3@company.com'
  ];
  
  // Create the event
  var event = calendar.createEvent(eventTitle, startTime, endTime, {
    description: eventDescription,
    guests: guests,
    sendInvites: true // This will send email invitations to all guests
  });
  
  // Optional: Add additional event details
  event.setLocation('Conference Room A');
  
  // Log the event creation
  Logger.log('Event created: ' + event.getTitle());
  
  return event;
}