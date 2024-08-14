import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './config/config.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { FilesModule } from './files/files.module';
import { OrdersModule } from './orders/orders.module';
import { ShopsModule } from './shops/shops.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SecurityModule } from './security/security.module';
import { MessagingModule } from './messaging/messaging.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './app.constants';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CartModule,
    FilesModule,
    OrdersModule,
    ShopsModule,
    SecurityModule,
    MessagingModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
