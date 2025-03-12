/**
 * Creates a Gmail add-on that displays additional information about the email being read.
 */

/**
 * Callback for rendering the card for Gmail.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onGmailMessageOpen(e) {
  // Get the current message
  var messageId = e.messageMetadata.messageId;
  var accessToken = e.messageMetadata.accessToken;
  var message = GmailApp.getMessageById(messageId);
  
  // Build the card
  var card = buildEmailInfoCard(message);
  
  return card;
}

/**
 * Builds a card with information about the email.
 * @param {GmailMessage} message The message to analyze.
 * @return {CardService.Card} The card to display.
 */
function buildEmailInfoCard(message) {
  // Get message details
  var sender = message.getFrom();
  var subject = message.getSubject();
  var date = message.getDate();
  var formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), "MMM dd, yyyy 'at' hh:mm a");
  var size = Math.round(message.getRawContent().length / 1024); // Size in KB
  var attachments = message.getAttachments();
  var hasAttachments = attachments.length > 0;
  var recipients = message.getTo() + (message.getCc() ? ", " + message.getCc() : "");
  
  // Extract domain from sender email
  var senderEmail = sender.match(/[^<]*<([^>]*)>/);
  var domain = senderEmail ? senderEmail[1].split('@')[1] : "unknown";
  
  // Create header section
  var headerSection = CardService.newCardSection()
      .setHeader("Email Information")
      .addWidget(CardService.newKeyValue()
          .setTopLabel("From")
          .setContent(sender)
          .setMultiline(true))
      .addWidget(CardService.newKeyValue()
          .setTopLabel("Subject")
          .setContent(subject)
          .setMultiline(true))
      .addWidget(CardService.newKeyValue()
          .setTopLabel("Date")
          .setContent(formattedDate));
  
  // Create details section
  var detailsSection = CardService.newCardSection()
      .setHeader("Additional Details")
      .addWidget(CardService.newKeyValue()
          .setTopLabel("Domain")
          .setContent(domain))
      .addWidget(CardService.newKeyValue()
          .setTopLabel("Size")
          .setContent(size + " KB"))
      .addWidget(CardService.newKeyValue()
          .setTopLabel("Recipients")
          .setContent(recipients)
          .setMultiline(true));
  
  // Create attachments section if there are any
  if (hasAttachments) {
    var attachmentSection = CardService.newCardSection()
        .setHeader("Attachments");
    
    for (var i = 0; i < attachments.length; i++) {
      var attachment = attachments[i];
      attachmentSection.addWidget(CardService.newKeyValue()
          .setTopLabel("Attachment " + (i + 1))
          .setContent(attachment.getName() + " (" + Math.round(attachment.getSize() / 1024) + " KB)")
          .setMultiline(true));
    }
  }
  
  // Build the card
  var card = CardService.newCard()
      .setName("Email Info")
      .addSection(headerSection)
      .addSection(detailsSection);
  
  // Add attachment section if there are attachments
  if (hasAttachments) {
    card.addSection(attachmentSection);
  }
  
  return card;
}

/**
 * Required function that is called when the add-on is installed.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onInstall(e) {
  return onHomepage(e);
}

/**
 * Required function that is called when the add-on is opened in Gmail.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onHomepage(e) {
  var card = CardService.newCard()
      .setName("Homepage")
      .addSection(CardService.newCardSection()
          .setHeader("Email Analyzer")
          .addWidget(CardService.newTextParagraph()
              .setText("Open an email to see additional information about it."))
      );
  
  return card;
}

/**
 * Manifest for the Gmail add-on.
 */
var manifest = {
  "gmail": {
    "contextualTriggers": [{
      "unconditional": {},
      "onTriggerFunction": "onGmailMessageOpen"
    }],
    "primaryColor": "#4285F4",
    "secondaryColor": "#EA4335",
    "version": "CURRENT_VERSION",
    "openLinkUrlPrefixes": [
      "https://mail.google.com/"
    ]
  }
};