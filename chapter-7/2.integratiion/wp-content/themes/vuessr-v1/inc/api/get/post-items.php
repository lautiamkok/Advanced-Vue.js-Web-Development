<?php
/**
 * Custom JSON API endpoint.
 * https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/
 */

// Fetch posts by post_type.
function create_post_items($data) {
    $items = [];

    // Get the params.
    $limit = $data->get_param('limit') ? $data->get_param('limit') : -1;
    $page = $data->get_param('page') ? $data->get_param('page') : 1;
    $year = $data->get_param('year');
    $category = $data->get_param('category');
    $total_only = $data->get_param('total_only');
    $args = [
        'post_type' => 'post',
        'post_status' => ['publish'],
        'posts_per_page' => $limit, // limit posts.
        'paged' => $page,
        'orderby' => 'date',

        // Exclude specific posts.
        // 'post__not_in' => array(
        //     $featured_post->ID
        // ),

        // Exclude meta specific key.
        // https://core.trac.wordpress.org/ticket/18158
        // 'meta_query' => array(
        //     array(
        //         'key' => 'java_meta_feature',
        //         'compare' => 'NOT EXISTS'
        //     ),
        // )
    ];

    // Specific year.
    if ($year) {
        $args = array_merge($args, [
            'year' => $year,
        ]);
    }

    // Specific category (global category).
    // if ($category) {
    //     $args = array_merge($args, [
    //         'category_name' => $category,
    //     ]);
    // }

    // Specific category (local category).
    if ($category) {
        $category_args = [
            'tax_query' => [
                [
                    'taxonomy' => 'post-category', // e.g. 'course-category'
                    'field' => 'slug', //this is by slug
                    'terms' => $category, // slug name
                ]
            ]
        ];
        $args = array_merge($args, $category_args);
    }
    $post_query = new WP_Query($args);

    // Count all posts.
    $total_posts = $post_query->found_posts;
    if ($total_only) {
        return [
            'total' => $total_posts
        ];
    }

    // Get and loop the queried posts.
    $posts = $post_query->get_posts();
    foreach($posts as $index => $post) {
        // Replace the space with a T to conform to a simplified version of ISO-8601.
        $datetime = new DateTime($post->post_date);
        $post_date = $datetime->format(DateTime::ATOM);

        $post_excerpt = $post->post_excerpt;
        $post_url = get_permalink($post->ID);

        // Get thumbnail.
        $post_image = [];
        $thumbnail_id = get_post_thumbnail_id($post->ID);
        if ($thumbnail_id) {
            $image_data = get_image_data($thumbnail_id);
            $post_image = [
                'id' => $thumbnail_id,
                'url'  => $image_data['url'],
                'sizes'  => $image_data['sizes'],
                'caption' => '',
                'alt' => '',
                'description' => '',
            ];
        }

        // Push the post data into the array.
        $items[] = [
            'id' => $post->ID,
            'slug' => $post->post_name,
            'title' => $post->post_title,
            'url' => $post_url,
            'date' => $post_date,
            'excerpt' => $post_excerpt,
            'image' => $post_image
        ];
    }

    // Reset the post to the original after loop. otherwise the current page
    // becomes the last item from the while loop.
    wp_reset_query();

    return $items;
}

// Create the endpoint for the main navigation.
// Usage (POST):
// http://localhost:4000/wp-json/api/v1/posts
add_action('rest_api_init', function () use ($namespace) {
    $route = 'posts';
    $args = [
        'methods' => 'GET',
        'callback' => 'create_post_items',
    ];
    register_rest_route($namespace, $route, $args);
});
