<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Set all available post types.
function add_all_post_types() {
    return array(
        array(
            'type' => 'post',
            'post_type' => 'post',
        ),
        array(
            'type' => 'post',
            'post_type' => 'page',
        ),
    );
}

// Abstract fields (for image) to be reuse.
function add_crb_image_group() {
    return array(
        Field::make( 'image', 'id', 'Image' )
            // ->set_value_type( 'url' )
            ->set_help_text( 'Upload an image file.' ),

        Field::make( 'text', 'title', __( 'Title' ) )
            ->set_help_text( 'Set a plain-text title to this image.' )
            ->set_width( 100 ),

        Field::make( 'rich_text', 'description', __( 'Description' ) )
            ->set_help_text( 'Set a rich-text description to this image.' )
            ->set_rows( 8 )
            ->set_settings(array(
                'media_buttons' => false
            ) ),

        Field::make( 'rich_text', 'credit', __( 'Credit' ) )
            ->set_help_text( 'Set a rich-text credit to this image.' )
            ->set_rows( 8 )
            ->set_settings(array(
                'media_buttons' => false
            ) ),

        Field::make( 'select', 'top', __( 'Top Position' ) )
            ->set_help_text( 'Set a top position to this image in percentage.' )
            ->set_options( array(
                '' => 'Select One',
                '0' => 0,
                '10' => 10,
                '20' => 20,
                '30' => 30,
                '40' => 40,
                '50' => 50,
                '60' => 60,
                '70' => 70,
                '80' => 80,
                '90' => 90,
                '100' => 100,
            ) ),

        Field::make( 'select', 'size', __( 'Size' ) )
            ->set_help_text( 'Set a grid size to this image for large screens.' )
            ->set_options( array(
                '' => 'Select One',
                '3' => 3,
                '4' => 4,
                '5' => 5,
                '6' => 6,
                '7' => 7,
                '8' => 8,
                '9' => 9,
                '10' => 10,
                '11' => 11,
                '12' => 12,
            ) ),

        // https://docs.carbonfields.net/learn/fields/color.html#config-methods
        Field::make( 'color', 'filter', 'Filter' )
            ->set_help_text( 'Set a transparent colour layer over this image.' )
            ->set_alpha_enabled( true ),

        Field::make( 'association', 'associate', __( 'Associate' ) )
            ->set_help_text( 'Set a link to this image to a local page.' )
            ->set_max( 1 )
            ->set_types( add_all_post_types() )
    );
}
