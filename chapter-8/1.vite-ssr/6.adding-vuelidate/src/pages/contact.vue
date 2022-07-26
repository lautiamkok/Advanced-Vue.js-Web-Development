<template>
  <h1>{{ title }}</h1>

  <p class="status" v-bind:class="{ 'error': response.status != 'ok' }">
  {{ response.message }}
  </p>

  <form
    v-on:submit.prevent="submitForm"
    novalidate="true"
  >
    <p v-bind:class="{ 'error': v$.honorific.$errors.length }">
      <label for="honorific">Title: </label>
      <input
        v-model="honorific"
        type="radio"
        name="honorific"
        value="mr"
      /> Mr
      <input
        v-model="honorific"
        type="radio"
        name="honorific"
        value="ms"
      /> Ms
      <div v-for="error of v$.honorific.$errors" :key="error.$uid">
        <div>{{ error.$message }}</div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.name.$errors.length }">
      <label for="name">{{ labels.name }}: </label>
      <input
        v-model.trim="name"
        v-on:blur="v$.name.$touch"
        type="text"
        name="name"
        v-bind:placeholder="labels.required"
      >
      <div v-for="error of v$.name.$errors" :key="error.$uid">
        <div>{{ error.$message }}</div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.email.$errors.length }">
      <label for="email">{{ labels.email }}: </label>
      <input
        v-model.trim="email"
        v-on:blur="v$.email.$touch"
        type="email"
        name="email"
        v-bind:placeholder="labels.required"
      >
      <div v-for="error of v$.email.$errors" :key="error.$uid">
        <div>{{ error.$message }}</div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.telephone.$errors.length }">
      <label for="telephone">{{ labels.phone }}: </label>
      <input
        v-model.number="telephone"
        v-on:blur="v$.telephone.$touch"
        type="text"
        name="telephone"
        v-bind:placeholder="labels.required"
      >
      <div v-for="error of v$.telephone.$errors" :key="error.$uid">
        <div>{{ error.$message }}</div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.contactMethod.$errors.length }">
      <label for="contactMethod">How would you like to be contacted?: </label>
      <select
        v-model="contactMethod"
        v-on:blur="v$.contactMethod.$touch"
        name="Contact Method"
      >
        <option value="">Please select one</option>
        <option value="email">Email</option>
        <option value="telephone">Telephone</option>
      </select>
      <div v-for="error of v$.contactMethod.$errors" :key="error.$uid">
        <div>{{ error.$message }}</div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.message.$errors.length }">
      <label for="message">Message: </label>
      <textarea
        v-model.trim="message"
        v-on:blur="v$.message.$touch"
        v-bind:placeholder="labels.required"
        name="message"
      ></textarea>
      <div v-for="error of v$.message.$errors" :key="error.$uid">
        <div>{{ error.$message }}</div>
      </div>
    </p>

    <p>
      <label for="subscribe">Subscribe to the mailing list: </label>
      <input
        v-model="subscribe"
        type="checkbox"
        name="subscribe"
        true-value="yes"
        false-value="no"
      />
    </p>

    <p
      v-show="subscribe === 'yes'"
      v-bind:class="{ 'error': v$.agreement.$errors.length }"
    >
      <label for="agreement" >Agree to <a href="#">Privacy Policy</a>: </label>
      <input
        v-model="agreement"
        type="checkbox"
        value="privacy policy"
        agreement="agreement"
      /><br/>
      <label for="agreement">Agree to <a href="#">Terms and Conditions</a>: </label>
      <input
        v-model="agreement"
        type="checkbox"
        value="terms and conditions"
        name="agreement"
      />
      <div v-for="error of v$.agreement.$errors" :key="error.$uid">
        <div>{{ error.$message }}</div>
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
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const title = ref(null)
const contents = ref(null)

const { data } = await useFetch(`/wp-json/api/v1/page/contact`)
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

title.value = data.title
contents.value = data.contents

const arrayLabels = data.form.labels
const arrayStatuses = data.form.statuses

// Set input default labels.
const labels = reactive({
  name: 'name',
  email: 'email',
  phone: 'phone',
  required: 'required'
})

// Set input custom labels from Carbon Fields custom fields.
if (arrayLabels.length > 0) {
  labels.name = getKeyValue(arrayLabels, 'input_name')
  labels.email = getKeyValue(arrayLabels, 'input_email')
  labels.phone = getKeyValue(arrayLabels, 'input_phone')
  labels.required = getKeyValue(arrayLabels, 'placeholder_required')
}

// Set input default statuses.
const statuses = reactive({
  nameInvalid: 'A value is needed',
  emailInvalid: 'A value is needed',
  phoneInvalid: 'A value is needed'
})

// Set input custom statuses from Carbon Fields custom fields.
if (arrayStatuses.length > 0) {
  statuses.nameInvalid = getKeyValue(arrayStatuses, 'name_invalid'),
  statuses.emailInvalid = getKeyValue(arrayStatuses, 'email_invalid'),
  statuses.phoneInvalid = getKeyValue(arrayStatuses, 'phone_invalid')
}

// Use ref objects and assign them to a reactive object.
const honorific = ref('')
const name = ref('')
const telephone = ref('')
const email = ref('')
const message = ref('')
const contactMethod = ref('')
const subscribe = ref('no')
const agreement = ref([])
const form = reactive({
  // When assigning a ref to a reactive property, it will be automatically
  // unwrapped.
  honorific,
  name,
  email,
  telephone,
  message,
  contactMethod,
  subscribe,
  agreement
})
const response = reactive({
  status: '',
  message: ''
})

// Dynamic validation schema.
// https://vuelidate-next.netlify.app/examples.html#dynamic-validation-schema
const rules = computed(() => {
  const localRules = {
    honorific: {
      required
    }, // Matches form.honorific
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
      required
    }, // Matches form.message
    contactMethod: {
      required
    }, // Matches form.contactMethod
    agreement: {}
  }
  if (form.subscribe === 'yes') {
    localRules.agreement = {
      shouldBeChecked: helpers.withMessage('The Privacy Policy and Terms & Conditions must be checked.', and(
        () => form.agreement.includes('privacy policy'),
        () => form.agreement.includes('terms and conditions')
      ))
    }
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
  const { data } = await useFetch(`/wp-json/api/v1/message`, {
    method: 'POST',
    body: JSON.stringify({
      form
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  if (data === null) {
    throwError('Sorry, server error. Please try again.', 500)
  }

  // Reset form.
  if (data.status === 'ok') {
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
function getKeyValue(haystack, needle) {
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
