// cloudinary.service.ts
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinaryType,
} from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY') private cloudinary: typeof cloudinaryType,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = this.cloudinary.uploader.upload_stream(
        {
          folder: 'image-ERP',
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) {
            return reject(
              new InternalServerErrorException(
                'Không có kết quả từ Cloudinary',
              ),
            );
          }
          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }

  async deleteImage(publicId: string): Promise<{ result: string }> {
    try {
      const result = await this.cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      console.error('Lỗi xoá ảnh:', error);
      throw new Error('Xoá ảnh thất bại!');
    }
  }
}
