<template>
  <div>
    <div class="btn-wrap">
      <div class="btn">
        <router-link to="e-patientform" class="wrap">Akutmodtagelse</router-link>
      </div>
      <div class="btn">
        <router-link to="patienthospitals" class="wrap">Patientforløb</router-link>
      </div>
      <div class="btn">
        <router-link to="/login" class="wrap">Borgersupport</router-link>
      </div>
      <div class="btn">
        <router-link to="/login" class="wrap">Find Vej</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@media (max-width: 767px) {
  .btn-wrap {
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .btn {
      border: 1px solid black;
      box-sizing: border-box;
      padding: 15px;
      text-align: center;
      border-radius: 5px;
      .wrap {
        text-decoration: none;
        color: black;
        font-weight: 600;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
      }
    }
    .btn:nth-child(1) {
      background-color: #0092cf;
      border: none;
      .wrap {
        color: white;
      }
    }
  }
}
</style>
