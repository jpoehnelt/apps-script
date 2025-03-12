function createCalendarEventWithGuests() {
  // Get the default calendar
  var calendar = CalendarApp.getDefaultCalendar();
  
  // Event details
  var title = "Team Meeting";
  var startTime = new Date();
  var endTime = new Date(startTime.getTime() + (60 * 60 * 1000)); // 1 hour later
  var guests = ["guest1@example.com", "guest2@example.com"]; // Replace with actual email addresses
  
  // Create the event
  var event = calendar.createEvent(title,
    startTime,
    endTime,
    {
      description: "Regular team sync-up meeting",
      location: "Conference Room A",
      guests: guests.join(","),
      sendInvites: true // This will automatically send invites to guests
    }
  );
  
  // Optional: Add additional guests after event creation
  // guests.forEach(function(guest) {
  //   event.addGuest(guest);
  // });
  
  Logger.log('Event created: ' + event.getTitle());
  Logger.log('Guests: ' + event.getGuestList().map(function(guest) {
    return guest.getEmail();
  }).join(", "));
}