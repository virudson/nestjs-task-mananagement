import * as bcrypt from 'bcrypt';

export class Bcrypt {
  encrypt(originalData: string, genSaltCount: number = 10): String {
    return bcrypt.hashSync(originalData, genSaltCount);
  }

  compare(originalData: String, hash: String): boolean {
    return bcrypt.compareSync(originalData, hash);
  }
}
