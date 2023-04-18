<template>
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
</template>

<script setup>
const route = useRoute()
const id = route.params.id
const { data: user, error } = await useF3tch(`/users/${id}`)
if (error) {
  createError({
    statusCode: error.statusCode,
    name: error.name,
    message: error.message
  })
}
if (!user) {
  createError({
    statusCode: 500,
    message: 'No data!'
  })
}
</script>
