<?php
/**
 * VueSSR functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage VueSSR
 * @since 1.0
 * @version 2.0
 */

// Enable menu support.
// https://developer.wordpress.org/reference/functions/add_theme_support/
register_nav_menus([
    'primary-menu' => __('Primary Menu'),
    'secondary-menu' => __('Secondary Menu')
]);

// Enable post thumbnail support.
// https://codex.wordpress.org/Post_Thumbnails
if (function_exists('add_theme_support')) {
    add_theme_support('post-thumbnails');
}

// Utils.
include 'inc/util/utils.php';
include 'inc/util/metainfo.php';

// Install metaboxes.
use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action( 'after_setup_theme', 'crb_load' );
function crb_load () {
    require_once( 'vendor/autoload.php' );
    \Carbon_Fields\Carbon_Fields::boot();
}

include 'inc/metabox/carbon-fields/config.php';
include 'inc/metabox/carbon-fields/commons.php';
include 'inc/metabox/carbon-fields/fields/theme-options.php';
include 'inc/metabox/carbon-fields/fields/metainfo.php';

/**
 * Include APIs.
 *
 */
include 'inc/api/commons.php';
include 'inc/api/post/get/items.php';
include 'inc/api/post/get/item.php';
include 'inc/api/page/get/contact.php';
include 'inc/api/page/get/item.php';
include 'inc/api/contact/post/message.php';

// Disable Gutenberg Completely
// disable for posts
add_filter('use_block_editor_for_post', '__return_false', 10);

// disable for post types
add_filter('use_block_editor_for_post_type', '__return_false', 10);
