<?php
/**
 * Custom functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage --
 * @since Custom 1.0
 */

// Enable menu support.
// https://developer.wordpress.org/reference/functions/add_theme_support/
register_nav_menus(
    array(
        'primary-menu' => __( 'Primary Menu' ),
        'secondary-menu' => __( 'Secondary Menu' )
    )
);

// Disable Gutenberg Completely
// disable for posts
add_filter('use_block_editor_for_post', '__return_false', 10);

// disable for post types
add_filter('use_block_editor_for_post_type', '__return_false', 10);
