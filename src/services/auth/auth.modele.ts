import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthApiKeyStrategy } from './auth.api-key.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthApiKeyStrategy]
})
export class AuthModule {}
