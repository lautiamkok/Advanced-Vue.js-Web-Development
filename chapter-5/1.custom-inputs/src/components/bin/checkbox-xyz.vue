<template>
  {{ label }}
  <input
    type="checkbox"
    v-bind:name="name"
    v-bind:checked="isChecked"
    v-bind:value="value"
    v-on:change="update"
  />
</template>

<script setup>
import { ref, computed } from 'vue'

// Define props.
const props = defineProps({
  modelValue: {
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  value: {
    type: String
  },
  label: {
    type: String,
    required: true
  },
  trueValue: {
    default: true
  },
  falseValue: {
    default: false
  }
})

// Define emit events.
const emit = defineEmits(['update:modelValue'])

// Check if the chheckbox is checked or not.
const isChecked = computed(() => {
  if (props.modelValue instanceof Array) {
    return props.modelValue.includes(props.value)
  }
  // Note that `true-value` and `false-value` are camelCase in the JS
  return props.modelValue === props.trueValue
})

// Emit the event.
function update (event) {
  const isChecked = event.target.checked
  if (props.modelValue instanceof Array) {
    const values = [...props.modelValue]
    if (isChecked) {
      values.push(props.value)
    } else {
      values.splice(values.indexOf(props.value), 1)
    }
    emit('update:modelValue', values)
    return
  }
  emit('update:modelValue', isChecked ? props.trueValue : props.falseValue)
}
</script>

<script>
// https://vuejs.org/api/sfc-script-setup.html#usage-alongside-normal-script
export default {
  inheritAttrs: false
}
</script>

<!-- <script>
// https://gist.github.com/Jonarod/7ff2fe4f81aae39e431aa7a08ce815bc
export default {
  inheritAttrs: false,
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    name: { type: String },
    value: { type: String },
    modelValue: { default: '' },
    label: { type: String, required: true},
    trueValue: { default: true },
    falseValue: { default: false }
  },
  computed: {
    isChecked () {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue
    }
  },
  methods: {
    update (event) {
      let isChecked = event.target.checked
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('update:modelValue', newValue)
      } else {
        this.$emit('update:modelValue', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }
}
</script> -->
