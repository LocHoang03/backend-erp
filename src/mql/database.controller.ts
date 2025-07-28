import { Controller, Get, Post, Body, Query, Param, Res } from '@nestjs/common';
import { DatabaseService } from './database.service';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Controller('database')
export class DatabaseController {
  constructor(private readonly dbService: DatabaseService) {}

  @Get('find')
  async find() {
    return await this.dbService.findAllBackups();
  }
  @Get('download/:fileName')
  async downloadBackup(
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    const filePath = path.join(process.cwd(), 'dist', 'backups', fileName);

    const stream = fs.createReadStream(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    stream.pipe(res);
  }

  @Post('backup')
  async backup() {
    return await this.dbService.backup();
  }

  @Post('restore')
  async restore(@Body('fileName') fileName: string) {
    console.log(fileName);
    return await this.dbService.restore(fileName);
  }
}
