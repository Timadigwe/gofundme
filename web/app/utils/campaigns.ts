import * as borsh from '@coral-xyz/borsh'
import { PublicKey } from '@solana/web3.js'

export class Campaign {
    owner: PublicKey;
    name: string;
    amount_raised: number;
    expected_amount:number;
    end_date:string

    constructor(owner:PublicKey, name:string, amount_raised:number,expected_amount:number, end_date:string) {
      this.owner = owner;
      this.name = name;
      this.amount_raised = amount_raised;
      this.expected_amount = expected_amount;
      this.end_date = end_date;  
    }

    static borshAccountSchema = borsh.struct([
        borsh.publicKey('owner'),
        borsh.str('name'),
        borsh.u64('amount_raised'),
        borsh.u64('expected_amount'),
        borsh.str('end_date')
     ])

     static deserialize(buffer?: Buffer): Campaign|null {
        if (!buffer) {
            return null
          }

          try {
            const { owner,  name, amount_raised, expected_amount,end_date} = this.borshAccountSchema.decode(buffer)
            return new Campaign(owner, name, amount_raised, expected_amount, end_date)
        
          } catch(error) {
            console.log('Deserialization error:', error)
            return null
          }
      }
}