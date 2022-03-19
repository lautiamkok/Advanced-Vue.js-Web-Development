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
 * @since VueSSR 1.0
 */

// Retrieves the ID of the currently queried object with get_queried_object_id().
// https://developer.wordpress.org/reference/functions/get_queried_object_id/
$post_meta = create_post_meta(get_queried_object_id(), $type = 'article');
$meta_primary = $post_meta['primary'];
$meta_og = $post_meta['open_graph'];

// Get the theme meta.
$open_graph = carbon_get_theme_option('open_graph')[0];
$favicon_id = carbon_get_theme_option('favicon');
$favicon_url = get_image_url($favicon_id);
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- standard meta content -->
  <meta name="description" content="<?php echo $meta_primary['description'];?>">
  <meta name="keywords" content="<?php echo $meta_primary['keywords']; ?>">

  <!-- social meta content -->
  <meta property="og:type" content="<?php echo $open_graph['og_type']; ?>">
  <meta property="og:url" content="<?php echo site_url(); ?>">
  <meta property="og:title" content="<?php echo $meta_og['title']; ?>">
  <meta property="og:description" content="<?php echo $meta_og['description']; ?>">
  <meta property="og:image" content="<?php echo $meta_og['image']; ?>">
  <meta property="og:image:width" content="<?php echo $open_graph['og_image_width']; ?>">
  <meta property="og:image:height" content="<?php echo $open_graph['og_image_height']; ?>">
  <meta property="fb:app_id" content="<?php echo $open_graph['fb_app_id']; ?>">

  <?php if ($open_graph['twitter_site']): ?>
  <meta name="twitter:site" content="<?php echo $open_graph['twitter_site']; ?>">
  <?php endif; ?>

  <?php if ($open_graph['twitter_creator']): ?>
  <meta name="twitter:creator" content="<?php echo $open_graph['twitter_creator']; ?>">
  <?php endif; ?>

  <meta name="twitter:card" content="<?php echo $open_graph['twitter_card']; ?>">
  <meta name="twitter:description" content="<?php echo $meta_og['description']; ?>">

  <title><?php echo $meta_primary['title']; ?></title>

  <?php wp_head(); ?>
  <link rel="shortcut icon" href="<?php echo $favicon_url; ?>" type="image/x-icon">
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
