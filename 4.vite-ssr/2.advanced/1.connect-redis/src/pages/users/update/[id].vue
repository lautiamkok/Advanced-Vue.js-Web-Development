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

    <p style="color: red;" v-if="response.statusCode && response.statusCode != 200">
      {{ response.message }}
    </p>
    <p style="color: blue;" v-if="response.statusCode && response.statusCode === 200">
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
if (!user.value) {
  throwError({
    statusCode: 500,
    message: 'No data!'
  })
}
async function update () {
   // Updating a user will not update it into the server. It will simulate a
   // PUT/PATCH request and will return the user with modified data.
   // https://dummyjson.com/docs/users
  const { data, error } = await useF3tch(`/users/${id}`, {
    method: 'PUT',
    body: unref(user)
  })

  const failure = unref(error)
  if (failure) {
    response.statusCode = failure.statusCode
    response.message = failure.message
    return
  }

  response.statusCode = 200
  response.message = 'Updated ok'
}
 
function cancel () {
  router.push(`/users/${id}`)
}
</script>
