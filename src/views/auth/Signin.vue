<template>
  <div class="w-screen h-screen flex justify-center items-center dark:bg-gray-900">
    <div class="grid gap-8 md:w-1/2">
      <div id="back-div" class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
        <div
          class="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
          <h1 class="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
            Log in
          </h1>
          <form @submit.prevent="formSubmit" class="space-y-4">
            <InputField id="email"
              inputClass="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
              labelText="Email" placeholder="Email" v-model="form.email" type="email" />
            <ErrorMessage :message="errors.email" />
            <InputField id="password"
              inputClass="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
              labelText="Password" placeholder="Password" v-model="form.password" type="password" />
            <ErrorMessage :message="errors.password" />
            <Button :isLoading="isLoading" :disabled="isLoading"
              buttonClass="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              :buttonText="isLoading ? 'Signing In...' : 'SIGN IN'" type="submit" />
          </form>
          <div class="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 class="dark:text-gray-300">
              Don't have an account?
              <RouterLink to="/signup" class="text-blue-400 group">
                <span
                  class="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Sign Up
                </span>
              </RouterLink>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { signIn } from "@/firebase/auth.js";
import { useRouter } from 'vue-router';
import { useAppStore } from "@/stores/store";
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue';
import useValidation from '@/composable/useValidations';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { useToast } from '@/composable/useToast';



export default defineComponent({
  name: 'SignIn',
  components: {
    InputField,
    Button,
    ErrorMessage
  },
  setup() {
    const { addToast } = useToast();
    const form = reactive({
      email: '',
      password: '',
    });

    const {
      errors,
      validateEmail,
      validatePassword,
      isFormValid,
    } = useValidation();

    const router = useRouter();
    const store = useAppStore();
    const isLoading = ref(false);

    const formSubmit = async () => {
      validateEmail(form.email);
      validatePassword(form.password);
      if (isFormValid()) {
        isLoading.value = true;
        console.log('Form Submitted:', form);
        try {
          const user = await signIn(form.email, form.password);
          store.setUser(user);
          email.value = "";
          password.value = "";
          router.push('/');
        } catch (error) {
          console.log(error)
          addToast(error.message, "danger");
          errorMessage.value = error.message;
        }
        finally {
          isLoading.value = false;
        }
      }

    };

    return {
      errors,
      validateEmail,
      validatePassword,
      form,
      formSubmit,
      isLoading,
    };
  },
});
</script>

<style scoped></style>