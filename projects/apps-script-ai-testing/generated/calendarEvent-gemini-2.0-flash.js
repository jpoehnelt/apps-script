function createCalendarEvent(calendarId, eventTitle, eventDescription, startTime, endTime, guestEmails) {
  try {
    // Get the calendar.
    var calendar = CalendarApp.getCalendarById(calendarId);

    // Create the event.
    var event = calendar.createEvent(eventTitle,
                                     startTime,
                                     endTime,
                                     {
                                       description: eventDescription,
                                       guests: guestEmails.join(','), // Join the array of emails into a comma-separated string
                                       sendInvites: true // Automatically send invites to guests
                                     });

    Logger.log('Event created: ' + event.getTitle() + ' (ID: ' + event.getId() + ')');
    return 'Event created successfully!';

  } catch (e) {
    Logger.log('Error creating event: ' + e.toString());
    return 'Error creating event: ' + e.toString();
  }
}

// Example usage (replace with your actual values):
function testCreateCalendarEvent() {
  var calendarId = 'your_calendar_id@group.calendar.google.com'; // Replace with your calendar ID
  var eventTitle = 'Meeting with Team';
  var eventDescription = 'Discuss project progress and next steps.';
  var startTime = new Date('2024-03-15T10:00:00-08:00'); // Example: March 15, 2024, 10:00 AM PST
  var endTime = new Date('2024-03-15T11:00:00-08:00');   // Example: March 15, 2024, 11:00 AM PST
  var guestEmails = ['guest1@example.com', 'guest2@example.com']; // Replace with guest email addresses

  var result = createCalendarEvent(calendarId, eventTitle, eventDescription, startTime, endTime, guestEmails);
  Logger.log(result);
}
