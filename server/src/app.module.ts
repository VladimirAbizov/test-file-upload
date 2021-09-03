import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [FileModule,
    MongooseModule.forRoot('mongodb+srv')],

})
export class AppModule { }
