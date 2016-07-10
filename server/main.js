import { Cloudinary } from 'meteor/lepozepo:cloudinary';
import '../imports/api/tasks.js';
import '../imports/api/tags';
import '../imports/api/posts';
import '../imports/api/subPosts';
import '../imports/api/comments';

Cloudinary.config({
  cloud_name: 'pengyou',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

