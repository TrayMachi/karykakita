import React from 'react';
import { Button } from '@/components/ui/button';
import { TransitionLink } from '@/components/utils/TransitionLink';

export const BuatBeli = () => {
  return (
    <div className='w-[271px] rounded-2xl shadow-xl my-auto h-fit border-2 border-[#E3E3E3] p-4 flex flex-col justify-between'>
      <div className='mb-1'> 
        <p className='text-primary font-extrabold text-[24px] mb-2'>Beli</p>
        <div className='flex justify-between items-center mb-2'>
          <p className='text-[14px] text-primary font-bold'>1x<span className='ml-1'>30x40cm</span></p>
          <p className='font-bold text-[13px] text-primary'>Rp200.000</p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-[14px] text-primary font-bold'>Subtotal</p>
          <p className='font-bold text-[13px] text-primary'>Rp200.000</p>
        </div>
      </div>
      <div className='flex flex-col gap-2 mt-5'> 
        <Button><TransitionLink href='/checkout'>Beli Sekarang</TransitionLink></Button>
        <Button>Masukkan Keranjang</Button>
      </div>
    </div>
  );
};


