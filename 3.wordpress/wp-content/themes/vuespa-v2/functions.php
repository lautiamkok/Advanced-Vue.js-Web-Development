<?php
/**
 * VueSPA functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage VueSPA
 * @since 1.0
 * @version 2.0
 */

// Enable menu support.
// https://developer.wordpress.org/reference/functions/add_theme_support/
register_nav_menus([
    'primary-menu' => __('Primary Menu'),
    'secondary-menu' => __('Secondary Menu')
]);

// Get current template filename.
function get_current_template() {
    global $template;
    $filename = basename($template);
    $bits = explode('.', $filename);
    return $bits[0];
}

// Disable Gutenberg Completely
// disable for posts
add_filter('use_block_editor_for_post', '__return_false', 10);

// disable for post types
add_filter('use_block_editor_for_post_type', '__return_false', 10);
