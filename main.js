
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyClQFUt7L4GR39WlipFZ7LlbO0kA04N6y4",
    authDomain: "live-chat-4ec9c.firebaseapp.com",
    databaseURL: "https://live-chat-4ec9c.firebaseio.com",
    projectId: "live-chat-4ec9c",
    storageBucket: "live-chat-4ec9c.appspot.com",
    messagingSenderId: "1086276165538"
  };
  firebase.initializeApp(config);

  var chatData = firebase.database().ref();

  function pushMessage(event) {
    if (event.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      chatData.push({name: name, text: text});
      $('#messageInput').val('');
    }
  }

  $('#messageInput').keypress(pushMessage);

  chatData.on("child_added", showMessage);

  function showMessage(msg) {
    var message = msg.val();
    var messageSender = message.name;
    var messageContent = message.text;

    var messageEl = $("<div/>").addClass("message");
    var senderEl = $("<span/>").text(messageSender + ": ");
    var contentEl = $("<span/>").text(messageContent);

    messageEl.append(senderEl);
    messageEl.append(contentEl);
    $('#messages').append(messageEl);
  }
