<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if (
  isset($_POST['name'], $_POST['email'], $_POST['message']) &&
  filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
) {
  $to      = 'loic.vidal-ferrasse@etu.umontpellier.fr';
  $subject = 'Contact Form Message';
  $body    = "Name: {$_POST['name']}\nEmail: {$_POST['email']}\n\nMessage:\n{$_POST['message']}";
  $headers = 
    'From: no-reply@etu.umontpellier.fr' . "\r\n" .
    'Reply-To: ' . $_POST['email'] . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

  $sent = mail($to, $subject, $body, $headers);

  if ($sent) {
    header('Location: thankyou.html');
    exit;
  } else {
    error_log("Mail failed to send to $to. Headers: $headers, Body: $body");
    header('Location: error.html');
    exit;
  }
} else {
  header('Location: error.html');
  exit;
}
?>