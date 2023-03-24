<?php
// Set generic options.

// Set all available post types.
function set_all_available_post_types() {
    return [
        [
            'type'      => 'post',
            'post_type' => 'post',
        ],
        [
            'type'      => 'post',
            'post_type' => 'page',
        ],
    ];
}

// Abstract responsive size options to be reuse.
function set_grid_size_options() {
    return [
        '' => 'Select One',
        '3/12' => '3/12',
        '4/12' => '4/12',
        '5/12' => '5/12',
        '6/12' => '6/12',
        '7/12' => '7/12',
        '9/12' => '9/12',
        '10/12' => '10/12',
        '11/12' => '11/12',
        '12/12' => '12/12',
    ];
}

function set_percentage_options() {
    return [
        '' => 'Select One',
        '0' => 0,
        '10' => 10,
        '20' => 20,
        '30' => 30,
        '40' => 40,
        '50' => 50,
        '60' => 60,
        '70' => 70,
        '80' => 80,
        '90' => 90,
        '100' => 100,
    ];
}

function set_contact_form_labels() {
    return [
        [
            'key' => 'input_name',
            'val' => 'Name',
        ],
        [
            'key' => 'input_email',
            'val' => 'Email',
        ],
        [
            'key' => 'input_phone',
            'val' => 'Phone',
        ],
        [
            'key' => 'input_contact_method',
            'val' => 'How would you like to be contacted?',
        ],
        [
            'key' => 'input_message',
            'val' => 'Your Request',
        ],
        [
            'key' => 'option_select_one',
            'val' => 'Select one',
        ],
        [
            'key' => 'option_email',
            'val' => 'Email',
        ],
        [
            'key' => 'option_phone',
            'val' => 'Phone',
        ],
        [
            'key' => 'button_submit',
            'val' => 'Submit',
        ],
        [
            'key' => 'placeholder_required',
            'val' => '(required)',
        ],
        [
            'key' => 'placeholder_optional',
            'val' => '(optional)',
        ],
    ];
}

function set_contact_form_client_statuses() {
    return [
        [
            'key' => 'name_invalid',
            'val' => 'Please fill this out, it\'s required.',
        ],
        [
            'key' => 'email_invalid',
            'val' => 'Please fill this out, it\'s required. Or, it is invalid.',
        ],
        [
            'key' => 'phone_invalid',
            'val' => 'Please fill this out, it\'s required.',
        ],
        [
            'key' => 'contact_method_invalid',
            'val' => 'Please select one, it\'s required.',
        ],
        [
            'key' => 'message_invalid',
            'val' => 'Please fill this out, it\'s required.',
        ],
    ];
}

function set_contact_form_server_statuses() {
    return [
        [
            'key' => 'sent_failed',
            'val' => 'Sorry, there was an error in sending your message. Please try again later.',
        ],
        [
            'key' => 'sent_ok',
            'val' => 'Thank you for leaving your mark. We will be in touch soon.',
        ],
    ];
}
