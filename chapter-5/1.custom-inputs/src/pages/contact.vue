<template>
  <h1>{{ title }}</h1>
  <input-xyz
    type="text"
    name="username"
    v-bind:modelValue="username"
    v-on:update:modelValue="username = $event"
  />
  <p>username: {{ username }}</p>

  <input-xyz type="text" name="name" v-model="name" />
  <p>name: {{ name }}</p>

  <textarea-xyz name="message" rows="8" v-model="message" />
  <p>message: {{ message }}</p>

  <checkbox-xyz label="Subscribe" v-model="subscribe" true-value="yes" />
  <p>subscribe (true or false): {{ subscribe }}</p>

  <radio-xyz name="group-xyx" label="One" value="one" v-model="selected" />
  <radio-xyz name="group-xyx" label="Two" value="two" v-model="selected" />
  <radio-xyz name="group-xyx" label="Three" value="three" v-model="selected" />
  <p>selected (selected radio): {{ selected }}</p>

  <checkboxgroup-xyz name="group-abc" label="Foo" value="foo" v-model="picked" />
  <checkboxgroup-xyz name="group-abc" label="Bar" value="bar" v-model="picked" />
  <checkboxgroup-xyz name="group-abc" label="Baz" value="baz" v-model="picked" />
  <p>picked (selected checkboxes): {{ picked }}</p>

  <select-xyz name="select-abc" label="Select One" v-model="selectedOption">
    <option value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select-xyz>
  <p>selectedOption (single selected option): {{ selectedOption }}</p>

  <multiselect-xyz name="select-xyz" label="Multi Select" v-model="selectedOptions">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </multiselect-xyz>
  <p>selectedOptions (multiple selected options): {{ selectedOptions }}</p>
</template>

<script setup>
import { ref } from 'vue'
import inputXyz from '@/components/input-xyz.vue'
import textareaXyz from '@/components/textarea-xyz.vue'
import radioXyz from '@/components/radio-xyz.vue'
import checkboxXyz from '@/components/checkbox-xyz.vue'
import checkboxgroupXyz from '@/components/checkboxgroup-xyz.vue'
import selectXyz from '@/components/select-xyz.vue'
import multiselectXyz from '@/components/multiselect-xyz.vue'

const title = 'Contact'
const username = ref(null)
const name = ref(null)
const message = ref(null)
const subscribe = ref(false)
const selected = ref('two')
const picked = ref(['foo', 'bar'])
const selectedOption = ref('C')
const selectedOptions = ref(['B', 'C'])
</script>
