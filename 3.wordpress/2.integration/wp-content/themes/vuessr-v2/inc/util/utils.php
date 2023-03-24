<?php
// Rules: Function names use underscores between words, while class names use
// both the camelCase and PascalCase rules.
// https://www.php.net/manual/en/userlandnaming.rules.php

// Get the url of any attachment, image, file, video, etc.
// https://developer.wordpress.org/reference/functions/wp_get_attachment_url/
function get_asset_url($attachment_id) {
    return wp_get_attachment_url($attachment_id);
}

// Get the image by different sizes: medium, large, medium_large, thumbnail.
// https://developer.wordpress.org/reference/functions/wp_get_attachment_image_src/
function get_image_url($attachment_id, $size = '') {
    $data = wp_get_attachment_image_src($attachment_id, $size);
    if (!is_countable($data)) {
        return false;
    }
    return $data[0];
}

// Get asset (image, file, video, etc) data and its sizes (image only).
// https://developer.wordpress.org/reference/functions/wp_get_attachment_metadata/
function get_asset_data($attachment_id) {
    if (!$attachment_id) {
        return false;
    }
    $data = wp_get_attachment_metadata($attachment_id);
    if (!$data) {
        return false;
    }
    $uploads_baseurl = wp_upload_dir()['baseurl'];

    // Push more keys to the data.
    $data['url'] = $uploads_baseurl . '/' . $data['file'];
    $data['mime_type'] = $data['mime_type'] ?? get_post_mime_type($attachment_id);

    // Push the `url` key to the sizes (image only).
    if ($data['sizes']) {
        foreach($data['sizes'] as $key => &$size) {
            // Change the 'mime-type' default to 'mime_type' so that it is
            // consistent with other assets, such as videos..
            $size['mime_type'] = $size['mime-type'];
            unset($size['mime-type']);

            $size['url'] = $uploads_baseurl . '/' . $data['file'];
        }
    }
    return $data;
}

// Get the web page content via cURL.
function get_web_page($url) {
    // servers might disallow requests that contain unidentified user agent, so
    // set an arbitrary/ custom user agent to fool the server that your cURL
    // request is coming from a legitimate up-to-date browser, e.g. Firefox,
    // Chrome, Safari, etc. You can find your browser's user agent via this
    // link: http://my-user-agent.com/. Just place that link on your browser
    // address bar, e.g. Firebox, then you should get the info of your
    // browser's user agent.
    $user_agent='Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:98.0) Gecko/20100101 Firefox/98.0';

    // Set default cURL options.
    $options = [
        CURLOPT_CUSTOMREQUEST =>"GET", //set request type post or get
        CURLOPT_POST =>false, //set to GET
        CURLOPT_USERAGENT => $user_agent, //set user agent
        CURLOPT_COOKIEFILE =>"cookie.txt", //set cookie file
        CURLOPT_COOKIEJAR =>"cookie.txt", //set cookie jar
        CURLOPT_RETURNTRANSFER => true, // return web page
        CURLOPT_HEADER => false, // don't return headers
        CURLOPT_FOLLOWLOCATION => true, // follow redirects
        CURLOPT_ENCODING => "", // handle all encodings
        CURLOPT_AUTOREFERER => true, // set referer on redirect
        CURLOPT_CONNECTTIMEOUT => 120, // timeout on connect
        CURLOPT_TIMEOUT => 120, // timeout on response
        CURLOPT_MAXREDIRS => 10, // stop after 10 redirects
    ];

    // Send the cURL request and get the response.
    $ch = curl_init($url);
    curl_setopt_array($ch, $options);
    $response = curl_exec($ch);
    $header_info = curl_getinfo($ch);
    curl_close($ch);
    

    // Set the HTTP status header manually.
    // https://developer.wordpress.org/reference/functions/status_header/
    // print_r($header_info);
    status_header($header_info['http_code']);

    // Decode the json response and return it.
    return json_decode($response, true);
}

// Get an item from the haystack.
function get_haystack_item(string $needle = '', array $haystack = [], string $column = 'slug') {
    if (!$needle) {
        return false;
    }
    if (is_countable($haystack) === false || count($haystack) === 0) {
        return false;
    }

    // Get the index.
    $index = array_search($needle, array_column($haystack, $column));
    if ($index === false) {
        return false;
    }

    return $haystack[$index];
}

// Get the value from key-value metabox.
function get_key_value($needle = '', $haystack = []) {
    if (!$needle) {
        return false;
    }
    if (is_countable($haystack) === false || count($haystack) === 0) {
        return false;
    }

    // Get the index.
    $index = array_search($needle, array_column($haystack, 'key'));
    if ($index === false) {
        return false;
    }

    return $haystack[$index]['val'];
}

// Array to string with line breaks.
function array_to_string($array) {
    $output = implode("\n", array_map( // double quotes needed.
        function ($value, $key) {
            return sprintf("%s: %s", $key, $value);
        },
        $array,
        array_keys($array)
    ));

    return $output;
}
