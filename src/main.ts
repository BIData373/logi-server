import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module.js";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const rawPort = (process.env.PORT ?? "").trim();
  const parsedPort = rawPort.length > 0 ? Number(rawPort) : Number.NaN;
  const port =
    Number.isFinite(parsedPort) && parsedPort >= 0 && parsedPort <= 65535
      ? parsedPort
      : 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle("logi-sawgger")
    .setDescription("The cats API description")
    .setVersion("1.0")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);
  await app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
