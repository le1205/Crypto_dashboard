<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <p class="heading">Login</p>
      </div>
      <div class="card-body">
        <form @submit.prevent="register">
          <div class="input-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              class="form-input"
              v-model="email"
              required
            />
          </div>
          <div class="input-group">
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              class="form-input"
              v-model="password"
              required
            />
          </div>
          <div class="input-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              class="form-input"
              v-model="confirmPassword"
              required
            />
          </div>
          <button class="form-btn" type="submit">Register</button>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
      <div class="card-footer">
        <p class="m-0">
          Already have an account? <nuxt-link to="/login">Login</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      error: null,
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords don't match";
        return;
      }
      try {
        await this.$axios.post("/auth/signup", {
          email: this.email,
          password: this.password,
        });
        this.$router.push("/login");
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  background-color: #eee;
  color: #444;
}
.card {
  padding: 24px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 10px #ddd;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.heading {
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin: 0;
}
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  gap: 4px;
}
.form-input {
  display: block;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #999;
}
.form-btn {
  background-color: #3d9c7a;
  width: 100%;
  display: block;
  padding: 12px 0;
  border-radius: 4px;
  color: #fff;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
}
.m-0 {
  margin: 0;
}
</style>
