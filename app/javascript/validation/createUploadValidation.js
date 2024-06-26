const validateYouTubeUrl = (url) => {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  return regExp.test(String(url).toLowerCase());
};

const validateSourceExtension = (sourceName) => {
  const regExp = /^.*(\.mp3|\.wav)$/i;
  return regExp.test(String(sourceName).toLowerCase());
};

const validateSourceType = (sourceType) => {
  return sourceType === "audio/mpeg" || sourceType === "audio/wav";
};

export const validateUpload = (userDetails, isLink) => {
  let errors = {};
  if (!userDetails.name) {
    errors = { ...errors, name: "Name cannot be empty" };
  }

  if (userDetails.name.length > 100) {
    errors = {
      ...errors,
      description: "Name can be no longer than 100 characters",
    };
  }

  if (userDetails.artist.length > 100) {
    errors = {
      ...errors,
      description: "Artist's Name can be no longer than 100 characters",
    };
  }

  if (
    !validateSourceExtension(userDetails.source.name) ||
    !validateSourceType(userDetails.source.type)
  ) {
    errors = {
      ...errors,
      source: "Invalid audio file. The file must be a .mp3 or .wav file.",
    };
  }

  if (!userDetails.source) {
    errors = { ...errors, source: "Please select a source" };
  }

  if (isLink) {
    if (!userDetails.url || !validateYouTubeUrl(userDetails.url)) {
      errors = { ...errors, url: "Please enter a valid Youtube url" };
    }
  }

  return errors;
};
