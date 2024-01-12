<template>
  <h1>{{ title }}</h1>

  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

  <p v-bind:class="{ 'error': response.status != 'ok' }">
  {{ response.message }}
  </p>

  <form
    v-on:submit.prevent="checkForm"
    novalidate="true"
  >
    <p>
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
    </p>

    <p>
      <label for="name">Name: </label>
      <input
        v-model.trim="name"
        type="text"
        name="name"
      >
      <!-- or, using the form object: -->
      <!-- <input
        v-model.trim="form.name"
        type="text"
        name="name"
      > -->
    </p>

    <p>
      <label for="email">Email: </label>
      <input
        v-model.trim="email"
        type="email"
        name="email"
      >
    </p>

    <p>
      <label for="telephone">Telephone: </label>
      <input
        v-model.number="telephone"
        type="text"
        name="telephone"
      >
    </p>

    <p>
      <label for="contactMethod">How would you like to be contacted?: </label>
      <select v-model="contactMethod">
        <option value="">Please select one</option>
        <option value="email">Email</option>
        <option value="telephone">Telephone</option>
      </select>
    </p>

    <!-- <p>
      <label for="telephone">How would you like to be contacted?: </label>
      <select v-model="selected" multiple>
        <option>Print</option>
        <option>Web</option>
      </select>
    </p> -->

    <p>
      <label for="message">Message: </label>
      <textarea
        v-model.trim="message"
        placeholder="Write something"
        name="message"
      ></textarea>
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

    <p v-show="subscribe === 'yes'">
      <label for="agreement">Agree to <a href="#">Privacy Policy</a>: </label>
      <input
        v-model="agreement"
        type="checkbox"
        value="privacy policy"
        name="agreement"
      /><br/>
      <label for="agreement">Agree to <a href="#">Terms and Conditions</a>: </label>
      <input
        v-model="agreement"
        type="checkbox"
        value="terms and conditions"
        name="agreement"
      />
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
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const title = 'Contact'
const errors = ref([])
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

async function checkForm () {
  // Reset errors.
  errors.value = []

  if (!form.honorific) {
    errors.value.push('Title is required.')
  }

  if (!form.name) {
    errors.value.push('Name is required.')
  }

  if (!form.email) {
    errors.value.push('Email is required.')
  } else if (!validEmail(form.email)) {
    errors.value.push('Valid email is required.')
  }

  if (!form.telephone) {
    errors.value.push('Telephone is required.')
  }

  if (!form.message) {
    errors.value.push('Message is required.')
  }

  if (!form.contactMethod) {
    errors.value.push('Contact method is required.')
  }

  if (form.subscribe === 'yes') {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    if (!form.agreement.includes('privacy policy')) {
      errors.value.push('Agreement to the Privacy Policy is required.')
    }
    if (!form.agreement.includes('terms and conditions')) {
      errors.value.push('Agreement to the Terms and Conditions is required.')
    }
  }

  if (!errors.value.length) {
    // Post the data.
    const { data } = await useFetch('/message', {
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
}

function validEmail (email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
