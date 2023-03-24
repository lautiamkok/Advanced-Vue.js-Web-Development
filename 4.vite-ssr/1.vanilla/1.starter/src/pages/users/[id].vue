<template>
  <div v-if="user">
    <h3>
      {{ user.firstName }} {{ user.lastName }}
    </h3>
    <p>Email:
      {{ user.email }}
    </p>
    <p>Age:
      {{ user.age }}
    </p>
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id

// Handle errors in the page level -- this component.
const { raw } = useError()
const user = ref()

try {
  // https://dummyjson.com/docs/users
  const { data, error } = await useF3tch(`/users/${id}`)
  user.value = data
  raw.value = error
} catch (error) {
  raw.value = error
}
</script>
