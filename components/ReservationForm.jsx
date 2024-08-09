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
  const [people, setPeople] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      date: date,
      people: people,
      email: event.target.email.value,
    };

    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Réservation envoyée avec succès');
      } else {
        alert('Erreur lors de l\'envoi de la réservation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className='flex flex-col gap-y-10' onSubmit={handleSubmit}>
      <div className='grid gap-[30px]'>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-[30px]'>
          <div>
            <Label htmlFor='firstname'>Prénom</Label>
            <Input id='firstname' name='firstname' type='text' required />
          </div>
          <div>
            <Label htmlFor='lastname'>Nom</Label>
            <Input id='lastname' name='lastname' type='text' required />
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
            <Select onValueChange={(value) => setPeople(value)}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Combien de personnes?' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>People</SelectLabel>
                  {[...Array(20)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' name='email' type='email' required />
        </div>
      </div>
      <Button variant='red' className='uppercase w-full xl:w-auto xl:self-end'>
        Réservez une table !
      </Button>
    </form>
  );
};

export default ReservationForm;
