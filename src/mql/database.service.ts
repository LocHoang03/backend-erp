import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class DatabaseService {
  constructor(@Inject('DB_ERP') private dataSource: DataSource) {}

  async findAllBackups(): Promise<{ fileName: string; createdAt: Date }[]> {
    const backupDir = path.join(__dirname, '../backups');

    // Nếu thư mục không tồn tại, trả mảng rỗng
    if (!fs.existsSync(backupDir)) {
      return [];
    }

    const files = fs.readdirSync(backupDir);

    const backups = files
      .filter((file) => file.endsWith('.sql'))
      .map((file) => {
        const filePath = path.join(backupDir, file);
        const stat = fs.statSync(filePath);

        return {
          fileName: file,
          createdAt: stat.birthtime, // hoặc stat.mtime
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return backups;
  }

  getBackupFilePath(fileName: string): string | null {
    const filePath = path.join(process.cwd(), 'dist', 'backups', fileName);

    console.log('📦 File path:', filePath);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    return filePath;
  }

  async backup(): Promise<string> {
    const options = this.dataSource.options as MysqlConnectionOptions;
    const {
      database,
      username,
      password,
      host = 'localhost',
      port = 3306,
    } = options;

    const now = new Date();
    const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    const timestamp = vietnamTime
      .toISOString()
      .replace(/T/, '_')
      .replace(/:/g, '-')
      .replace(/\..+/, '');

    const backupDir = path.join(__dirname, '../backups');
    fs.mkdirSync(backupDir, { recursive: true });

    const fileName = `backup-${timestamp}.sql`;

    const backupFile = path.join(backupDir, fileName);

    const command = `mysqldump -u${username} -p${password} -h${host} -P${port} ${database} > "${backupFile}"`;

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Backup failed:', stderr);
          return reject('Backup failed: ' + stderr);
        }
        resolve(fileName);
      });
    });
  }

  async restore(filePath: string): Promise<string> {
    const options = this.dataSource.options as MysqlConnectionOptions;

    const dbName = options.database as string;
    const dbUser = options.username as string;
    const dbPassword = options.password as string;
    const dbHost = options.host || 'localhost';
    const dbPort = options.port || 3306;
    const filename = path.join(process.cwd(), 'dist', 'backups', filePath);

    const command = `mysql -u${dbUser} -p${dbPassword} -h${dbHost} -P${dbPort} ${dbName} < ${filename}`;

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Restore failed:', stderr);
          return reject('Restore failed');
        }
        resolve(`Restored from ${filePath}`);
      });
    });
  }

  @Cron('* * * * *')
  handleCron() {
    const backupDir = path.join(process.cwd(), 'dist', 'backups');

    console.log('[CRON] Đang kiểm tra số lượng file backup...');

    if (!fs.existsSync(backupDir)) {
      console.warn('Backup directory không tồn tại:', backupDir);
      return;
    }

    const files = fs
      .readdirSync(backupDir)
      .filter((f) => f.endsWith('.sql'))
      .map((f) => ({
        name: f,
        fullPath: path.join(backupDir, f),
        mtime: fs.statSync(path.join(backupDir, f)).mtime.getTime(),
      }))
      .sort((a, b) => b.mtime - a.mtime);

    if (files.length > 10) {
      const oldFiles = files.slice(10);
      oldFiles.forEach((file) => {
        fs.unlinkSync(file.fullPath);
        console.log('Đã xóa file cũ:', file.name);
      });
    } else {
      console.log('Số lượng file backup <= 10, không cần xóa.');
    }
  }
}
