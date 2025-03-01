<template>
  <div class="admin-dashboard" dir="rtl">
    <div class="header-section">
      <h1>لوحة التحكم الإدارية</h1>
      <p class="welcome-text">أهلاً بك في نظام إدارة المنصة</p>
    </div>

    <div class="admin-content">
      <div class="card">
        <div class="card-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="card-content">
          <h2>إدارة المستخدمين</h2>
          <p>إدارة المستخدمين والصلاحيات</p>
        </div>
      </div>

      <div class="card">
        <div class="card-icon">
          <i class="fas fa-book"></i>
        </div>
        <div class="card-content">
          <h2>إدارة الدورات</h2>
          <p>إنشاء وتعديل وحذف الدورات التدريبية</p>
        </div>
      </div>

      <div class="card">
        <div class="card-icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <div class="card-content">
          <h2>إدارة الطلبات</h2>
          <p>مراجعة ومعالجة طلبات الشراء</p>
        </div>
      </div>

      <div class="card">
        <div class="card-icon">
          <i class="fas fa-chalkboard-teacher"></i>
        </div>
        <div class="card-content">
          <h2>إدارة المحاضرين</h2>
          <p>إدارة محاضرين ومدربي الدورات</p>
        </div>
      </div>

      <div class="card">
        <div class="card-icon">
          <i class="fas fa-comments"></i>
        </div>
        <div class="card-content">
          <h2>إدارة التعليقات</h2>
          <p>مراقبة وإدارة تعليقات المستخدمين</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  // Check if user has admin permissions
  if (!authStore.isAdmin) {
    // Redirect non-admin users
    router.push('/');
  }

  // Add Font Awesome dynamically if not already included in your project
  if (!document.getElementById('font-awesome')) {
    const link = document.createElement('link');
    link.id = 'font-awesome';
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  }

  // Add Tajawal font for Arabic
  if (!document.getElementById('arabic-font')) {
    const font = document.createElement('link');
    font.id = 'arabic-font';
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap';
    document.head.appendChild(font);
  }
});
</script>

<style scoped>
.admin-dashboard {
  padding: 30px;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Tajawal', sans-serif;
}

.header-section {
  margin-bottom: 40px;
  text-align: right;
  border-right: 4px solid #3f51b5;
  padding-right: 20px;
}

h1 {
  margin-bottom: 10px;
  color: #3f51b5;
  font-size: 2.2rem;
  font-weight: 700;
}

.welcome-text {
  color: #666;
  font-size: 1.1rem;
}

.admin-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.card {
  background-color: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  position: relative;
  border-top: 4px solid transparent;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-top-color: #3f51b5;
}

.card-icon {
  background: linear-gradient(135deg, #7f8ff7, #3f51b5);
  color: white;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 6px 12px rgba(63, 81, 181, 0.2);
}

.card-icon i {
  font-size: 28px;
}

.card-content {
  width: 100%;
}

h2 {
  color: #333;
  margin-bottom: 12px;
  font-size: 1.4rem;
  font-weight: 600;
}

p {
  color: #666;
  line-height: 1.5;
}

/* Add subtle animations to icons */
.card:hover .card-icon {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}

/* Media query for smaller screens */
@media (max-width: 768px) {
  .admin-content {
    grid-template-columns: 1fr;
  }

  .header-section {
    margin-bottom: 30px;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>
