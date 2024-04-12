<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import { useProfileStore } from '../stores/Profile'
import Toast from 'primevue/toast';

export default defineComponent({
  components: {
    FloatLabel,
    InputText,
    Toast,
  },
  setup() {

    const profileStore = useProfileStore()

    const userFirstName = ref(profileStore.profile.firstName);
    const userLastName = ref(profileStore.profile.lastName);
    const userUsername = ref(profileStore.profile.username);
    const userEmail = ref(profileStore.profile.email);
    const originalUserFirstName = ref(userFirstName.value);
    const originalUserLastName = ref(userLastName.value);
    const originalUserUsername = ref(userUsername.value);
    const changedProfile = ref(false);
    const password = ref('')
    const newPassword = ref('')
    const confirmPassword = ref('')
    const enableNewPasswordInputs = ref(false)
    const enableChangePasswordButton = ref(false)

    const saveChanges = () => {
      
    };

    const changePassword = () => {
      console.log('Password Changed !');
    }

    const checkChanges = () => {
      changedProfile.value =
        originalUserFirstName.value !== userFirstName.value ||
        originalUserLastName.value !== userLastName.value ||
        originalUserUsername.value !== userUsername.value;
    };

    const checkAllowToNewPassword = () => {
      enableNewPasswordInputs.value = Boolean(password.value.length)
    }

    const checkAllowToResetPassword = () => {
      enableChangePasswordButton.value = Boolean(enableNewPasswordInputs.value && (newPassword.value === confirmPassword.value))
    }

    // Watch Profile
    watch(userFirstName, checkChanges)
    watch(userLastName, checkChanges)
    watch(userUsername, checkChanges)

    // Watch Passwords
    watch(password, checkAllowToNewPassword)
    watch(newPassword, checkAllowToResetPassword)
    watch(confirmPassword, checkAllowToResetPassword)

    return {
      userFirstName,
      userLastName,
      userUsername,
      userEmail,
      changedProfile,
      password,
      newPassword,
      confirmPassword,
      saveChanges,
      enableNewPasswordInputs,
      enableChangePasswordButton,
      changePassword
    };
  }
})
</script>

<template>
  <Toast />
  <main class="pt-6">
    <div
      class="md:mx-auto md:w-1/2 sm:w-full sm:m-0 p-6 border border-b rounded-md border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
      <h1 class="text-4xl dark:text-white">
        Profile
      </h1>
      <hr class="mb-8 mt-4">
      <div class="grid grid-rows-5 gap-8">

        <!-- First Name -->
        <div class="flex flex-col">
          <FloatLabel class="w-full">
            <InputText size="large" v-model="userFirstName" type="text" id="first_name"
              class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <label for="first_name" class="text-lg dark:text-white mb-1">First Name</label>
          </FloatLabel>
        </div>

        <!-- Last Name -->
        <div class="flex flex-col">
          <FloatLabel class="w-full">
            <InputText size="large" v-model="userLastName" type="text" id="last_name"
              class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <label for="last_name" class="text-lg dark:text-white mb-1">Last Name</label>
          </FloatLabel>
        </div>

        <!-- Username -->
        <div class="flex flex-col">
          <FloatLabel class="w-full">
            <InputText size="large" v-model="userUsername" type="text" id="username"
              class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <label for="username" class="text-lg dark:text-white mb-1">Username</label>
          </FloatLabel>
        </div>

        <!-- Email (disable) -->
        <div class="flex flex-col">
          <FloatLabel class="w-full">
            <InputText :disabled="true" size="large" v-model="userEmail" type="text" id="user_email"
              class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <label for="user_email" class="text-lg dark:text-white mb-1">Email</label>
          </FloatLabel>
        </div>

        <!-- Save Button -->
        <button @click="saveChanges" :class="{ 'cursor-not-allowed': !changedProfile }" :disabled="!changedProfile"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Save</button>
      </div>
      <hr class="my-8">
      <div class="grid grid-rows-4 gap-8">

        <!-- Password -->
        <div class="flex flex-col">
          <FloatLabel class="w-full">
            <InputText size="large" v-model="password" type="password" id="password"
              class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <label for="password" class="text-lg dark:text-white mb-1">Password</label>
          </FloatLabel>
        </div>

        <!-- New Password -->
        <div class="flex flex-col">
          <FloatLabel class="w-full">
            <InputText :disabled="!enableNewPasswordInputs" size="large" v-model="newPassword" type="password"
              id="new_password"
              class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <label for="new_password" class="text-lg dark:text-white mb-1">New Password</label>
          </FloatLabel>
        </div>

        <!-- Confirm Password -->
        <div class="flex flex-col">
          <FloatLabel class="w-full">
            <InputText :disabled="!enableNewPasswordInputs" size="large" v-model="confirmPassword" type="password"
              id="confirm_password"
              class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <label for="confirm_password" class="text-lg dark:text-white mb-1">Confirm Password</label>
          </FloatLabel>
        </div>

        <!-- Change Password Button -->
        <div class="flex flex-col">
          <button :disabled="!enableChangePasswordButton" :class="{ 'cursor-not-allowed': !enableChangePasswordButton }"
            @click="changePassword"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Change Password
          </button>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped></style>
