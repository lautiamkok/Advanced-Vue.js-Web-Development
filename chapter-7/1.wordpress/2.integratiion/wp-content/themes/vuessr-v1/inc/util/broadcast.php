<?php
// Rules: Function names use underscores between words, while class names use
// both the camelCase and PascalCase rules.
// https://www.php.net/manual/en/userlandnaming.rules.php

// Query broadcast data for a specific post for WP multisite.
// https://wordpress.stackexchange.com/questions/157890/can-i-use-wpdb-for-my-custom-tables-in-the-wordpress-database
// https://hookturn.io/2020/12/custom-wordpress-sql-queries-for-beginners/
function get_broadcast_data($blog_id, $post_id) {
    global $wpdb;
    $rows = $wpdb->get_results("SELECT * FROM wp__3wp_broadcast_broadcastdata WHERE post_id = '{$post_id}' AND blog_id = '{$blog_id}'");
    return $rows;
}

// Create all linked links for languages.
function get_menu_languages() {
    global $post;
    if (!$post) {
        return false;
    }

    // Stop here if it is a category.
    $term = get_query_var( 'term' );
    if ($term) {
        return false;
    }

    // print_r(get_blog_details());
    $post_id = $post->ID;
    $blog_id = get_current_blog_id();
    $linked_languages = [];
    $linked_children = [];

    // Get the broadcast data for this page.
    $rows = get_broadcast_data($blog_id, $post_id);

    // Stop here if no row found.
    if (is_countable($rows) && count($rows) === 0) {
        return false;
    }

    // If it is main site, then just look for linked children.
    // https://developer.wordpress.org/reference/functions/is_main_site/
    if (is_main_site()) {
        foreach ($rows as $key => $item) {
            $data = unserialize(base64_decode($item->data));
            if (isset($data['linked_children'])) {
                $linked_children = $data['linked_children'];
            }
        }
        $blog_url = get_blog_option($blog_id, 'siteurl');
        $linked_languages[$blog_id] = $blog_url . '/?p=' . $post_id;
    } else {
        // Look for parent.
        foreach ($rows as $key => $item) {
            $data = unserialize(base64_decode($item->data));
            if (isset($data['linked_parent'])) {
                $linked_parent = $data['linked_parent'];
            }
        }

        // Get linked children by parent's.
        $parent_post_id = $linked_parent['post_id'];
        $parent_blog_id = $linked_parent['blog_id'];
        $rows = get_broadcast_data($parent_blog_id, $parent_post_id);
        foreach ($rows as $key => $item) {
            $data = unserialize(base64_decode($item->data));
            if (isset($data['linked_children'])) {
                $linked_children = $data['linked_children'];
            }
        }
        $blog_url = get_blog_option($parent_blog_id, 'siteurl');
        $linked_languages[$parent_blog_id] = $blog_url . '/?p=' . $parent_post_id;
    }

    foreach ($linked_children as $blog_id => $post_id) {
        $blog_url = get_blog_option($blog_id, 'siteurl');
        // Get blog site url by blog id.
        // https://developer.wordpress.org/reference/functions/get_blog_option/
        // https://developer.wordpress.org/reference/functions/get_option/
        // https://wordpress.stackexchange.com/questions/95533/how-i-can-get-blog-info-using-site-url-in-multi-site
        $linked_languages[$blog_id] = $blog_url . '?p=' . $post_id;
    }
    return $linked_languages;
}
