<?php
// Rules: Function names use underscores between words, while class names use
// both the camelCase and PascalCase rules.
// https://www.php.net/manual/en/userlandnaming.rules.php

// Create function to fetch site menu (flat).
function get_menu($menu_name = 'menu_main') {
    global $post;

    // Get the menu items by menu name.
    // https://developer.wordpress.org/reference/functions/wp_get_nav_menu_items/
    $menu_items = wp_get_nav_menu_items($menu_name);

    // Return [] if no post.
    if (empty($menu_items)) {
        return [];
    }

    // Loop each item and push other data.
    // https://developer.wordpress.org/reference/functions/url_to_postid/
    // https://developer.wordpress.org/reference/functions/get_post/
    foreach ($menu_items as $key => &$menu_item) {
        // Get slug from URL.
        $menu_item->slug = sanitize_title(basename($menu_item->url));

        // If the current post ID is the same as the menu object ID, then it is
        // the current page.
        $current = false;
        if ($post && ((int)$menu_item->object_id === (int)$post->ID)) {
            $current = true;
        }
        $menu_item->current = $current;
    }
    return to_array($menu_items);
}

// Create function to fetch site menu (tree).
function get_menu_deep($menu_name = 'menu_main', $createTree = true) {
    global $post;
    global $wp_query;

    // Get all ids of the parent posts that attached to this page.
    $parents = carbon_get_the_post_meta('parents');

    // If the current request is a category page.
    // https://developer.wordpress.org/reference/functions/is_tax/
    if (is_tax()) {
        $tax = $wp_query->get_queried_object();
        $parents = carbon_get_term_meta($tax->term_id, 'parents');
    }
    $parents_ids = array_column($parents, 'id');

    // Get the menu items by menu name.
    // https://developer.wordpress.org/reference/functions/wp_get_nav_menu_items/
    $menu_items = wp_get_nav_menu_items($menu_name);

    // Return [] if no post.
    if (empty($menu_items)) {
        return [];
    }

    foreach ($menu_items as $key => &$menu_item) {
        // Get slug from URL.
        $menu_item->slug = sanitize_title(basename($menu_item->url));

        // If the current post ID is the same as the menu object ID, then it is
        // the current page.
        $current = false;
        if ($post && ((int)$menu_item->object_id === (int)$post->ID)) {
            $current = true;
        }

        // If the current post parent ID is the same as the menu object ID, then
        // it is the current page.
        if ($post && ((int)$menu_item->object_id === (int)$post->post_parent)) {
            $current = true;
        }

        // If any current post parent ID is the same as the menu object ID, then
        // set its parent to current.
        if (in_array($menu_item->object_id, $parents_ids)) {
            $current = true;
        }
        $menu_item->current = $current;
    }
    $menu_items = to_array($menu_items);

    if ($createTree === false) {
        return $menu_items;
    }

    $groups_by_parent = [];
    foreach ($menu_items as $item){
        $groups_by_parent[$item['menu_item_parent']][] = $item;
    }
    $parents = $groups_by_parent[0];
    $tree_items = create_tree($groups_by_parent, $parents, 'ID');

    return $tree_items;
}
