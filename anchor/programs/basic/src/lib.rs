use anchor_lang::prelude::*;

declare_id!("HKWW7Bw5ZxWDeuSdVW26ARjRsS9U3Xmn5pNTR5ws4kGT");

#[program]
pub mod basic {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
