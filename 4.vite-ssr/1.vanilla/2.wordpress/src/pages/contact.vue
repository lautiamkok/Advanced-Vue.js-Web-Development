<template>
  <h2>
    {{ title }}
  </h2>

  <div v-html="contents" />

  <p class="status" v-bind:class="{ 'error': response.status != 'ok' }">
  {{ response.message }}
  </p>

  <form
    v-on:submit.prevent="submitForm"
    novalidate="true"
  >
    <p v-bind:class="{ 'error': v$.name.$errors.length }">
      <label for="name"></label>
        {{ labels.name }}: 
      <input
        v-model.trim="name"
        v-on:blur="v$.name.$touch"
        type="text"
        name="name"
        v-bind:placeholder="labels.required"
      >
      <div v-for="error of v$.name.$errors" :key="error.$uid">
        <div>
          {{ error.$message }}
        </div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.email.$errors.length }">
      <label for="email">
        {{ labels.email }}: 
      </label>
      <input
        v-model.trim="email"
        v-on:blur="v$.email.$touch"
        type="email"
        name="email"
        v-bind:placeholder="labels.required"
      >
      <div v-for="error of v$.email.$errors" :key="error.$uid">
        <div>
          {{ error.$message }}
        </div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.telephone.$errors.length }">
      <label for="telephone">
        {{ labels.phone }}: 
      </label>
      <input
        v-model.number="telephone"
        v-on:blur="v$.telephone.$touch"
        type="text"
        name="telephone"
        v-bind:placeholder="labels.required"
      >
      <div v-for="error of v$.telephone.$errors" :key="error.$uid">
        <div>
          {{ error.$message }}
        </div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.message.$errors.length }">
      <label for="message">
        {{ labels.message }}: 
      </label>
      <textarea
        v-model.trim="message"
        v-on:blur="v$.message.$touch"
        v-bind:placeholder="labels.required"
        name="message"
      ></textarea>
      <div v-for="error of v$.message.$errors" :key="error.$uid">
        <div>
          {{ error.$message }}
        </div>
      </div>
    </p>

    <p>
      <input
        type="submit"
        value="Submit"
      >
    </p>
  </form>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  and,
  helpers,
  email as isEmail,
  numeric,
  minLength
} from '@vuelidate/validators'

const { raw } = useError()
const title = ref(null)
const contents = ref(null)

// Use ref objects and assign them to a reactive object.
const name = ref('')
const telephone = ref('')
const email = ref('')
const message = ref('')
const form = reactive({
  // When assigning a ref to a reactive property, it will be automatically
  // unwrapped.
  name,
  email,
  telephone,
  message
})
const response = reactive({
  status: '',
  message: ''
})

// Set input default labels.
const labels = reactive({
  name: 'Name',
  email: 'Email',
  phone: 'Telephone',
  message: 'Message',
  required: 'Required'
})

// Set input default statuses.
const statuses = reactive({
  nameInvalid: 'A value is needed',
  emailInvalid: 'A value is needed',
  phoneInvalid: 'A value is needed',
  messageInvalid: 'A value is needed'
})

let arrayLabels = []
let arrayStatuses = []

const { data } = await useF3tch(`/wp-json/api/v1/page/contact`)
if (!data) {
  createError({
    status: 500,
    message: 'No data!'
  })
}
if (data) {
  title.value = data.title
  contents.value = data.contents

  arrayLabels = data.form.labels
  arrayStatuses = data.form.statuses

  useHead({
    title: data.meta.title,
    meta: [
      {
        name: 'description',
        content: data.meta.description
      },
      {
        property: 'og:title',
        content: data.meta.og.title
      },
      {
        property: 'og:description',
        content: data.meta.og.description
      },
      {
        property: 'og:image',
        content: data.meta.og.image
      },
    ],
  })
}

// Set input custom labels from Carbon Fields custom fields.
if (arrayLabels.length > 0) {
  labels.name = getKeyValue(arrayLabels, 'input_name')
  labels.email = getKeyValue(arrayLabels, 'input_email')
  labels.phone = getKeyValue(arrayLabels, 'input_phone')
  labels.message = getKeyValue(arrayLabels, 'input_message')
  labels.required = getKeyValue(arrayLabels, 'placeholder_required')
}

// Set input custom statuses from Carbon Fields custom fields.
if (arrayStatuses.length > 0) {
  statuses.nameInvalid = getKeyValue(arrayStatuses, 'name_invalid'),
  statuses.emailInvalid = getKeyValue(arrayStatuses, 'email_invalid'),
  statuses.phoneInvalid = getKeyValue(arrayStatuses, 'phone_invalid')
  statuses.messageInvalid = getKeyValue(arrayStatuses, 'message_invalid')
}

// Dynamic validation schema.
// https://vuelidate-next.netlify.app/examples.html#dynamic-validation-schema
const rules = computed(() => {
  const localRules = {
    name: {
      // Add custom error message.
      // https://vuelidate-next.netlify.app/custom_validators.html#custom-error-messages
      required: helpers.withMessage(statuses.nameInvalid, required),
      minLength: minLength(6)
    }, // Matches form.name
    email: {
      required: helpers.withMessage(statuses.emailInvalid, required),
      isEmail
    }, // Matches form.email
    telephone: {
      required: helpers.withMessage(statuses.phoneInvalid, required),
      numeric
    }, // Matches form.telephone
    message: {
      required: helpers.withMessage(statuses.messageInvalid, required),
    } // Matches form.message
  }
  return localRules
})
const v$ = useVuelidate(rules, form)

async function submitForm () {
  // Validate form.
  const isValid = await v$.value.$validate()
  if (!isValid) {
    return
  }

  // Post the data.
  const { data } = await useF3tch(`/wp-json/api/v1/contact/message`, {
    method: 'POST',
    body: form
  })
  if (!data) {
    createError({
      status: 500,
      message: 'No data!'
    })
  }

  // Reset form.
  if (data && data.status === 'ok') {
    // Reset Vuelidate.
    v$.value.$reset()

    // Reset form properties.
    Object.entries(form).forEach(([key,value]) => {
      form[key] = ''
    })
    form.subscribe = 'no'
    form.agreement = []
  }

  if (data) {
    response.status = data.status
    response.message = data.message
  }
}

// Get the value from key-value metabox.
function getKeyValue (haystack, needle) {
  const index = haystack.findIndex(item => item.key === needle)
  return haystack[index].val
}
</script>

<style scoped>
.status {
  color:  green;
}

.error {
  color: red;
}

.error input,
.error select,
.error textarea {
  border: 1px solid red;
}
</style>
