import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from './crypto/crypto.module';
import { AssetsModule } from './assets/assets.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CryptoModule, AssetsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
