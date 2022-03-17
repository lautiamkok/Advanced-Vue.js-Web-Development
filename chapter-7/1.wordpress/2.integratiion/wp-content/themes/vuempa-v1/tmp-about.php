<?php
/*
Template Name: About - About
Template Post Type: page
*/
/**
 * The template for displaying "About" page
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage VueMPA
 * @since 1.0
 * @version 1.0
 */
get_header(); ?>

<!-- insert script into the template directly and manually -->
<script type="module" crossorigin src="<?php echo get_template_directory_uri(); ?>/dist/assets/about.be92dc1b.js"></script>

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
