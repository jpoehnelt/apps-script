// This global variable caches the add-on's user interface.
var card;

/**
 * Runs when the add-on is installed.
 * @param {object} e The event parameter for add-on install.
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Runs when the add-on is opened from a Gmail message.
 * @param {object} e The event parameter for add-on open.
 * @return {CardService.Card} The card to display to the user.
 */
function onOpen(e) {
  var accessToken = e.authorizationEventObject.userOAuthToken;
  if (accessToken) {
    // User has granted authorization, build the card.
    card = createCard(e);
  } else {
    // User has not granted authorization, build the authorization card.
    card = createAuthorizationCard();
  }
  return [card];
}

/**
 * Creates the main card with email information.
 * @param {object} e The event parameter for add-on open.
 * @return {CardService.Card} The card to display to the user.
 */
function createCard(e) {
  var message = e.gmail.message;
  var headerFrom = message.getHeaderValue('From');
  var headerTo = message.getHeaderValue('To');
  var subject = message.subject;
  var body = message.body;
  var date = message.date;

  // Create a card builder.
  var cardBuilder = CardService.newCardBuilder();

  // Add a section to display email details.
  var section = CardService.newCardSection()
    .setHeader('Email Details')
    .addWidget(CardService.newTextParagraph().setText('From: ' + headerFrom))
    .addWidget(CardService.newTextParagraph().setText('To: ' + headerTo))
    .addWidget(CardService.newTextParagraph().setText('Subject: ' + subject))
    .addWidget(CardService.newTextParagraph().setText('Date: ' + date));

  cardBuilder.addSection(section);

  // Add a section to display the email body (truncated).
  var bodySection = CardService.newCardSection()
    .setHeader('Email Body (Truncated)')
    .addWidget(CardService.newTextParagraph().setText(body.substring(0, 500) + '...')); // Truncate to 500 characters

  cardBuilder.addSection(bodySection);

  // Create a button to open the email in a new tab.
  var openEmailButton = CardService.newTextButton()
    .setText('Open Email')
    .setOpenLink(message.permalink);

  var buttonSet = CardService.newButtonSet().addButton(openEmailButton);
  cardBuilder.addCardAction(CardService.newCardAction().setText('Refresh').setOnClick(CardService.newAction().setFunctionName('onOpen')));
  cardBuilder.addButtonSet(buttonSet);

  // Build the card.
  return cardBuilder.build();
}

/**
 * Creates the authorization card.
 * @return {CardService.Card} The card to display to the user.
 */
function createAuthorizationCard() {
  var cardBuilder = CardService.newCardBuilder();

  var authorizationAction = CardService.newAuthorizationAction()
    .setAuthorizationUrl(ScriptApp.getService().getUrl());

  var textParagraph = CardService.newTextParagraph()
    .setText('Authorize the add-on to access your Gmail data.');

  var button = CardService.newTextButton()
    .setText('Authorize')
    .setAuthorizationAction(authorizationAction);

  var buttonSet = CardService.newButtonSet().addButton(button);

  cardBuilder.addSection(CardService.newCardSection().addWidget(textParagraph));
  cardBuilder.addButtonSet(buttonSet);

  return cardBuilder.build();
}
