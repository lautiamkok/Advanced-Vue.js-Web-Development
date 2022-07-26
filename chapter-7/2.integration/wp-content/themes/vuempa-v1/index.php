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
 * @subpackage VueMPA
 * @since 1.0
 * @version 1.0
 */
get_header(); ?>

<!-- insert script into the template directly and manually -->
<script type="module" crossorigin src="/wp-content/themes/vuempa-v1/dist/assets/main.4fab4244.js"></script>
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
