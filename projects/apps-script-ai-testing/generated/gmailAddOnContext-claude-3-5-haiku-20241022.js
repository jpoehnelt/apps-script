function onHomePage(e) {
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Email Insights'))
    .addSection(CardService.newCardSection()
      .addWidget(CardService.newTextButton()
        .setText('Analyze Email')
        .setOnClickAction(CardService.newAction().setFunctionName('analyzeEmail'))
      )
    )
    .build();
  
  return card;
}

function analyzeEmail(e) {
  // Get the current email message
  var message = GmailApp.getMessageById(e.gmail.messageId);
  
  // Extract email details
  var sender = message.getFrom();
  var subject = message.getSubject();
  var body = message.getPlainBody();
  
  // Create a card with email insights
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Email Details'))
    .addSection(CardService.newCardSection()
      .addWidget(CardService.newKeyValue()
        .setTopLabel('Sender')
        .setContent(sender)
      )
      .addWidget(CardService.newKeyValue()
        .setTopLabel('Subject')
        .setContent(subject)
      )
      .addWidget(CardService.newTextParagraph()
        .setText('Body Preview: ' + body.substring(0, 200) + '...')
      )
      .addWidget(CardService.newTextButton()
        .setText('Perform Email Analysis')
        .setOnClickAction(CardService.newAction().setFunctionName('performDetailedAnalysis'))
      )
    )
    .build();
  
  return card;
}

function performDetailedAnalysis(e) {
  var message = GmailApp.getMessageById(e.gmail.messageId);
  
  // Example additional analysis (you can expand this)
  var wordCount = message.getPlainBody().split(' ').length;
  var attachmentCount = message.getAttachments().length;
  
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Detailed Email Analysis'))
    .addSection(CardService.newCardSection()
      .addWidget(CardService.newKeyValue()
        .setTopLabel('Word Count')
        .setContent(wordCount.toString())
      )
      .addWidget(CardService.newKeyValue()
        .setTopLabel('Attachment Count')
        .setContent(attachmentCount.toString())
      )
      .addWidget(CardService.newTextParagraph()
        .setText('Additional insights and actions can be added here.')
      )
    )
    .build();
  
  return card;
}

// Manifest configuration
function getManifest() {
  return {
    "name": "Email Insights Add-on",
    "description": "Provides additional information about emails",
    "gmail": {
      "homepageTrigger": {
        "enabled": true,
        "runFunction": "onHomePage"
      }
    }
  };
}