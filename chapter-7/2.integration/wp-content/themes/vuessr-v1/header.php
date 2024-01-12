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

// Get current URL.
global $wp;
$current_url = home_url(add_query_arg(array(), $wp->request));
$parsed_url = parse_url($current_url);

$path = isset($parsed_url['path']) ? $parsed_url['path'] : '';
$app_url = 'http://localhost:3000' . $path;

$result = get_web_page($app_url);
$head_tags = isset($result['response']['headTags']) ? $result['response']['headTags'] : '';
$app_html = isset($result['response']['appHtml']) ? $result['response']['appHtml'] : '';

// Set the app HTML to the WP cache.
// https://developer.wordpress.org/reference/functions/wp_cache_set/
wp_cache_set('app_html', $app_html);

$favicon_id = carbon_get_theme_option('favicon');
$favicon_url = get_image_url($favicon_id);
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <?php echo $head_tags; ?>

  <?php wp_head(); ?>
  <link rel="shortcut icon" href="<?php echo $favicon_url; ?>" type="image/x-icon">
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
