<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage VueSSR
 * @since 1.0
 * @version 2.0
 */

// Get current URL.
global $wp;
$current_url = home_url(add_query_arg(array(), $wp->request));
$parsed_url = parse_url($current_url);

$path = isset($parsed_url['path']) ? $parsed_url['path'] : '';
$app_url = 'http://localhost:3000' . $path;

$response = get_web_page($app_url);
$head_tags = $response['headTags'] ?? '';
$app_html = $response['appHtml'] ?? '';
$preload_links = $response['preloadLinks'] ?? '';
$ssr_context = $response['ssrContext'] ?? '';

// Set the app HTML to the WP cache.
// https://developer.wordpress.org/reference/functions/wp_cache_set/
wp_cache_set('app_html', $app_html);

$favicon_id = carbon_get_theme_option('favicon');
$favicon_url = get_image_url($favicon_id);
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <?php echo $preload_links ; ?>
  <?php echo $ssr_context; ?>
  <?php echo $head_tags; ?>

  <?php wp_head(); ?>
  <link rel="shortcut icon" href="<?php echo $favicon_url; ?>" type="image/x-icon">

  <script type="module" crossorigin src="/wp-content/themes/vuessr-v2/dist/client/assets/index-cd15b7b5.js"></script>
  <link rel="stylesheet" href="/wp-content/themes/vuessr-v2/dist/client/assets/index-da947b8e.css">
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
