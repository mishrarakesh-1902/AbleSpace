import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost/ablespace',
      {
        // Connection options for MongoDB Atlas
        retryAttempts: 12,
        retryDelay: 5000,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        ssl: true,
        // These settings help with connection stability
        maxPoolSize: 10,
        minPoolSize: 5,
      },
    ),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
