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

add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_script('module-1', get_template_directory_uri() . '/dist/assets/index.a9fd72e0.js', null, null, null);
    wp_enqueue_script('module-2', get_template_directory_uri() . '/dist/assets/vendor.8fad3531.js', null, null, null);
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

// Disable Gutenberg Completely
// disable for posts
add_filter('use_block_editor_for_post', '__return_false', 10);

// disable for post types
add_filter('use_block_editor_for_post_type', '__return_false', 10);
