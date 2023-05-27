import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const multerConfig: MulterModuleOptions = {
    storage: diskStorage({
        destination : join(__dirname, '..', 'uploads'),
        filename : (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix);
          },
    }),
    dest : 'uploads/'

};