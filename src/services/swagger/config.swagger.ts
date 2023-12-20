import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Planilha Financeira')
  .setDescription('API para controle de finanças')
  .setContact('laert furquin', 'https://github.com/furquin', 'laert.ff@gmail.com')
  .setVersion('1.0')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
  .addServer('http://localhost:3000')
  .addServer('https://vercel.planilhafinanceira.com')
  .build();

export const options: SwaggerDocumentOptions = {
  operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
  deepScanRoutes: true,
  ignoreGlobalPrefix: true,
};
