import { Cloudinary } from 'meteor/lepozepo:cloudinary';
import '../imports/api/tasks.js';
import '../imports/api/tags';
import '../imports/api/posts';
import '../imports/api/subPosts';
import '../imports/api/comments';

Cloudinary.config({
  cloud_name: 'pengyou',
  api_key: '165877321498385',
  api_secret: 'u1hmZTT97rR5R_vRyOvku3tHGmk',
});
