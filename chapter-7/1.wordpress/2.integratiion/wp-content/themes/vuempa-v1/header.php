<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage --
 * @since VueMPA 1.0
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="profile" href="https://gmpg.org/xfn/11" />
  <?php wp_head(); ?>

  <?php
  // Use post slug to load script tags conditionally or insert the script
  // directly to the individual template.
  global $post;
  $post_slug = $post->post_name;
  ?>

  <!-- Common modules share between templates -->
  <link rel="modulepreload" href="<?php echo get_template_directory_uri(); ?>/dist/assets/modulepreload-polyfill.b7f2da20.js">
  <link rel="modulepreload" href="<?php echo get_template_directory_uri(); ?>/dist/assets/vendor.8fad3531.js">
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
