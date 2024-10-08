import { Expose } from 'class-transformer';
export class UserDto {
  @Expose()
  email: string;

  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  address: string;
}
