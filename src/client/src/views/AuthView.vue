<script>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';

export default {
    name: 'AuthPage',
    components: {
        TabView,
        TabPanel,
        InputText,
        // eslint-disable-next-line vue/no-reserved-component-names
        Button,
        FloatLabel,
    },
    data() {
        return {
            activeTab: 'Signup',
            signupForm: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            loginForm: {
                username: '',
                password: '',
            },
        };
    },
    methods: {
        signup() {
            console.log(this.signupForm);
        },
        login() {
            console.log(this.loginForm);
        },
    },
};
</script>


<template>
    <div class="auth-container">
        <div class="auth-card">
            <div class="flex flex-row justify-center items-center p-4">
                <img class="w-1/6 h-1/6" src="/favicon.ico" alt="">
                <span class="text-white ml-3 text-2xl italic">
                    Keepman
                </span>
            </div>
            <TabView>
                <TabPanel header="Signup">
                    <form @submit.prevent="signup">
                        <FloatLabel class="mb-5">
                            <InputText class="w-full" id="firstName" v-model="signupForm.firstName" required />
                            <label for="firstName">First Name</label>
                        </FloatLabel>
                        <FloatLabel class="mb-5">
                            <InputText class="w-full" id="lastName" v-model="signupForm.lastName" required />
                            <label for="lastName">Last Name</label>
                        </FloatLabel>
                        <FloatLabel class="mb-5">
                            <InputText class="w-full" id="username" v-model="signupForm.username" required />
                            <label for="username">Username</label>
                        </FloatLabel>
                        <FloatLabel class="mb-5">
                            <InputText class="w-full" id="email" v-model="signupForm.email" type="email" required />
                            <label for="email">Email</label>
                        </FloatLabel>
                        <FloatLabel class="mb-5">
                            <InputText type="password" class="w-full" id="password" v-model="signupForm.password"
                                required />
                            <label for="password">Password</label>
                        </FloatLabel>
                        <FloatLabel class="mb-5">
                            <InputText type="password" class="w-full" id="confirmPassword"
                                v-model="signupForm.confirmPassword" required />
                            <label for="confirmPassword">Confirm Password</label>
                        </FloatLabel>
                        <div class="flex flex-row-reverse">
                            <Button type="submit" label="Signup" />
                        </div>
                    </form>
                </TabPanel>
                <TabPanel header="Login">
                    <form @submit.prevent="login">
                        <FloatLabel class="mb-5">
                            <InputText class="w-full" id="loginUsername" v-model="loginForm.username" required />
                            <label for="loginUsername">Username</label>
                        </FloatLabel>
                        <FloatLabel class="mb-5">
                            <InputText type="password" class="w-full" id="loginPassword" v-model="loginForm.password"
                                required />
                            <label for="loginPassword">Password</label>
                        </FloatLabel>
                        <div class="flex flex-row-reverse">
                            <Button type="submit" label="Login" />
                        </div>
                    </form>
                </TabPanel>
            </TabView>
        </div>
    </div>
</template>

<style scoped>
@media screen and (max-width: 426px) {
    .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .auth-card {
        width: 100%;
        height: 100%;
        padding: 20px;
    }
}

@media screen and (min-width: 426px) {
    .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .auth-card {
        width: 400px;
        padding: 20px;
    }
}
</style>