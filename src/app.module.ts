import { ProductModule } from './product/product.module';
import { ReservationModule } from './reservation/reservation.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ProductModule,
    ReservationModule,
    CategoryModule,
    RestaurantModule,
    AuthModule,
  ],
})
export class AppModule {}
