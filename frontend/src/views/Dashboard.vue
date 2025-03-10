<template>
  <div class="container">
    <div class="box">
      <h1 class="title">Dashboard</h1>
      <p>Welcome to the dashboard!</p>

      <button class="button-danger" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style src="../style.css"></style>
