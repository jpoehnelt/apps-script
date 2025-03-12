/**
 * Creates a new event in Google Calendar and sends invites to all guests.
 * @param {string} title - The title of the event
 * @param {Date} startTime - The start time of the event
 * @param {Date} endTime - The end time of the event
 * @param {string} description - Description of the event
 * @param {string} location - Location of the event
 * @param {string[]} guests - Array of email addresses for guests
 * @param {boolean} sendInvites - Whether to send invites to guests
 * @return {CalendarEvent} The created calendar event
 */
function createCalendarEventWithGuests(title, startTime, endTime, description, location, guests, sendInvites) {
  // Default parameters if not provided
  title = title || 'New Event';
  startTime = startTime || new Date();
  endTime = endTime || new Date(startTime.getTime() + (60 * 60 * 1000)); // Default 1 hour after start
  description = description || '';
  location = location || '';
  guests = guests || [];
  sendInvites = (sendInvites !== false); // Default to true
  
  try {
    // Get the default calendar
    var calendar = CalendarApp.getDefaultCalendar();
    
    // Create the event
    var event = calendar.createEvent(
      title,
      startTime,
      endTime,
      {
        description: description,
        location: location,
        guests: guests.join(','),
        sendInvites: sendInvites
      }
    );
    
    Logger.log('Event created: %s', event.getId());
    return event;
    
  } catch (error) {
    Logger.log('Error creating event: ' + error.toString());
    throw error;
  }
}

/**
 * Example usage of the function
 */
function exampleCreateEvent() {
  // Set event details
  var title = 'Team Meeting';
  var startTime = new Date();
  startTime.setHours(startTime.getHours() + 1); // Start 1 hour from now
  var endTime = new Date(startTime.getTime() + (60 * 60 * 1000)); // 1 hour duration
  var description = 'Weekly team sync-up meeting';
  var location = 'Conference Room A';
  var guests = ['person1@example.com', 'person2@example.com', 'team@example.com'];
  
  // Create the event and send invites
  var event = createCalendarEventWithGuests(
    title,
    startTime,
    endTime,
    description,
    location,
    guests,
    true
  );
  
  Logger.log('Event created with ID: ' + event.getId());
}