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

// Get current URL.
global $wp;
$current_url = home_url(add_query_arg(array(), $wp->request));
$parsed_url = parse_url($current_url);

$path = isset($parsed_url['path']) ? $parsed_url['path'] : '';
$app_url = 'http://localhost:3000' . $path;

$response = get_web_page($app_url);
$page = $response['response'];
?>

<main>
  <div id="app"><?php echo $page; ?></div>
</main>

<?php get_footer();
