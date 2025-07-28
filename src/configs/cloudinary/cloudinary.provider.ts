import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.PUBLIC_API_CLOUD,
      api_secret: process.env.SECRET_API_CLOUD,
    });
    return cloudinary;
  },
};
