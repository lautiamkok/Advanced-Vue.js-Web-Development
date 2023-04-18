<?php
/**
 * Custom JSON API endpoint.
 * MUST make sure an .htaccess is included in the wordpress root directory
 * otherwise POST routes will never work.
 * https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/
 */

// Include Composer autoloader.
require_once __DIR__ . '/../../../../vendor/autoload.php';

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Create a course page's data.
function send_message ($data) {
    // return [
    //     'statusText' => 'ok',
    //     'statusCode' => 200,
    //     'message' => 'OK!'
    // ];

    $sender_name = $data->get_param('name');
    $sender_email = $data->get_param('email');
    $sender_telephone = $data->get_param('telephone');
    $sender_message = $data->get_param('message');

    // Get the mail settings.
    $forms = carbon_get_theme_option('forms');
    if (is_countable($forms) && count($forms) === 0) {
        return [
            'statusText' => 'error',
            'statusCode' => 500,
            'message' => 'No mail setting is found.'
        ];
    }
    $message_form = get_haystack_item('message', $forms);
    $server_statuses = $message_form['server_statuses'];

    // Convert form (array) to string.
    $form = [
        'Name' => $sender_name,
        'Email' => $sender_email,
        'Phone' => $sender_telephone,
        'Message' => $sender_message,
    ];
    $form_string = array_to_string($form);

    // Instantiation and passing `true` enables exceptions
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';

    $server_name = $message_form['server_name'];
    $server_email = $message_form['server_email'];

    $recipient_name = $message_form['recipient_name'];
    $recipient_email = $message_form['recipient_email'];

    // Recipients:
    // Send the message to the site owner.
    $mail->setFrom($server_email, $server_name);
    $mail->addAddress($recipient_email, $recipient_name);
    $mail->addReplyTo($sender_email, $sender_name);

    // Content:
    $mail->Subject = $message_form['subject'];
    $mail->Body = $form_string;

    if (!$mail->send()) {
        $statusText = 'error';
        $statusCode = 500;
        $message = get_key_value('sent_failed', $server_statuses);
    } else {
        $statusText = 'ok';
        $statusCode = 200;
        $message = get_key_value('sent_ok', $server_statuses);
    }

    return [
        'statusText' => $statusText,
        'statusCode' => $statusCode,
        'message' => $message
    ];
}

// Create the endpoint.
add_action('rest_api_init', function () use ($namespace) {
    $route = 'contact/message';
    $args = [
        'methods' => 'POST',
        'callback' => 'send_message',
    ];
    register_rest_route($namespace, $route, $args);
});
