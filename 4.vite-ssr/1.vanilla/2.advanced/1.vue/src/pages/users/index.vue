<template>
  <div v-if="users">
    <h2>
      Users
    </h2>
    <ul>
      <li v-for="user in users" v-bind:key="user.id">
        <router-link :to="`/users/${user.id}`">
          {{ user.firstName }} {{ user.lastName }}
        </router-link>
        <router-link :to="`/users/update/${user.id}`">
          [Update]
        </router-link>
        <router-link :to="`/users/delete/${user.id}`">
          [Delete]
        </router-link>
      </li>
    </ul>
    <router-link to="/users/create">
      Add New
    </router-link>
  </div>
  
  <error-handler v-if="error" v-bind:error="error" />
</template>

<script setup>
const { data, error } = await useF3tch('/users?limit=5')

// If both have no data, then create the error manually.
if (!data.value && !error.value) {
  error.value = createError({
    statusCode: 500,
    message: 'No data!'
  })
}

// Users are store inside the `users` key.
const users = data.value ? data.value.users : null
</script>
