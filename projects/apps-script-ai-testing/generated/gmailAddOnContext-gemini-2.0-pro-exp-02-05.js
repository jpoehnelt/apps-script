/**
 * @OnlyCurrentDoc
 */

/**
 * Callback function that returns the card for the add-on's homepage.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show on the add-on's homepage.
 */
function buildAddOn(e) {
  // Activate temporary Gmail add-on scopes.
  var accessToken = e.gmail.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  var messageId = e.gmail.messageId;
  var message = GmailApp.getMessageById(messageId);
  var sender = message.getFrom();
  var subject = message.getSubject();

  // Create a section with the sender information.
  var senderSection = CardService.newCardSection()
    .setHeader("Sender Information")
    .addWidget(CardService.newTextParagraph().setText("<b>From:</b> " + sender));

  // Create a section with the subject information.
  var subjectSection = CardService.newCardSection()
    .setHeader("Subject")
    .addWidget(CardService.newTextParagraph().setText("<b>Subject:</b> " + subject));

  // Create a section for additional information (example: find sender's domain).
  var additionalInfoSection = CardService.newCardSection()
    .setHeader("Additional Information")
    .addWidget(CardService.newTextParagraph().setText("<b>Sender Domain:</b> " + extractDomain(sender)));

  // Build the main card.
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Email Details"))
    .addSection(senderSection)
    .addSection(subjectSection)
    .addSection(additionalInfoSection);

  return card.build();
}

/**
 * Extracts the domain from an email address.
 * @param {string} email The email address.
 * @return {string} The domain part of the email address, or the original email if parsing fails.
 */
function extractDomain(email) {
  try {
    var parts = email.split('@');
    if (parts.length === 2) {
      return parts[1];
    }
    return email; // Return original if not in expected format
  } catch (e) {
    return email; // Return original in case of error
  }
}


/**
 *  Required for Gmail add-ons.  
 */
function onGmailCompose(e) {
    return CardService.newCardBuilder().setHeader(
      CardService.newCardHeader().setTitle("Compose Action")
    ).build();
}


/**
 * Required for contextual add-ons.
 */
function onOpen(e) {
  return buildAddOn(e);
}

/**
 * Required for authorization.
 */
function getAuthorizationUrl(e) {
  return '';
}
