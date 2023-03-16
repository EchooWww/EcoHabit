$(function () {
  const socket = io();
  const $messages = $('#messages');

  // Handle sending a message
  $("form").submit(function (e) {
    e.preventDefault();

    // Get the message text
    const message = $("#m").val();

    // Add the message to the messages list as a new chat message
    const $message = $('<div class="conversation-window"><div class="chat-message sent"><p></p></div></div>');
    $message.find('p').text(message);
    $messages.append($message);
    // Send the message to the server
    socket.emit("chat message", message);

    // Clear the input field
    $("#m").val("");
    return false;
  });

  // Handle receiving a message
  socket.on("chat message", function (msg) {
    // Add the message to the messages list as a new chat message
    const $message = $('<div class="conversation-window"><div class="chat-message received"><p></p></div></div>');
    $message.find('p').text(msg);
    $messages.append($message);
  });
});

