// In-memory store (no database)
let formData = [];

const FormModel = {
  findAll: () => formData,

  create: (entry) => {
    const record = { id: Date.now(), ...entry, createdAt: new Date().toISOString() };
    formData.push(record);
    return record;
  },

  findByEmail: (email) => formData.find(r => r.email === email),

  clear: () => { formData = []; },
};

export default FormModel;
