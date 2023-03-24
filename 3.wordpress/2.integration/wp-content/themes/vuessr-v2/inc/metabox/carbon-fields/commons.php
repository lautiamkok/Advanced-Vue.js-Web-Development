<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Abstract fields to be reuse.
function add_crb_asset_fields($options = []) {
    $fields = [];
    $defaults = ['file'];

    // Remove `file` if `image` (or any others below) is set.
    if (in_array('image', $options) || 
        in_array('video', $options) || 
        in_array('script', $options) || 
        in_array('options', $options)
    ) {
        $defaults = [];
    }
    $picks = array_merge($defaults, $options);

    $store = [
        // https://docs.carbonfields.net/learn/fields/file.html#config-methods
        'file' => Field::make('file', 'id', __(''))
            ->set_help_text('Set an asset from the local Media Library. Meta ID: id.'),

        'image' => Field::make('file', 'id', __(''))
            ->set_help_text('Set an asset (image only) from the local Media Library. Meta ID: id.')
            ->set_type(['image']),

        'video' => Field::make('file', 'id', __(''))
            ->set_help_text('Set an asset (video only) from the local Media Library. Meta ID: id.')
            ->set_type(['video']),

        'script' => Field::make('textarea', 'script', __('Script'))
            ->set_help_text('Set an asset by script. Meta ID: script.')
            ->set_rows(4)
            ->set_width(100),

        'options' => Field::make('complex', 'options', __(''))
            ->set_help_text('Set the source option of this asset. Meta ID: options.')
            ->set_max(1)
            ->add_fields('file',  [
                Field::make('file', 'id', __(''))
                    ->set_help_text('Set an asset from the local Media Library. Meta ID: id.')
            ])
            ->add_fields('script',  [
                Field::make('textarea', 'script', __(''))
                    ->set_help_text('Set an asset by script. Meta ID: script.')
                    ->set_rows(4)
                    ->set_width(100)
            ]),

       'title' => Field::make('text', 'title', __('Title'))
            ->set_help_text('Set a plain-text title to this asset. Meta ID: title.')
            ->set_width(100),

       'description' => Field::make('rich_text', 'description', __('Description'))
            ->set_help_text('Set a rich-text description to this asset. Meta ID: description.')
            ->set_rows(8)
            ->set_settings([
                'media_buttons' => false
            ]),

       'caption' => Field::make('rich_text', 'caption', __('Caption'))
            ->set_help_text('Set a rich-text caption to this asset. Meta ID: caption.')
            ->set_rows(8)
            ->set_settings([
                'media_buttons' => false
            ]),

        'credit' => Field::make('rich_text', 'credit', __('Credit'))
            ->set_help_text('Set a rich-text credit to this asset.')
            ->set_rows(8)
            ->set_settings([
                'media_buttons' => false
            ]),

       'size' => Field::make('select', 'size', __('Size'))
            ->set_help_text('Set a grid size to this asset for large screens. Meta ID: size.')
            ->set_options(set_grid_size_options()),

        'position' => Field::make('select', 'top', __('Top Position'))
            ->set_help_text('Set a top position to this asset in percentage.')
            ->set_options(set_percentage_options()),

        // https://docs.carbonfields.net/learn/fields/color.html#config-methods
        'filter' => Field::make('color', 'filter', 'Filter')
            ->set_help_text('Set a transparent colour layer over this asset. Meta ID: filter.')
            ->set_alpha_enabled(true),

        'associate' => Field::make('association', 'associate', __('Associate'))
            ->set_help_text('Set a link to this asset to a local page.')
            ->set_max(1)
            ->set_types(set_all_available_post_types()),
        
        'associate_remote' => Field::make('text', 'remote_url', __('Remote Associate URL'))
            ->set_help_text('Set a remote associate URL to this asset. Meta ID: associate_remote.')
            ->set_width(100)
    ];

    foreach ($picks as $key => $value) {
        // Check if the value matches the array key.
        if (array_key_exists($value, $store)) {
            $fields[] = $store[$value];
        }
    }
    return $fields;
}

// Abstract fields (for key & value) to be reuse.
function add_crb_key_value_group($type = '') {
    $array =  [
        Field::make('text', 'key', 'Key')
            ->set_help_text('A key that is only used by the program. Do NOT Modify. Meta ID: key.')
            // ->set_required(true)
            ->set_width(20),

        Field::make('text', 'val', 'Value')
            ->set_help_text('Set the label value. Meta ID: val.')
            ->set_width(40),

        Field::make('textarea', 'note', 'Note')
            ->set_help_text('Set a help note for yourself that is not published. Meta ID: note.')
            ->set_width(40)
            ->set_rows(4),
    ];

    // Set if-condition inside the array.
    // https://stackoverflow.com/a/5693762/413225
    if ($type === 'textarea') {
        $array[1] = Field::make('textarea', 'val', 'Value')
            ->set_width(40)
            ->set_rows(4);
    }

    if ($type === 'rich_text') {
        $array[1] = Field::make('rich_text', 'val', 'Value')
            ->set_width(40)
            ->set_rows(8)
            ->set_settings([
                'media_buttons' => false
            ]);
    }

    return $array;
}
