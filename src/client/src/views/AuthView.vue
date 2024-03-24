<script lang="ts">
import { defineComponent } from 'vue'
import axios, { AxiosError } from 'axios'

export default defineComponent({
    data() {
        return {
            activeTab: 'login',
            signupData: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            loginData: {
                username: '',
                password: ''
            }
        }
    },
    computed: {
        signupButtonText() {
            return this.activeTab === 'signup' ? 'Signup' : 'Login';
        },
        loginButtonText() {
            return this.activeTab === 'login' ? 'Login' : 'Signup';
        }
    },
    methods: {
        async signup() {
            // console.log('Signup Data:', this.signupData);
            try {
                const response = await axios.post('http://localhost:3000/api/auth/signup', {
                    firstName: this.signupData.firstName,
                    lastName: this.signupData.lastName,
                    username: this.signupData.username,
                    email: this.signupData.email,
                    password: this.signupData.password,
                })
                console.log(response);
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error);
                }
            }
        },
        async login() {
            console.log('Login Data:', this.loginData);
        }
    }
})
</script>

<template>
    <main>
        <div class="authentication-page">
            <div class="d-flex flex-row justify-content-center mb-3" style="align-items: center;">
                <img src="/favicon.ico" width="80" height="80" alt="">
                <h1 class="mx-2"><i>Keepman</i></h1>
            </div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header d-flex flex-row justify-content-center">
                                <ul class="nav nav-tabs card-header-tabs">
                                    <li class="nav-item" @click="activeTab = 'login'">
                                        <a class="nav-link" :class="{ active: activeTab === 'login' }"
                                            href="#">Login</a>
                                    </li>
                                    <li class="nav-item" @click="activeTab = 'signup'">
                                        <a class="nav-link" :class="{ active: activeTab === 'signup' }"
                                            href="#">Signup</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body mx-4">
                                <div v-if="activeTab === 'signup'">
                                    <h5 class="card-title">Signup</h5>
                                    <form @submit.prevent="signup">
                                        <div class="form-group mb-3 mt-3">
                                            <input type="text" class="form-control" v-model="signupData.firstName"
                                                placeholder="First Name" required>
                                        </div>
                                        <div class="form-group mb-3">
                                            <input type="text" class="form-control" v-model="signupData.lastName"
                                                placeholder="Last Name" required>
                                        </div>
                                        <div class="form-group mb-3">
                                            <input type="text" class="form-control" v-model="signupData.username"
                                                placeholder="Username" required>
                                        </div>
                                        <div class="form-group mb-3">
                                            <input type="email" class="form-control" v-model="signupData.email"
                                                placeholder="Email" required>
                                        </div>
                                        <div class="form-group mb-3">
                                            <input type="password" class="form-control" v-model="signupData.password"
                                                placeholder="Password" required>
                                        </div>
                                        <div class="form-group mb-3">
                                            <input type="password" class="form-control"
                                                v-model="signupData.confirmPassword" placeholder="Confirm Password"
                                                required>
                                        </div>
                                        <div class="d-flex flex-row justify-content-end">
                                            <button type="submit" class="btn btn-primary">
                                                {{ signupButtonText }}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div v-if="activeTab === 'login'">
                                    <h5 class="card-title">Login</h5>
                                    <form @submit.prevent="login">
                                        <div class="form-group mb-3 mt-3">
                                            <input type="text" class="form-control" v-model="loginData.username"
                                                placeholder="Username" required>
                                        </div>
                                        <div class="form-group mb-3">
                                            <input type="password" class="form-control" v-model="loginData.password"
                                                placeholder="Password" required>
                                        </div>
                                        <div class="d-flex flex-row justify-content-end">
                                            <button type="submit" class="btn btn-primary">
                                                {{ loginButtonText }}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.authentication-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    ;
}
</style>