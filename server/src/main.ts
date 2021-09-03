import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  try {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule, { cors: true })
    app.enableCors()

    await app.listen(PORT, () => {
      console.log(`server started on PORT ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
bootstrap()
