<?php
/**
 * Custom JSON API endpoint.
 * https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/
 */

// Fetch posts by post_type.
function create_page_item($data) {
    // Get the single post by slug/ path.
    // https://developer.wordpress.org/reference/functions/get_page_by_path/
    $post = get_page_by_path($data->get_param('slug'), OBJECT, 'page');

    // Return empty array if no data.
    if (empty($post)) {
        return new WP_Error('no_post', __('No post found'), ['status' => 404]);
    }

    // Replace the space with a T to conform to a simplified version of ISO-8601.
    $datetime = new DateTime($post->post_date);
    $post_date = $datetime->format(DateTime::ATOM);

    $post_excerpt = get_the_excerpt($post->ID);
    $post_url = get_permalink($post->ID);

    // Get thumbnail.
    $post_image = [];
    $thumbnail_id = get_post_thumbnail_id($post->ID);
    if ($thumbnail_id) {
        $image_data = get_asset_data($thumbnail_id);
        $post_image = [
            'id' => $thumbnail_id,
            'url'  => $image_data['url'],
            'sizes'  => $image_data['sizes'],
            'caption' => '',
            'alt' => '',
            'description' => '',
        ];
    }

    // Add SEO and social meta from carbon fields.
    $post_meta = create_post_meta($post->ID);

    $item = [
        'id' => $post->ID,
        'slug' => $post->post_name,
        'title' => $post->post_title,
        'contents' => $post->post_content,
        'url' => $post_url,
        'date' => $post_date,
        'excerpt' => $post_excerpt,
        'image' => $post_image,
        'meta' => $post_meta
    ];

    return $item;
}

// Create the endpoint for the main navigation.
// Usage (POST):
// http://localhost:4000/wp-json/api/v1/page/about
add_action('rest_api_init', function () use ($namespace) {
    $route = 'page/(?P<slug>[a-zA-Z0-9-]+)';
    $args = [
        'methods' => 'GET',
        'callback' => 'create_page_item',
    ];
    register_rest_route($namespace, $route, $args);
});
