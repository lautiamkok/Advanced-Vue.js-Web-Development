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
 * @version 2.0
 */
get_header(); ?>

<main>
  <div id="app">
    <h1 class="font-bold text-3xl">
      <?php the_title(); ?>
    </h1>
    <div class="space-y-3 has-links">
      <?php the_content(); ?>
    </div>

    <div class="py-10 space-y-3">
      <h2 class="font-bold text-2xl">
        Components & Slots
      </h2>
      <comment v-bind:message="'Awesome idea!'">
        <p>
          Requiring images manually from the `/public/static/` folder only:
        </p>
        <?php the_post_thumbnail(); ?>
      </comment>
    </div>
  </div>
</main>

<?php get_footer();
