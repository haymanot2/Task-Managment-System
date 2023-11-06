

const validateUserRegistration = (username, email) => {
    const errors = [];
  
    if (!username || username.trim() === '') {
      errors.push('Username is required.');
    }
  
    if (!email || email.trim() === '') {
      errors.push('Email is required.');
    }
  
    return errors;
  };
  

  const validateProjectCreation = (name) => {
    const errors = [];
  
    if (!name || name.trim() === '') {
      errors.push('Project name is required.');
    }
  
    return errors;
  };
  
 
  const validateTaskCreation = (title) => {
    const errors = [];
  
    if (!title || title.trim() === '') {
      errors.push('Task title is required.');
    }
  
    return errors;
  };
  
  module.exports = {
    validateUserRegistration,
    validateProjectCreation,
    validateTaskCreation,
  };