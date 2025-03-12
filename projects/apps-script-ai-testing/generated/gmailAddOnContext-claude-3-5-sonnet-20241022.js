// Gmail add-on that shows additional email information
function getContextualAddOn(e) {
  var message = getCurrentMessage(e);
  
  // Create a card with email information
  var card = CardService.newCardBuilder();
  
  // Add header
  card.setHeader(CardService.newCardHeader()
    .setTitle('Email Details')
    .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/email_black_48dp.png'));
  
  // Get message details
  var sender = message.getFrom();
  var date = message.getDate();
  var subject = message.getSubject();
  var size = Math.round(message.getRawContent().length / 1024); // Size in KB
  var attachments = message.getAttachments();
  var recipients = message.getTo() + ',' + message.getCc() + ',' + message.getBcc();
  
  // Create sections for different types of information
  var basicInfoSection = CardService.newCardSection()
    .setHeader('Basic Information')
    .addWidget(CardService.newKeyValue()
      .setTopLabel('From')
      .setContent(sender))
    .addWidget(CardService.newKeyValue()
      .setTopLabel('Date')
      .setContent(date.toLocaleString()))
    .addWidget(CardService.newKeyValue()
      .setTopLabel('Subject')
      .setContent(subject))
    .addWidget(CardService.newKeyValue()
      .setTopLabel('Size')
      .setContent(size + ' KB'));
  
  var recipientSection = CardService.newCardSection()
    .setHeader('Recipients')
    .addWidget(CardService.newTextParagraph()
      .setText(recipients));
  
  var attachmentSection = CardService.newCardSection()
    .setHeader('Attachments (' + attachments.length + ')');
  
  // Add attachment information
  if (attachments.length > 0) {
    attachments.forEach(function(attachment) {
      attachmentSection.addWidget(
        CardService.newKeyValue()
          .setTopLabel(attachment.getName())
          .setContent(Math.round(attachment.getSize() / 1024) + ' KB')
      );
    });
  } else {
    attachmentSection.addWidget(
      CardService.newTextParagraph()
        .setText('No attachments')
    );
  }
  
  // Add all sections to the card
  card.addSection(basicInfoSection)
      .addSection(recipientSection)
      .addSection(attachmentSection);
  
  return [card.build()];
}

// Helper function to get the current message
function getCurrentMessage(e) {
  var accessToken = e.messageMetadata.accessToken;
  var messageId = e.messageMetadata.messageId;
  GmailApp.setCurrentMessageAccessToken(accessToken);
  return GmailApp.getMessageById(messageId);
}

// Manifest for deployment
function getManifest() {
  return {
    "addOns": {
      "common": {
        "name": "Email Details",
        "logoUrl": "https://www.gstatic.com/images/icons/material/system/1x/email_black_48dp.png",
        "useLocaleFromApp": true,
        "homepageTrigger": {
          "enabled": false
        }
      },
      "gmail": {
        "contextualTriggers": [{
          "unconditional": {},
          "onTriggerFunction": "getContextualAddOn"
        }],
        "composeTrigger": {
          "enabled": false
        }
      }
    }
  };
}