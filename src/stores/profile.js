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

export const currentPlan = {
  title: "العضوية الذهبية",
  features: [
    "وصول كامل إلى جميع الدورات",
    "دعم فني متميز",
    "شهادات معتمدة",
    "محتوى حصري"
  ],
  price: "100",
  iconClass: "pi pi-star text-yellow-600"
};

export const availablePlans = [
  {
    title: "العضوية البلاتينية",
    description: "أعلى مستوى من الميزات والخدمات مع دعم مخصص",
    price: "200",
    iconClass: "pi pi-star text-blue-500"
  },
  {
    title: "العضوية المهنية",
    description: "مثالية للمحترفين مع ميزات متقدمة",
    price: "150",
    iconClass: "pi pi-star text-purple-500"
  },
  {
    title: "عضوية الشركات",
    description: "حلول مخصصة للفرق والشركات",
    price: "300",
    iconClass: "pi pi-users text-green-500"
  }
];
