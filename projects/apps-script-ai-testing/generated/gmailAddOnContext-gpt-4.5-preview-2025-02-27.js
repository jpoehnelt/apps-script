function buildAddOn(e) {
  var messageId = e.gmail.messageId;
  var message = GmailApp.getMessageById(messageId);
  var sender = message.getFrom();
  var subject = message.getSubject();
  var date = message.getDate();

  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Email Details"))
    .addSection(CardService.newCardSection()
      .addWidget(CardService.newTextParagraph().setText("<b>Sender:</b> " + sender))
      .addWidget(CardService.newTextParagraph().setText("<b>Subject:</b> " + subject))
      .addWidget(CardService.newTextParagraph().setText("<b>Date:</b> " + date)))
    .build();

  return card;
}

function getContextualAddOn(e) {
  return buildAddOn(e);
}