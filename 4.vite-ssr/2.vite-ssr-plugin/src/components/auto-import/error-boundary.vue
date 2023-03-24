<template>
  <!-- 
    Wrap up this component to avoid:
    "Extraneous non-props attributes (id) were passed to component but could not
     be automatically inherited because component renders fragment or text root
     nodes."
    
    Or, use `inheritAttrs: false`:
    https://vuejs.org/guide/components/attrs.html#attribute-inheritance
  -->
  <div>
    <div v-if="error">
      <h2>
        {{ error.status }} Error
      </h2>
      <p>
       {{ error.name }} - {{ error.message }}
      </p>
      <pre>
        {{ error.stack }}
      </pre>
      <p>
        Please navigate to other routes to clear the error.
      </p>
      <router-link to="/" class="button">
        Navigate home
      </router-link>
    </div>
    <slot v-else />
  </div>
</template>

<!-- <script>
export default defineComponent({
  inheritAttrs: false
})
</script> -->

<script setup>
import { useContext } from 'vite-ssr'

const { error } = useError()
const { initialState, writeResponse } = useContext()

if (import.meta.env.SSR) {
  initialState.error = error.value
  writeResponse({
    status: error.value.status,
    headers: {}
  })
}
</script>
