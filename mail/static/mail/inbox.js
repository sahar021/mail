document.addEventListener('DOMContentLoaded', function() {
  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => {load_mailbox('inbox');
  console.log('inbox');
  fetch('/emails/inbox')
    .then(response => response.json())
    .then(emails => {
      document.getElementById("inbox_content").innerHTML = "";
      document.getElementById("inbox_title").innerHTML = "";

      emails.forEach(email => {
        document.getElementById("inbox_content").innerHTML += "<tr><td>"+email.sender+"</td><td>"+email.subject+"</td><td>"+email.body+"</td></tr>";
      });
    // Print emails
    console.log(emails);
    // ... do something else with emails ...
    });
  });
  document.querySelector('#sent').addEventListener('click', () => {load_mailbox('sent');
  console.log('sent');
  fetch('/emails/sent')
    .then(response => response.json())
    .then(emails => {
        document.getElementById("sent_content").innerHTML += "<tr><td>"+email.sender+"</td><td>"+email.subject+"</td><td>"+email.body+"</td></tr>";
    // Print emails
    console.log(emails);
    // ... do something else with emails ...
    });
      });
  document.querySelector('#archived').addEventListener('click', () => {load_mailbox('archive');
  console.log('archive');
  fetch('/emails/archive')
    .then(response => response.json())
    .then(emails => {
    // Print emails
    console.log(emails);
    // ... do something else with emails ...
    });
      });
  document.querySelector('#save_email').addEventListener('click', () => save_mail(mail_info = '10'));

  document.querySelector('#compose-recipients')
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

function save_mail(mail_info) {
console.log('save_mail');
  var user_email = document.querySelector('#user_email').value;
  var compose_recipients = document.querySelector('#compose-recipients').value;
  var compose_subject = document.querySelector('#compose-subject').value;
  var compose_body = document.querySelector('#compose-body').value;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "emails");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }};

  let data = `{"recipients": "${compose_recipients}","subject": "${compose_subject}","body": "${compose_body}"}`;

  xhr.send(data);
  console.log(user_email, compose_recipients, compose_subject, compose_body)
}

function test(){
  fetch('https://reqbin.com/echo/post/json', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "id": 78912 })
})
.then(response => response.json())
.then(response => console.log(JSON.stringify(response)))
}
