import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import Link from 'next/link';
import { Label } from './ui/label';
import { Input } from './ui/input';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ReservationForm = () => {
  const [date, setDate] = useState();
  return (
    <form className='flex flex-col gap-y-10'>
      <div className='grid gap-[30px]'>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-[30px]'>
          <div>
            <Label htmlFor='firstname'>Prénom</Label>
            <Input id='firstname' type='text' />
          </div>
          <div>
            <Label htmlFor='lastname'>Nom</Label>
            <Input id='lastname' type='text' />
          </div>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-2 gap-[30px]'>
          {/* calendar */}
          <div>
            <Label>date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'input'}
                  className={cn('w-full justify-start text-left font-normal')}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'PPP') : <span>Choisir une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* select */}
          <div>
            <Label>Couvert(s)</Label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Combien de personnes?' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>People</SelectLabel>
                  <SelectItem value='1'>1</SelectItem>
                  <SelectItem value='2'>2</SelectItem>
                  <SelectItem value='3'>3</SelectItem>
                  <SelectItem value='4'>4</SelectItem>
                  <SelectItem value='5'>5</SelectItem>
                  <SelectItem value='6'>6</SelectItem>
                  <SelectItem value='7'>7</SelectItem>
                  <SelectItem value='8'>8</SelectItem>
                  <SelectItem value='9'>9</SelectItem>
                  <SelectItem value='10'>10</SelectItem>
                  <SelectItem value='11'>11</SelectItem>
                  <SelectItem value='12'>12</SelectItem>
                  <SelectItem value='13'>13</SelectItem>
                  <SelectItem value='14'>14</SelectItem>
                  <SelectItem value='15'>15</SelectItem>
                  <SelectItem value='16'>16</SelectItem>
                  <SelectItem value='17'>17</SelectItem>
                  <SelectItem value='18'>18</SelectItem>
                  <SelectItem value='19'>19</SelectItem>
                  <SelectItem value='20'>20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Button variant='red' className='uppercase w-full xl:w-auto xl:self-end'>
        Réservez une table !
      </Button>
    </form>
  );
};

export default ReservationForm;
