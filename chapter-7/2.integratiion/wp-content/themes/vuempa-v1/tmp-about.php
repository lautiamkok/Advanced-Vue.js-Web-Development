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
<script type="module" crossorigin src="/wp-content/themes/vuempa-v1/dist/assets/about.0cac5d95.js"></script>
<!-- <link rel="modulepreload" href="/wp-content/themes/vuempa-v1/dist/assets/modulepreload-polyfill.b7f2da20.js">
<link rel="modulepreload" href="/wp-content/themes/vuempa-v1/dist/assets/vendor.b2dd5ac4.js"> -->

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
