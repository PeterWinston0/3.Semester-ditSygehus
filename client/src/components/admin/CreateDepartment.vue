<template>
  <div>
    <h1>Create Department</h1>

    <!-- Step 1: Form to create department -->
    <form v-if="step === 1" @submit.prevent="submitDepartment">
      <div>
        <label for="departmentName">Department Name:</label>
        <input type="text" id="departmentName" v-model="newDepartment.name" required />
      </div>
      <button type="submit" class="btn btn-primary">Create Department</button>
    </form>

    <!-- Step 2: Contact Information -->
    <div v-if="step === 2">
      <h2>Contact Information</h2>
      <div>
        <label for="contactName">Contact Name:</label>
        <input type="text" id="contactName" v-model="contactInfo.name" required />
      </div>
      <div>
        <label for="contactDetails">Contact Details:</label>
        <textarea id="contactDetails" v-model="contactInfo.details" required></textarea>
      </div>
      <div>
        <label for="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" v-model="contactInfo.phoneNumber" required />
      </div>
      <button @click.prevent="addContactSection" class="btn btn-primary">Add Contact Section</button>
    </div>

    <!-- Step 3: About the Department -->
    <div v-if="step === 3">
      <h2>About the Department</h2>
      <div>
        <label for="aboutDetails">About the Department:</label>
        <textarea id="aboutDetails" v-model="aboutDepartment.details" required></textarea>
      </div>
      <div>
        <label for="numberOfEmployees">Number of Employees:</label>
        <input type="number" id="numberOfEmployees" v-model="aboutDepartment.numberOfEmployees" required />
      </div>
      <button @click.prevent="addAboutSection" class="btn btn-primary">Add About Section</button>
    </div>

    <!-- Step 4: Success message -->
    <div v-if="step === 4">
      <p>Department created successfully!</p>
      <router-link :to="{ name: 'DepartmentDetails', params: { departmentId: createdDepartmentId } }">
        Go to Department Details
      </router-link>
    </div>

    <!-- Error message display -->
    <div v-if="errorCreatingDepartment" class="error-message">
      {{ errorCreatingDepartment }}
      <button @click="clearError">Dismiss</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDepartment: {
        name: '',
      },
      contactInfo: {
        name: '',
        details: '',
        phoneNumber: '',
      },
      aboutDepartment: {
        details: '',
        numberOfEmployees: 0,
      },
      hospitalId: this.$route.params.hospitalId,
      step: 1,
      createdDepartmentId: null,
      errorCreatingDepartment: null,
    };
  },
  methods: {
    async submitDepartment() {
      try {
        const response = await fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newDepartment),
        });

        if (!response.ok) {
          throw new Error('Error creating department');
        }

        const responseData = await response.json();
        this.createdDepartmentId = responseData.departmentId;
        this.step = 2; // Move to the next step if department creation is successful
      } catch (error) {
        console.error('Error creating department:', error);
        this.errorCreatingDepartment = 'Error creating department. Please try again.'; // Update error message
      }
    },

    // async submitDepartment() {
    //   try {
    //     const response = await fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(this.newDepartment),
    //     });

    //     if (!response.ok) {
    //       throw new Error('Error creating department');
    //     }

    //     const responseData = await response.json();
    //     this.createdDepartmentId = responseData.departmentId;
    //     this.step = 2;
    //   } catch (error) {
    //     console.error('Error creating department:', error);
    //   }
    // },

    async addContactSection() {
      try {
        if (!this.createdDepartmentId) {
          throw new Error('Department ID not found');
        }

        const response = await fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments/${this.createdDepartmentId}/sections`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Contact',
            description: this.contactInfo.details,
            contactName: this.contactInfo.name,
            phoneNumber: this.contactInfo.phoneNumber,
          }),
        });

        if (!response.ok) {
          throw new Error('Error adding contact section');
        }

        this.step = 3;
      } catch (error) {
        console.error('Error adding contact section:', error);
      }
    },

    async addAboutSection() {
      try {
        if (!this.createdDepartmentId) {
          throw new Error('Department ID not found');
        }

        const response = await fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments/${this.createdDepartmentId}/sections`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'About the Department',
            description: this.aboutDepartment.details,
            numberOfEmployees: this.aboutDepartment.numberOfEmployees,
          }),
        });

        if (!response.ok) {
          throw new Error('Error adding about section');
        }

        this.step = 4;
      } catch (error) {
        console.error('Error adding about section:', error);
      }
    },
    clearError() {
      this.errorCreatingDepartment = null;
    },
  },
};
</script>




