type CompanyConfig = {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  businessHours: string;
  social: { facebook: string; linkedin: string; instagram: string };
};

export const company: CompanyConfig = {
  name: 'Gedeon',
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  businessHours: '',
  social: {
    facebook: '',
    linkedin: '',
    instagram: '',
  },
};
