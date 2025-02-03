export async function fetchProfileData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate profile data - replace with actual API call
  return {
    firstName: 'سارة',
    secondName: 'أحمد',
    thirdName: 'العمري',
    nationality: { name: 'سعودي', value: 'saudi' },
    phoneNumber: '0501234567',
    country: { name: 'السعودية', code: 'SA' },
    birthDate: new Date('1990-01-01'),
    degree: 'بكالوريوس',
    fieldOfStudy: 'علوم حاسب',
    jobTitle: 'مطور برمجيات',
    civilianId: '1234567890',
    expiryDate: 'Jan 20, 2024',
    password: ''
  };
}
