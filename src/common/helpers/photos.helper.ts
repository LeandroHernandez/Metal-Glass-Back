/* eslint-disable prettier/prettier */
export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error(' Invalid Format Type '), false);
  }
  callback(null, true);
};
