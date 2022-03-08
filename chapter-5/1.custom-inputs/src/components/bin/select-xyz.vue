<template>
  {{ label }}
  <select
    ref="root"
    v-on:change="update"
    v-bind:multiple="isMultiple"
  >
    <slot/>
  </select>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Define props.
const props = defineProps({
  modelValue: {
    default: ''
  },
  name: {
    type: String
  },
  label: {
    type: String,
    required: true
  }
})

// Define emit events.
const emit = defineEmits(['update:modelValue'])

// Check if modelValue is an array or not.
const isMultiple = computed(() => Array.isArray(props.modelValue))

// Emit the event.
function update (event) {
  const target = event.target
  if (props.modelValue instanceof Array) {
    const options = target.selectedOptions
    const values = Array.from(options).map(({ value }) => value)
    if (target.selectedIndex > 0) {
      emit('update:modelValue', values)
      return
    }
    emit('update:modelValue', props.modelValue)
  } else {
    emit('update:modelValue', target.value)
  }
}

// https://v3.vuejs.org/guide/composition-api-template-refs.html#template-refs
const root = ref(null)

onMounted(() => {
  // the DOM element will be assigned to the ref after initial render
  // console.log(root.value)

  // Array#from transforms an array-like object into an array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const options = Array.from(root.value.options)
  if (props.modelValue instanceof Array) {
    props.modelValue.forEach(value => {
      options.find(element => element.value == value).selected = true
    })
  } else {
    if (props.modelValue) {
      options.find(element => element.value == props.modelValue).selected = true
    }
  }
})
</script>

<script>
// https://vuejs.org/api/sfc-script-setup.html#usage-alongside-normal-script
export default {
  inheritAttrs: false
}
</script>

<!-- <script>
// using Options API:
export default {
  inheritAttrs: false,
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    name: {
      type: String
    },
    modelValue: {
      default: ''
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    isMultiple () {
      return Array.isArray(this.modelValue)
    }
  },
  methods: {
    update (event) {
      const target = event.target
      if (this.modelValue instanceof Array) {
        // https://stackoverflow.com/a/63378114/413225
        const options = target.selectedOptions
        const values = Array.from(options).map(({ value }) => value)
        if (target.selectedIndex > 0) {
          this.$emit('update:modelValue', values)
          return
        }
        this.$emit('update:modelValue', this.modelValue)
      } else {
        this.$emit('update:modelValue', target.selectedIndex > 0 ? target.value : this.modelValue)
      }
    }
  },

  mounted () {
    const root = this.$refs.root

    // https://stackoverflow.com/a/43255752/413225
    // Array#from transforms an array-like object into an array
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    const options = Array.from(root.options)
    // var options = Array.from(document.querySelectorAll('#xxxx option'))

    if (this.modelValue instanceof Array) {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
      this.modelValue.forEach(value => {
        options.find(element => element.value == value).selected = true
      })
    } else {
      if (this.modelValue) {
        options.find(element => element.value == this.modelValue).selected = true
      }
    }
  }
}
</script>
 -->
