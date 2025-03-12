function createCalendarEventAndSendInvites() {
  // Get the calendar service
  var calendar = CalendarApp.getDefaultCalendar();

  // Set the event details
  var title = "New Event Title";
  var description = "Event description here";
  var startTime = new Date("2024-05-20T09:00:00");
  var endTime = new Date("2024-05-20T10:00:00");
  var guests = "guest1@example.com, guest2@example.com"; // Comma-separated list of guest emails
  var options = {
    guests: guests,
    sendInvites: true // Set to true to send invitations
  };

  // Create the event
  var event = calendar.createEvent(title, startTime, endTime, options);

  // Log the event ID (optional)
  Logger.log("Event created with ID: " + event.getId());

  // Send a customized invitation email (optional)
  // Loop through each guest and send a personalized email
  var guestEmails = guests.split(",");
  for (var i = 0; i < guestEmails.length; i++) {
    var guestEmail = guestEmails[i].trim();
    var subject = "Invitation to " + title;
    var body = "You are invited to attend " + title + " on " + startTime.toLocaleDateString() + " at " + startTime.toLocaleTimeString() + ".\n\n" + description;
    MailApp.sendEmail(guestEmail, subject, body);
  }
}