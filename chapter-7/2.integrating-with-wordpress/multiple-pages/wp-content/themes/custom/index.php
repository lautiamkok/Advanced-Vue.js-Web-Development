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
 * @subpackage Custom
 * @since 1.0
 * @version 1.0
 */
get_header(); ?>

<!-- insert script into the template directly and manually -->
<script type="module" crossorigin src="<?php echo get_template_directory_uri(); ?>/dist/assets/main.4f5d1593.js"></script>

<main>
  <div id="app">
    <h1><?php the_title(); ?></h1>
    <p>{{ message }}</p>
    <comment>
      <p>I am a slot content</p>
    </comment>
  </div>
</main>

<?php get_footer();
