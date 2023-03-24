<?php
// Rules: Function names use underscores between words, while class names use
// both the camelCase and PascalCase rules.
// https://www.php.net/manual/en/userlandnaming.rules.php

// Create post title for <title> tag.
function create_post_title($id = null) {
    $post_title = get_the_title($id);

    // Check if the request is a taxonomy then get its name.
    // https://developer.wordpress.org/reference/functions/is_tax/
    if (is_tax()) {
        $term_slug = get_query_var( 'term' );
        $term_taxonomy = get_query_var( 'taxonomy' );
        $term = get_term_by('slug', $term_slug, $term_taxonomy);
        $post_title = $term->name;
    }

    $home_id = (int)get_option('page_on_front');
    $site_title = get_bloginfo('title', 'display');

    // Use the custom info that are set using Carbon Fields.
    // $site_tagline = get_bloginfo('tagline', 'display');
    $site_tagline = carbon_get_theme_option('tagline');

    $page_title = $post_title . ' | ' . $site_title;
    if ($id === $home_id) {
        $page_title = $site_title . ' | ' . $site_tagline;
    }
    return $page_title;
}

// Create post meta contents for all <meta> tags.
function create_post_meta($id, $type = 'article') {
    // Get the page SEO metadata.
    $meta_title = carbon_get_post_meta($id, 'seo_meta_title');
    $meta_description = carbon_get_post_meta($id, 'seo_meta_description');
    $meta_keywords = carbon_get_post_meta($id, 'seo_meta_keywords');

    // Get the page social metadata.
    $social_title = carbon_get_post_meta($id, 'social_meta_title');
    $social_description = carbon_get_post_meta($id, 'social_meta_description');
    $social_image = carbon_get_post_meta($id, 'social_meta_image');

    // Get the theme meta.
    $open_graph = carbon_get_theme_option('open_graph')[0];

    // Set title.
    if (!$meta_title) {
        $meta_title = create_post_title($id);
    }

    // Set description.
    if (!$meta_description) {
        $meta_description = carbon_get_theme_option('description');
    }

    // Set keywords.
    if (!$meta_keywords) {
        $meta_keywords = carbon_get_theme_option('keywords');
    }

    // Set title.
    if (!$social_title) {
        $social_title = $meta_title;
    }

    // Set description.
    if (!$social_description) {
        $social_description = $meta_description;
    }

    // Set image.
    if (!$social_image) {
        $social_image = $open_graph['og_image'];
    }

    return [
        'title' => $meta_title,
        'description' => $meta_description,
        'keywords' => $meta_keywords,
        'og' => [
            'title' => $social_title,
            'description' => $social_description,
            'type' => $type,
            'image' => $social_image
        ]
    ];
}
