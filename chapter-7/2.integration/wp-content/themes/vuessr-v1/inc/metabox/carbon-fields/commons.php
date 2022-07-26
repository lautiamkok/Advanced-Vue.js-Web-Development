<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Abstract fields (for image) to be reuse.
function add_crb_image_group() {
    return [
        Field::make( 'image', 'id', 'Image' )
            ->set_help_text( 'Upload an image file.' ),

        Field::make( 'text', 'title', __( 'Title' ) )
            ->set_help_text( 'Set a plain-text title to this image.' )
            ->set_width( 100 ),

        Field::make( 'rich_text', 'description', __( 'Description' ) )
            ->set_help_text( 'Set a rich-text description to this image.' )
            ->set_rows( 8 )
            ->set_settings( [
                'media_buttons' => false
            ] ),

        Field::make( 'rich_text', 'credit', __( 'Credit' ) )
            ->set_help_text( 'Set a rich-text credit to this image.' )
            ->set_rows( 8 )
            ->set_settings( [
                'media_buttons' => false
            ] ),

        Field::make( 'select', 'top', __( 'Top Position' ) )
            ->set_help_text( 'Set a top position to this image in percentage.' )
            ->set_options( set_percentage_options() ),

        Field::make( 'select', 'size', __( 'Size' ) )
            ->set_help_text( 'Set a grid size to this image for large screens.' )
            ->set_options( set_image_size_options() ),

        // https://docs.carbonfields.net/learn/fields/color.html#config-methods
        Field::make( 'color', 'filter', 'Filter' )
            ->set_help_text( 'Set a transparent colour layer over this image.' )
            ->set_alpha_enabled( true ),

        Field::make( 'association', 'associate', __( 'Associate' ) )
            ->set_help_text( 'Set a link to this image to a local page.' )
            ->set_max( 1 )
            ->set_types( set_all_available_post_types() )
    ];
}

// Abstract fields (for key & value) to be reuse.
function add_crb_key_value_group($type = '') {
    $array =  [
        Field::make( 'text', 'key', 'Key' )
            ->set_help_text( 'A key that is only used by the program. Do NOT Modify. Meta ID: key.' )
            // ->set_required( true )
            ->set_width( 20 ),

        Field::make( 'text', 'val', 'Value' )
            ->set_help_text( 'Set the label value. Meta ID: val.' )
            ->set_width( 40 ),

        Field::make( 'textarea', 'note', 'Note' )
            ->set_help_text( 'Set a help note for yourself that is not published. Meta ID: note.' )
            ->set_width( 40 )
            ->set_rows( 4 ),
    ];

    // Set if-condition inside the array.
    // https://stackoverflow.com/a/5693762/413225
    if ($type === 'textarea') {
        $array[1] = Field::make( 'textarea', 'val', 'Value' )
            ->set_width( 40 )
            ->set_rows( 4 );
    }

    if ($type === 'rich_text') {
        $array[1] = Field::make( 'rich_text', 'val', 'Value' )
            ->set_width( 40 )
            ->set_rows( 8 )
            ->set_settings( [
                'media_buttons' => false
            ] );
    }

    return $array;
}
