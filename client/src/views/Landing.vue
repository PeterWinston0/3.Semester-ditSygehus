<template>
  <div class="landing-wrapper">
    <h2>Velkommen til ditSygehus</h2>
    <div class="content-box">
      <div class="login-button">
        <router-link to="/login" class="btn">Log på ditSygehus</router-link>
      </div>
      <div class="info-button">
        <router-link to="/login" class="btn">Info om ditSygehus</router-link>
      </div>
      <div class="help">
        <router-link to="/login" class="link"
          >Har du brug for hjælp?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.landing-wrapper {
  background-image: url("../assets/img/landingBG.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
    box-sizing: border-box;
    padding-top: 100px;
    color: white;
    font-size: 42px;
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
}

.content-box {
  width: 50%;
  background-color: white;
  margin: auto auto;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  .login-button {
    background-color: #0092cf;
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
    text-align: center;
    border-radius: 5px;

    .btn {
      text-decoration: none;
      color: white;
    }
  }
  .info-button {
    background-color: white;
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
    text-align: center;
    border: 1px solid black;
    border-radius: 5px;

    .btn {
      text-decoration: none;
      color: black;
      width: 100%;
      height: 100%;
    }
  }
  .help {
    width: 300px;
    text-align: center;
    .link {
      text-decoration: none;
    }
  }
}
</style>