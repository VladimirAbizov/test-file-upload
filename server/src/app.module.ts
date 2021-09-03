import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [FileModule,
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.g0mfz.mongodb.net/testDatabase?retryWrites=true&w=majority')],

})
export class AppModule { }
