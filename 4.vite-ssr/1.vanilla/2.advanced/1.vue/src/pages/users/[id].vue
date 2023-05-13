<template>
  <div>
    <div v-if="user">
      <h2>
        {{ user.firstName }} {{ user.lastName }}
      </h2>
      <p>Email:
        {{ user.email }}
      </p>
      <p>Age:
        {{ user.age }}
      </p>
      <ul>
        <li>
          <router-link :to="`/users/update/${user.id}`">
            Update
          </router-link>
        </li>
        <li>
          <router-link :to="`/users/delete/${user.id}`">
            Delete
          </router-link>
        </li>
      </ul>
    </div>
    
    <error-handler v-if="error" v-bind:error="error" />
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id
const { data: user, error } = await useF3tch(`/users/${id}`)

// If both has no data, then create the error manually.
if (!user.value && !error.value) {
  error.value = createError({
    statusCode: 500,
    message: 'No data!'
  })
}
</script>
