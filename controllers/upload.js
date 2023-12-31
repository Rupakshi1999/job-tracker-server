const { StatusCodes } = require('http-status-codes');
const path = require('path');
const { BadRequestError } = require('../errors/index');

const uploadResume = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No file Uploaded');
  }
  // upload and make publicilly avaiable (no confidential info yet)
  let file = req.files.resume;
  console.log(file);

  if (file.mimetype != 'application/pdf') {
    throw new BadRequestError('Please upload pdf');
  }

  const maxSize = 1024 * 1024 * 10; // 10MB

  if (file.size > maxSize) {
    throw new BadRequestError(`Max size exceeded ${maxSize}`);
  }
  const userID = req.user.userID;
  const file_name = `${userID}*-*${file.name}`;
  const file_path = path.join(__dirname, '../files/resumes/' + file_name);
  await file.mv(file_path);

  return res
    .status(StatusCodes.OK)
    .json({ resume: { src: `/files/resumes/${file_name}` } });
};

module.exports = {
  uploadResume,
};
