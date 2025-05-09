<template>
  <Transition :name="transitionName" mode="out-in">
    <div class="container" key="register-page">
      <div class="box" ref="boxRef">
        <h1 class="title">Register</h1>
        <form @submit.prevent="register" class="form">
          <div class="form-group">
            <label for="full_name" class="form-label">Full name:</label>
            <input
              type="text"
              v-model="full_name"
              placeholder="Enter your name"
              required
              class="form-input"
              :disabled="!isActive"
            />
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email:</label>
            <input
              type="email"
              v-model="email"
              placeholder="Enter your email"
              required
              class="form-input"
              :disabled="!isActive"
            />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password:</label>
            <input
              type="password"
              v-model="password"
              placeholder="Enter your password"
              required
              class="form-input"
              :disabled="!isActive"
            />
          </div>
          <button type="submit" class="button">Register</button>
        </form>
        <p class="footer">
          Already have an account?
          <router-link
            to="/login"
            class="link"
            @click.native="setTransition('slide-left')"
            >Login</router-link
          >
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useAuthStore } from "../stores/auth";
import gsap from "gsap";
import { useRouter } from "vue-router";

const full_name = ref("");
const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();
const isActive = ref(false);
const boxRef = ref<HTMLElement | null>(null);
const transitionName = ref("slide-right");

const register = async () => {
  try {
    await authStore.register(full_name.value, email.value, password.value);
    setTransition("slide-left");
    router.push("/login");
  } catch (error) {
    console.error(error);
  }
};

const setTransition = (name: string) => {
  transitionName.value = name;
};

const animateForm = async () => {
  if (boxRef.value) {
    gsap.from(boxRef.value, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        isActive.value = true;
      },
    });
  }
};

onMounted(async () => {
  await nextTick();
  animateForm();
});
</script>

<style scoped></style>
