<template>
  <div class="create-department-container">
    <h1>Create Department</h1>

    <form v-if="step === 1" @submit.prevent="submitDepartment" class="department-form">
      <div class="form-group">
        <label for="departmentName">Department Name:</label>
        <input type="text" id="departmentName" v-model="newDepartment.name" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="departmentAddress">Department Address:</label>
        <input type="text" id="departmentAddress" v-model="newDepartment.address" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Create Department</button>
    </form>

    <div v-if="step === 2" class="contact-section">
      <h2>Contact Information</h2>
      <div class="form-group">
        <label for="contactName">Contact Name:</label>
        <input type="text" id="contactName" v-model="contactInfo.name" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="contactDetails">Contact Details:</label>
        <textarea id="contactDetails" v-model="contactInfo.details" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" v-model="contactInfo.phoneNumber" class="form-control" required />
      </div>
      <button @click.prevent="addContactSection" class="btn btn-primary">Add Contact Section</button>
    </div>

    <div v-if="step === 3" class="about-section">
      <h2>About the Department</h2>
      <div class="form-group">
        <label for="aboutDetails">About the Department:</label>
        <textarea id="aboutDetails" v-model="aboutDepartment.details" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="numberOfEmployees">Number of Employees:</label>
        <input type="number" id="numberOfEmployees" v-model="aboutDepartment.numberOfEmployees" class="form-control" required />
      </div>
      <button @click.prevent="addAboutSection" class="btn btn-primary">Add About Section</button>
    </div>

    <div v-if="step === 4" class="success-message">
      <p>Department Created!</p>
      <router-link :to="{ name: 'DepartmentDetails', params: { departmentId: createdDepartmentId } }" class="success-link">
        Go to Department Details
      </router-link>
    </div>

    <div v-if="errorCreatingDepartment" class="error-message">
      {{ errorCreatingDepartment }}
      <button @click="clearError" class="error-dismiss">Dismiss</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDepartment: {
        name: '',
        address: '', // Add the address field
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
        // Create the department with the provided data
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

        // Get the department ID from the response
        const responseData = await response.json();
        this.createdDepartmentId = responseData.departmentId;

        // Create predefined sections
        await this.createPredefinedSections();

        this.step = 2; // Move to the next step if department creation is successful
      } catch (error) {
        console.error('Error creating department:', error);
        this.errorCreatingDepartment = 'Error creating department. Please try again.'; // Update error message
      }
    },

    async createPredefinedSections() {
      // Define predefined section names
      const predefinedSections = ['Mine Aftaler', 'Beskeder', 'Vejledning Videokonsultation'];

      for (const sectionName of predefinedSections) {
        try {
          // Create the predefined section
          const response = await fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments/${this.createdDepartmentId}/sections`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: sectionName,
            }),
          });

          if (!response.ok) {
            throw new Error(`Error adding ${sectionName} section`);
          }
        } catch (error) {
          console.error(`Error adding ${sectionName} section:`, error);
        }
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
            name: 'Kontakt',
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
            name: 'Om Afdelingen',
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

<style scoped>
.create-department-container {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.department-form,
.contact-section,
.about-section {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

.success-message {
  color: #4CAF50;
  font-weight: bold;
  margin-top: 20px;
}

.success-link {
  text-decoration: none;
  color: #4CAF50;
}

.error-message {
  color: #E74C3C;
  font-weight: bold;
  margin-top: 20px;
}

.error-dismiss {
  padding: 5px 10px;
  background-color: #E74C3C;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.error-dismiss:hover {
  background-color: #D9534F;
}
</style>