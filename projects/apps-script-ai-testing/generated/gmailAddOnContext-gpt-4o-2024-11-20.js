function getContextualAddOn() {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Email Details"))
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newTextParagraph().setText("This add-on provides additional information about the email you are reading."))
    )
    .build();
}

function buildAddOn(e) {
  const messageId = e.gmail.messageId;
  const threadId = e.gmail.threadId;

  const message = GmailApp.getMessageById(messageId);
  const subject = message.getSubject();
  const sender = message.getFrom();
  const recipients = message.getTo();
  const date = message.getDate();

  const card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Email Details"))
    .addSection(
      CardService.newCardSection()
        .addWidget(CardService.newKeyValue().setTopLabel("Subject").setContent(subject))
        .addWidget(CardService.newKeyValue().setTopLabel("Sender").setContent(sender))
        .addWidget(CardService.newKeyValue().setTopLabel("Recipients").setContent(recipients))
        .addWidget(CardService.newKeyValue().setTopLabel("Date").setContent(date.toString()))
    )
    .build();

  return card;
}

function onGmailMessageOpen(e) {
  return buildAddOn(e);
}

function onHomepage(e) {
  return getContextualAddOn();
}

function getGmailAddOnManifest() {
  return {
    "oauthScopes": [
      "https://www.googleapis.com/auth/gmail.readonly"
    ],
    "gmail": {
      "name": "Email Details Viewer",
      "logoUrl": "https://www.example.com/logo.png",
      "contextualTriggers": [
        {
          "unconditional": {},
          "onTriggerFunction": "onGmailMessageOpen"
        }
      ],
      "primaryColor": "#4285F4",
      "secondaryColor": "#D3E3FD",
      "homepageTrigger": {
        "runFunction": "onHomepage"
      }
    }
  };
}