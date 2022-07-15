<?php
/**
 * VueSSR functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage --
 * @since VueSSR 1.0
 */

// Enable menu support.
// https://developer.wordpress.org/reference/functions/add_theme_support/
register_nav_menus(
    array(
        'primary-menu' => __( 'Primary Menu' ),
        'secondary-menu' => __( 'Secondary Menu' )
    )
);

// Enable post thumbnail support.
// https://codex.wordpress.org/Post_Thumbnails
if (function_exists('add_theme_support')) {
    add_theme_support('post-thumbnails');
}

add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_script('module-1', get_template_directory_uri() . '/dist/client/assets/index.44e1c329.js', null, null, null);
    wp_enqueue_script('module-2', get_template_directory_uri() . '/dist/client/assets/vendor.ddbece1d.js', null, null, null);
    wp_enqueue_style('style-1', get_template_directory_uri() . '/dist/client/assets/index.020c467a.css');
});

// Change the script tag and return it.
add_filter( 'script_loader_tag', function ( $tag, $handle, $src ) {
    switch ( $handle ) {
        case 'module-1':
            return '<script type="module" crossorigin src="' . esc_url( $src ) . '"></script>';
            break;

        case 'module-2':
            return '<link rel="modulepreload" href="' . esc_url( $src ) . '">';
            break;

        default:
            return $tag;

            break;
    }
}, 10, 3 );

// Utils.
include 'inc/util/utils.php';
include 'inc/util/menus.php';
include 'inc/util/meta.php';

// Install metaboxes.
use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action( 'after_setup_theme', 'crb_load' );
function crb_load () {
    require_once( 'vendor/autoload.php' );
    \Carbon_Fields\Carbon_Fields::boot();
}

include 'inc/metabox/carbon-fields/utils.php';
include 'inc/metabox/carbon-fields/meta.php';
include 'inc/metabox/carbon-fields/theme-options.php';

/**
 * Include APIs.
 *
 */
include 'inc/api/commons.php';
include 'inc/api/get/post-items.php';
include 'inc/api/get/post-item.php';
include 'inc/api/get/page-item.php';

// Disable Gutenberg Completely
// disable for posts
add_filter('use_block_editor_for_post', '__return_false', 10);

// disable for post types
add_filter('use_block_editor_for_post_type', '__return_false', 10);
