<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage VueSSR
 * @since 1.0
 * @version 1.0
 */
get_header();

// Get the app HTML to the WP cache.
// https://developer.wordpress.org/reference/functions/wp_cache_get/
$app_html = wp_cache_get('app_html');
?>

<main>
  <div id="app"><?php echo $app_html; ?></div>
</main>

<?php get_footer();
