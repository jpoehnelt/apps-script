function onGmailMessageOpen(e) {
  var messageId = e.messageId;
  var message = GmailApp.getMessageById(messageId);
  var subject = message.getSubject();
  var from = message.getFrom();
  var body = message.getBody();

  // Create a card to display additional information
  var card = CardService.newCardBuilder();

  // Add a header
  card.addHeader(CardService.newCardHeader()
      .setTitle('Email Information')
      .setSubtitle('Details about the email you are reading'));

  // Add a section with the email details
  var section = CardService.newCardSection();
  section.addWidget(CardService.newTextParagraph().setText('From: ' + from));
  section.addWidget(CardService.newTextParagraph().setText('Subject: ' + subject));
  section.addWidget(CardService.newTextParagraph().setText('Body: ' + body.substring(0, 200) + '...')); // Show first 200 chars

  card.addSection(section);

  // Return the card to display
  return card.build();
}

function getContextualAddOn(e) {
  return onGmailMessageOpen(e);
}