<!-- <template>
  <div>
    <h1>Create Department</h1>


    <form v-if="step === 1" @submit.prevent="submitDepartment">
      <div>
        <label for="departmentName">Department Name:</label>
        <input type="text" id="departmentName" v-model="newDepartment.name" required />
      </div>
      <button type="submit" class="btn btn-primary">Create Department</button>
    </form>


    <div v-if="step === 2">
      <h2>Contact Information</h2>
      <div>
        <label for="contactName">Contact Name:</label>
        <input type="text" id="contactName" v-model="contactInfo.name" required />
      </div>
      <div>
        <label for="contactDetails">Contact Details:</label>
        <textarea id="contactDetails" v-model="contactInfo.details" required></textarea>
      </div>
      <div>
        <label for="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" v-model="contactInfo.phoneNumber" required />
      </div>
      <button @click.prevent="addContactSection" class="btn btn-primary">Add Contact Section</button>
    </div>


    <div v-if="step === 3">
      <h2>About the Department</h2>
      <div>
        <label for="aboutDetails">About the Department:</label>
        <textarea id="aboutDetails" v-model="aboutDepartment.details" required></textarea>
      </div>
      <div>
        <label for="numberOfEmployees">Number of Employees:</label>
        <input type="number" id="numberOfEmployees" v-model="aboutDepartment.numberOfEmployees" required />
      </div>
      <button @click.prevent="addAboutSection" class="btn btn-primary">Add About Section</button>
    </div>


    <div v-if="step === 4">
      <p>Department created successfully!</p>
      <router-link :to="{ name: 'DepartmentDetails', params: { departmentId: createdDepartmentId } }">
        Go to Department Details
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDepartment: {
        name: '',
      },
      contactInfo: {
        name: '',
        details: '',
        phoneNumber: '', // Added phone number field
      },
      aboutDepartment: {
        details: '',
        numberOfEmployees: 0, // Added number of employees field
      },
      hospitalId: this.$route.params.hospitalId,
      step: 1,
      createdDepartmentId: null,
    };
  },
  methods: {
    async submitDepartment() {
      try {
        const response = await fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newDepartment),
        });

        if (!response.ok) {
          throw new Error('Error creating department');
        }

        const responseData = await response.json();
        this.createdDepartmentId = responseData.departmentId; // Set the created department's ID
        this.step = 2; // Move to the next step after creating the department
      } catch (error) {
        console.error('Error creating department:', error);
      }
    },

    async addContactSection() {
      try {
        if (!this.createdDepartmentId) {
          throw new Error('Department ID not found');
        }

        const response = await fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments/${this.createdDepartmentId}/sections`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Contact',
            description: this.contactInfo.details,
            contactName: this.contactInfo.name,
            phoneNumber: this.contactInfo.phoneNumber, // Include the phone number field
          }),
        });

        if (!response.ok) {
          throw new Error('Error adding contact section');
        }

        this.step = 3; // Move to the next step after adding the contact section
      } catch (error) {
        console.error('Error adding contact section:', error);
      }
    },

    async addAboutSection() {
      try {
        if (!this.createdDepartmentId) {
          throw new Error('Department ID not found');
        }

        const response = await fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments/${this.createdDepartmentId}/sections`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'About the Department',
            description: this.aboutDepartment.details,
            numberOfEmployees: this.aboutDepartment.numberOfEmployees, // Include the number of employees field
          }),
        });

        if (!response.ok) {
          throw new Error('Error adding about section');
        }

        this.step = 4; // Move to the next step after adding the about section
      } catch (error) {
        console.error('Error adding about section:', error);
      }
    },
  },
};
</script> -->






<!-- <template>
  <div>
    <h1>Create Department</h1>
    <form @submit.prevent="createDepartment">
      <div>
        <label for="departmentName">Department Name:</label>
        <input type="text" id="departmentName" v-model="newDepartment.name" required />
      </div>

      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDepartment: {
        name: '',
      },
      hospitalId: this.$route.params.hospitalId, // Ensure the hospitalId is available in the route
    };
  },
  methods: {
    async createDepartment() {
      try {
        const response = await fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newDepartment),
        });

        if (!response.ok) {
          throw new Error('Error creating department');
        }

        // Redirect to hospital details page after successful department creation
        this.$router.push({ name: 'DetailsHospital', params: { id: this.hospitalId } });
      } catch (error) {
        console.error('Error creating department:', error);
      }
    },
  },
};
</script>

<style>
/* Your styles here */
</style> -->
