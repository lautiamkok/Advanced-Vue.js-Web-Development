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
 * @subpackage VueSPA
 * @since 1.0
 * @version 2.0
 */
get_header(); ?>

<main>
  <div id="app">
    <h1 class="font-bold text-3xl">
      <?php the_title(); ?>
    </h1>
    <p class="text-blue">
      Options API: {{ useUppercase(message) }}
    </p>
    <p class="text-blue">
      Composition API/ Composables: {{ useUppercase(useMessage) }}
    </p>
    <div class="container mx-auto space-y-3 has-links border-1">
      <?php the_content(); ?>
    </div>
    <button class="button">
      I am a button
    </button>
    <div class="py-10 space-y-3">
      <p>
        Requiring images manually from the `/public/static/` folder only:
      </p>
      <img alt="R0001844" src="/wp-content/themes/vuespa-v2/dist/static/R0001844.jpg" />
      <p>
        Requiring images from the `/src/assets/` folder won't work because Vite does not support alias in HTML files. For example:
      </p>
      <p>
        &lt;img alt="R0003515" src="@/assets/images/R0003515.jpg" /&gt;
      </p>
      <!-- <img alt="R0003515" src="@/assets/images/R0003515.jpg" /> -->
    </div>

    <div class="py-10 space-y-3">
      <h2 class="font-bold text-2xl">
        Importing Components
      </h2>
      <comment>
        <p>
          I am a slot content
        </p>
      </comment>
      <post-item
        v-bind:title="'Sample Post 1'"
        v-bind:excerpt="'<p>Example on how to pass data to components.</p>'">
      </post-item>
    </div>
  </div>
</main>

<?php get_footer();
