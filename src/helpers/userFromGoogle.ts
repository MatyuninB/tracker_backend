import { HttpException } from '@nestjs/common';
import { UserDTO } from 'src/user/dto/user.dto';

// {
//   email: "bmatyunin.exceedteam@gmail.com",
//   firstName: "Boris",
//   lastName: "Matyunin",
//   picture: "https://lh3.googleusercontent.com/a-/AFdZucp9Au6ETlNEM0FqcUSSjymAH5p_OiTIMvdnVpP3=s96-c",
//   accessToken: "ya29.a0AVA9y1vY1W_aLJijF-QFqY0FEeFjM86j3UJIzaYFHBrzDl_kHrhMNKrz7IsmgLKgPLG5MbPWeC13oioSlewotI44FOx7sLZfnxPAPky7bRoK5kWZ8BFRh_Bxw-MOspXnHPJgHCxi6XkK9xJRWeNJhrhHwkgkgAaCgYKATASARISFQE65dr8djD8LQxZtHIQk74_7ysg9g0165",
// }
const normilizeMap = new Map<string, keyof UserDTO>([
  ['email', 'email'],
  ['firstName', 'name'],
  ['lastName', 'lastName'],
  ['picture', 'avatar'],
]);
export const userFromGoogle = (data: unknown): UserDTO | undefined => {
  if (isValidUser(data)) {
    return data;
  }

  throw new Error('Wrong user entry!');
};

const isValidUser = (x: unknown): x is UserDTO => {
  return typeof x === 'object' && (x as UserDTO) !== undefined;
};
