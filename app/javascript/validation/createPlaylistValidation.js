export const validatePlaylist = (userDetails) => {
    let errors = {};

    if (typeof userDetails.name !== 'undefined' && userDetails.name !== null) {
      if (!userDetails.name) {
        errors = { ...errors, name: "Name cannot be empty" };
      }

      if (userDetails.name.length > 100) {
        errors = { ...errors, description: "Name can be no longer than 100 characters"}
      }
    }
    
    if (typeof userDetails.description !== 'undefined' && userDetails !== null) {
      if (userDetails.description.length > 200) {
        errors = { ...errors, description: "Description can be no longer than 200 characters"}
      }
    }
    
    return errors;
};
  