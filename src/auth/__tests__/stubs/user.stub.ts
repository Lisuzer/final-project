import { UserRole } from '../../../user/schemas/user-role.enum';

export const userStub = () => {
  return {
    id: '2bdcb60b-e5ac-4e84-8047-65c6dae2952f',
    email: 'manager@example.com',
    role: UserRole.MANAGER,
    employee: {
      id: '2b5c494d-3fbe-4aa1-9814-f780f80af3a9',
      name: 'Mike',
      surname: 'Sirko',
      birthday: new Date('2000-11-11'),
      post: 'MANAGER',
      careerStart: new Date('2022-11-15'),
      adress: 'plitkova st.',
      contactNumber: '380663781685',
    },
  };
};
