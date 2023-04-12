<template>
  <div v-if="user">
    <h2>
      Update {{ user.firstName }} {{ user.lastName }}
    </h2>

    <form>
      <p>First Name:
        <input v-model="user.firstName" type="text" name="firstName">
      </p>
      <p>Last Name: 
        <input v-model="user.lastName" type="text" name="lastName">
      </p>
      <p>Email: 
        <input v-model="user.email" type="text" name="email">
      </p>
    </form>
    
    <ul>
      <li v-if="response.status">
        <button v-on:click="cancel">
          Back
        </button>
      </li>
      <li>
        <button v-on:click="cancel">
          Cancel
        </button>
      </li>
      <li>
        <button v-on:click="update">
          Update
        </button>
      </li>
    </ul>

    <p style="color: red;" v-if="response.status && response.status != 200">
      {{ response.message }}
    </p>
    <p style="color: blue;" v-if="response.status && response.status === 200">
      {{ response.message }}
    </p>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const id = route.params.id
const response = reactive({})

const { data: user } = await useF3tch(`/users/${id}`)
if (!user) {
  createError({
    status: 500,
    message: 'No data!'
  })
}
async function update () {
   // Updating a user will not update it into the server. It will simulate a
   // PUT/PATCH request and will return the user with modified data.
   // https://dummyjson.com/docs/users
  const { data } = await useF3tch(`/users/${id}`, {
    method: 'PUT',
    body: unref(user)
  })

  if (!data) {
    response.status = error.status
    response.message = error.data ? error.data.message : error.message
    return
  }

  response.status = 200
  response.message = 'Updated ok'
}
 
function cancel () {
  router.push(`/users/${id}`)
}
</script>
