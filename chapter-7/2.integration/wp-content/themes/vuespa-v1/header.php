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
 * @since VueSPA 1.0
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="profile" href="https://gmpg.org/xfn/11" />
  <?php wp_head(); ?>

  <!-- Insert modules directly here or programmatically in function.php -->
  <!-- <script type="module" crossorigin src="<?php echo get_template_directory_uri(); ?>/dist/assets/index.654dbb49.js"></script>
  <link rel="modulepreload" href="<?php echo get_template_directory_uri(); ?>/dist/assets/vendor.aac4256a.js"> -->
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
