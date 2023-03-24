<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

// SEO metabox.
add_action('carbon_fields_register_fields', 'crb_attach_post_meta_seo_contents');
function crb_attach_post_meta_seo_contents() {
    Container::make('post_meta', __('Meta Contents'))
        // ->where('post_type', '=', 'page')
        // ->or_where(function($condition) {
        //     $condition->where('post_type', '=', 'post');
        // })
        // ->where('post_template', '=', 'template-section-based.php')

        ->add_tab(__('SEO Meta'), [
            Field::make('textarea', 'seo_meta_title', __('Title'))
                ->set_help_text('If this field is empty, the data from "Basic Options" will be used.')
                ->set_width(33.3)
                ->set_rows(8),

            Field::make('textarea', 'seo_meta_description', __('Description'))
                ->set_help_text('If this field is empty, the data from "Basic Options" will be used.')
                ->set_width(33.3)
                ->set_rows(8),

            Field::make('textarea', 'seo_meta_keywords', __('Keywords'))
                ->set_help_text('If this field is empty, the data from "Basic Options" will be used.')
                ->set_width(33.3)
                ->set_rows(8),
        ])

        ->add_tab(__('Social Meta'), [
            Field::make('textarea', 'social_meta_title', __('Title'))
                ->set_help_text('If this field is empty, the data from the "SEO" fields will be used, otherwise the data from "Basic Options" will be used.')
                ->set_width(33.3)
                ->set_rows(8),

            Field::make('textarea', 'social_meta_description', __('Description'))
                ->set_help_text('If this field is empty, the data from the "SEO" fields will be used, otherwise the data from "Basic Options" will be used.')
                ->set_width(33.3)
                ->set_rows(8),

            Field::make('image', 'social_meta_image', __('Image'))
                ->set_help_text('If this field is empty, the data from "Basic Options" will be used.')
                ->set_width(33.3)
                ->set_value_type('url'),
        ])

        ;
}

