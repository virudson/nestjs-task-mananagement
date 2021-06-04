import * as bcrypt from 'bcrypt';

export class Bcrypt {
  static encrypt(originalData: string, genSaltCount: number = 10): string {
    return bcrypt.hashSync(originalData, genSaltCount);
  }

  static compare(originalData: string, hash: string): boolean {
    return bcrypt.compareSync(originalData, hash);
  }
}
