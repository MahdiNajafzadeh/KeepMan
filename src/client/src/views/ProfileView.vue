<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: "ProfileView",
    setup() {
        const store = useStore();
        const profile = computed(() => store.state.profile);
        return {
            profile,
        }
    },
    data() {
        return {
            changedProfile: false,
            iconNewPassword: ['fas', 'eye'],
            iconConfirmPassword: ['fas', 'eye'],
            allowChangePassword: false,
        }
    },
    methods: {
        changeProfileImage(event: Event) {
            const changedProfileImage = this.changeProfile;
            const inputElement = event.target as HTMLInputElement;
            if (inputElement.files && inputElement.files.length > 0) {
                const file = inputElement.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const previewImage = document.getElementById('image-profile-perview') as HTMLImageElement
                    if (previewImage) {
                        previewImage.src = e.target?.result as string;
                        changedProfileImage('image')
                    }
                };
                reader.readAsDataURL(file);
            }
        },
        changeProfile(changedData: string, event?: Event) {
            this.changedProfile = true
            switch (changedData) {
                case 'firstName':
                case 'lastName':
                case 'username': {
                    const inputElement = event?.target as HTMLInputElement;
                    this.profile[changedData] = inputElement.value;
                    break;
                }
                case 'image':
                    break;
                default:
                    break;
            }
        },
        showPassword(passwordInputId: string) {
            const passwordInput = document.getElementById(passwordInputId) as HTMLInputElement;
            if (passwordInputId === 'newPassword') {
                this.iconNewPassword = this.iconNewPassword.includes('eye') ? ['fas', 'eye-slash'] : ['fas', 'eye']
            } else {
                this.iconConfirmPassword = this.iconConfirmPassword.includes('eye') ? ['fas', 'eye-slash'] : ['fas', 'eye']
            }
            passwordInput.type = passwordInput.type === "password" ? "text" : "password"
        },
        validatePassword() {
            const newPasswordValue = (document.getElementById('newPassword') as HTMLInputElement).value
            const confirmPasswordValue = (document.getElementById('confirmPassword') as HTMLInputElement).value
            if ((newPasswordValue.length < 8) || (newPasswordValue !== confirmPasswordValue)) {
                console.log(false);
            } else {
                this.allowChangePassword = true
            }
        }
    },
})
</script>


<template>
    <main class="mx-3 p-4 d-flex flex-row justify-content-center">
        <div class="profile-card">
            <h1>Profile</h1>
            <div class="container m-4">
                <div class="row form-row">
                    <div class="d-flex flex-row justify-content-center">
                        <div style="position: relative;">
                            <img class="rounded-circle" style="width: 150px; height: 150px;"
                                :src="`/image/profile/${profile.id}.jpg`" id="image-profile-perview"
                                alt="image-profile-perview">
                            <label for="file-input" style="position: absolute; bottom: 0; right: 0;"
                                class="btn btn-secondary">
                                <FontAwesomeIcon :icon="['fas', 'circle-plus']" />
                            </label>
                            <input @change="changeProfileImage" id="file-input" type="file" style="display: none;">
                        </div>
                    </div>
                </div>
                <div class="row form-row">
                    <div class="col-md-12 mb-3">
                        <label for="firstNameInput" class="mb-1">First Name</label>
                        <div class="input-group">
                            <input id="firstNameInput" type="text" class="form-control" placeholder="First Name"
                                aria-describedby="inputGroupPrepend2" :value="profile.firstName"
                                @change="changeProfile('firstName', $event)" required>
                        </div>
                    </div>
                </div>
                <div class="row form-row">
                    <div class="col-md-12 mb-3">
                        <label for="lastNameInput" class="mb-1">Last Name</label>
                        <div class="input-group">
                            <input id="lastNameInput" type="text" class="form-control" placeholder="Last Name"
                                aria-describedby="inputGroupPrepend2" :value="profile.lastName"
                                @change="changeProfile('lastName', $event)" required>
                        </div>
                    </div>
                </div>
                <div class="row from-row">
                    <div class="col-md-12 mb-3">
                        <label for="usernameInput" class="mb-1">Username</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupPrepend2">@</span>
                            </div>
                            <input id="usernameInput" type="text" class="form-control" placeholder="Username"
                                aria-describedby="inputGroupPrepend2" :value="profile.username"
                                @change="changeProfile('username', $event)" required>
                        </div>
                    </div>
                </div>
                <div class="row form-row">
                    <div class="col-md-12 mb-3">
                        <label for="emailInput" class="mb-1">Email</label>
                        <div class="input-group">
                            <input id="emailInput" type="text" class="form-control" placeholder="Last Name"
                                aria-describedby="inputGroupPrepend2" :value="profile.email" disabled required>
                        </div>
                    </div>
                </div>
                <div class="row from-row">
                    <div class="col-md-10 d-flex flex-row justify-content-end">
                        <span v-if="changedProfile" class="btn btn-danger" style="align-content: center;">
                            Need to Save Profile
                        </span>
                    </div>
                    <div class="col-md-2 d-flex flex-row justify-content-end">
                        <input class="btn btn-success"
                            :class="{ 'btn-success': changedProfile, 'btn-outline-success': !changedProfile }"
                            :disabled="!changedProfile" type="button" value="Save">
                    </div>
                </div>
                <hr>
                <div class="row from-row">
                    <div class="col-md-12 mb-3">
                        <label for="newPassword" class="mb-1">New Password</label>
                        <div class="input-group">
                            <input type="password" class="form-control" placeholder="New Password" id="newPassword"
                                @change="validatePassword" required>
                            <div class="input-group-prepend">
                                <span class="input-group-text btn btn-secondary">
                                    <FontAwesomeIcon @click="showPassword('newPassword')" :icon="iconNewPassword" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row from-row">
                    <div class="col-md-12 mb-3">
                        <label for="confirmPassword" class="mb-1">Confirm New Password</label>
                        <div class="input-group">
                            <input type="password" class="form-control" placeholder="Confirm New Password"
                                aria-describedby="inputGroupPrepend2" id="confirmPassword" @change="validatePassword"
                                required>
                            <div class="input-group-prepend">
                                <span class="input-group-text btn btn-secondary" id="inputGroupPrepend2">
                                    <FontAwesomeIcon @click="showPassword('confirmPassword')"
                                        :icon="iconConfirmPassword" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row from-row">
                    <div class="col-md-10 d-flex flex-row justify-content-end">
                    </div>
                    <div class="col-md-2 d-flex flex-row justify-content-end">
                        <input class="btn btn-success"
                            :class="{ 'btn-success': allowChangePassword, 'btn-outline-success': !allowChangePassword }"
                            :disabled="!allowChangePassword" type="button" value="Change Password">
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.profile-card {
    width: calc(100% / 3)
}
</style>
