import { Frequency } from '../../../routes/schemas/frequency.enum';

export const routeStub = () => {
  return {
    id: '028e3999-413a-4692-b0e3-e9a6a3648048',
    name: 'Velyka Progulka',
    frequency: [Frequency.DAILY],
    trainId: '64fa7fc4-ca2b-41cd-9f4a-94acf90b03fa',
  };
};
