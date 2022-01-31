'use strict';

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const UPLOAD_DIR = `../upload/img`;
const FILE_TYPES = [`image/png`, `image/jpg`, `image/jpeg`];
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);
const MAX_SIZE = 10485760;

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({storage, fileFilter, limits: {fileSize: MAX_SIZE}});

module.exports = upload;
