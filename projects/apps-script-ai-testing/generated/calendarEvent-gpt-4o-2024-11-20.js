function createEventAndInviteGuests() {
  var calendar = CalendarApp.getDefaultCalendar();

  // Define event details
  var eventTitle = "Team Meeting";
  var eventDescription = "Discussing project updates and next steps.";
  var eventLocation = "Google Meet";
  var startTime = new Date("2023-10-20T10:00:00");
  var endTime = new Date("2023-10-20T11:00:00");

  // List of guest emails
  var guestEmails = ["guest1@example.com", "guest2@example.com", "guest3@example.com"];

  // Create the event
  var event = calendar.createEvent(eventTitle, startTime, endTime, {
    description: eventDescription,
    location: eventLocation,
    guests: guestEmails.join(","),
    sendInvites: true
  });

  Logger.log("Event created: " + event.getId());
}