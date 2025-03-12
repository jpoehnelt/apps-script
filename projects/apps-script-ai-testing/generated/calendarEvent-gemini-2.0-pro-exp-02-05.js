function createAndInvite() {
  var calendarId = 'primary'; // Use 'primary' for the user's primary calendar or specify a calendar ID.
  var event = {
    summary: 'Meeting with Client',
    location: 'Conference Room A',
    description: 'Discuss project progress and next steps.',
    start: {
      dateTime: '2024-03-15T09:00:00-07:00', // Example: March 15, 2024, 9:00 AM PST
      timeZone: 'America/Los_Angeles', // Specify the time zone.
    },
    end: {
      dateTime: '2024-03-15T10:00:00-07:00', // Example: March 15, 2024, 10:00 AM PST
      timeZone: 'America/Los_Angeles',
    },
    attendees: [
      {email: 'attendee1@example.com'},
      {email: 'attendee2@example.com'},
      // Add more attendees as needed.
    ],
    // Optional: Set reminders.
    reminders: {
      useDefault: false,
      overrides: [
        {method: 'email', minutes: 24 * 60}, // 24 hours before
        {method: 'popup', minutes: 10},      // 10 minutes before
      ],
    },
    sendUpdates: 'all' // Send updates to all attendees.  Other options: 'externalOnly', 'none'
  };

  try {
    event = Calendar.Events.insert(event, calendarId);
    Logger.log('Event ID: ' + event.id);
    Logger.log('Event Link:' + event.htmlLink) // Log the link to the created event.
  } catch (error) {
    Logger.log('Error creating event: ' + error);
    // Handle errors, such as invalid calendar ID or API quota limits.
  }
}



